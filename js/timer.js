// timer.js — Circular rest timer with bottom sheet
// Uses absolute wall-clock timestamps + localStorage persistence so the
// timer stays accurate even when iOS suspends the page on app switch.

const RestTimer = {
  // Config
  RADIUS: 52,
  STORAGE_KEY: 'gym-app-rest-timer',

  // State
  duration: 0,
  remaining: 0,
  endTime: 0,            // absolute wall-clock deadline (ms)
  intervalId: null,
  onComplete: null,
  isRunning: false,
  circumference: 0,
  _restoredFromStorage: false,

  init() {
    this.circumference = 2 * Math.PI * this.RADIUS;
    const circle = document.getElementById('timer-circle');
    if (circle) {
      circle.style.strokeDasharray = this.circumference;
      circle.style.strokeDashoffset = '0';
    }
    this._bindLifecycle();
    this._tryRestore();
  },

  // Restore a timer that was running before iOS suspended the page.
  _tryRestore() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (!data.endTime || !data.duration || !data.onCompletePending) return;

      const remaining = Math.max(0, Math.ceil((data.endTime - Date.now()) / 1000));
      if (remaining <= 0) {
        localStorage.removeItem(this.STORAGE_KEY);
        return;
      }

      // Timer was still running — resume it.
      // Can't serialize onComplete, so we just show the sheet and let the
      // interval tick. The caller (app.js completeSet) already saved progress,
      // so the set state is consistent even if onComplete is lost.
      this.duration = data.duration;
      this.endTime = data.endTime;
      this.isRunning = true;
      this._restoredFromStorage = true;
      this._recalcFromWallClock();
      this._showSheet();

      this.intervalId = setInterval(() => {
        this._recalcFromWallClock();
        if (this.remaining <= 0) {
          this._complete();
        }
      }, 1000);
    } catch (e) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  },

  // Listen for both visibilitychange AND pageshow (iOS uses pageshow).
  _bindLifecycle() {
    const onReturn = () => {
      if (!this.isRunning) return;
      this._recalcFromWallClock();
      if (this.remaining <= 0) {
        this._complete();
      }
    };

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') onReturn();
      if (document.visibilityState === 'hidden') this._persistToStorage();
    });

    window.addEventListener('pageshow', () => {
      onReturn();
    });

    window.addEventListener('pagehide', () => {
      this._persistToStorage();
    });
  },

  _persistToStorage() {
    if (!this.isRunning || this.remaining <= 0) return;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
        endTime: this.endTime,
        duration: this.duration,
        onCompletePending: true
      }));
    } catch (e) {}
  },

  _clearStorage() {
    localStorage.removeItem(this.STORAGE_KEY);
    this._restoredFromStorage = false;
  },

  // Recalculate remaining seconds from the absolute deadline.
  _recalcFromWallClock() {
    const now = Date.now();
    this.remaining = Math.max(0, Math.ceil((this.endTime - now) / 1000));
    this._updateDisplay();
  },

  // Start the timer. seconds: rest duration. onComplete: callback when done or skipped.
  start(seconds, onComplete) {
    this.stop();
    this.duration = seconds;
    this.endTime = Date.now() + seconds * 1000;
    this.onComplete = onComplete;
    this.isRunning = true;
    this._restoredFromStorage = false;

    this._recalcFromWallClock();
    this._showSheet();
    this._persistToStorage();

    this.intervalId = setInterval(() => {
      this._recalcFromWallClock();

      if (this.remaining <= 0) {
        this._complete();
      }
    }, 1000);
  },

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    this._clearStorage();
  },

  // Skip the rest early — same callback as natural completion
  skip() {
    if (!this.isRunning) return;
    const cb = this.onComplete;
    this.stop();
    SoundManager.playChime();
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    this._hideSheet();
    if (cb) cb();
  },

  _complete() {
    // If this timer was restored from storage, we don't have the original
    // onComplete callback. The set state is already correct from saved progress,
    // so we just hide the sheet and let the user continue.
    const cb = this._restoredFromStorage ? null : this.onComplete;
    this.stop();

    // Flash the circle red
    const circle = document.getElementById('timer-circle');
    if (circle) {
      circle.style.stroke = '#f74f4f';
      circle.style.filter = 'drop-shadow(0 0 8px rgba(247, 79, 79, 0.8))';
    }

    SoundManager.playChime();
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

    setTimeout(() => {
      this._hideSheet();
      if (cb) cb();
    }, 650);
  },

  _updateDisplay() {
    const circle = document.getElementById('timer-circle');
    const secondsEl = document.getElementById('timer-seconds');
    const labelEl = document.getElementById('timer-label');

    if (secondsEl) secondsEl.textContent = this.remaining;
    if (labelEl) labelEl.textContent = `Rest · ${this.duration} sec`;

    if (!circle) return;

    // Progress: 1.0 = full circle, 0.0 = empty
    const progress = this.duration > 0 ? this.remaining / this.duration : 0;
    const offset = this.circumference * (1 - progress);
    circle.style.strokeDashoffset = offset;

    if (this.remaining <= 10 && this.remaining > 0) {
      // Amber warning phase
      circle.style.stroke = '#f7a94f';
      circle.style.filter = 'drop-shadow(0 0 6px rgba(247, 169, 79, 0.7))';
      circle.style.transition = 'stroke-dashoffset 1000ms linear, stroke 300ms';

      const container = document.querySelector('.timer-circle-container');
      if (container && !container.dataset.pulsing) {
        container.style.animation = 'timer-pulse 0.9s ease-in-out infinite';
        container.dataset.pulsing = '1';
      }
    } else if (this.remaining > 10) {
      // Normal blue phase
      circle.style.stroke = '#4f8ef7';
      circle.style.filter = 'drop-shadow(0 0 6px rgba(79, 142, 247, 0.6))';
      circle.style.transition = 'stroke-dashoffset 1000ms linear, stroke 300ms';

      const container = document.querySelector('.timer-circle-container');
      if (container) {
        container.style.animation = '';
        delete container.dataset.pulsing;
      }
    }
  },

  _showSheet() {
    const sheet = document.getElementById('rest-timer-sheet');
    if (sheet) sheet.classList.add('visible');
  },

  hideSheet() {
    this._hideSheet();
  },

  _hideSheet() {
    const sheet = document.getElementById('rest-timer-sheet');
    if (sheet) sheet.classList.remove('visible');

    // Reset visual state for next use
    const container = document.querySelector('.timer-circle-container');
    if (container) {
      container.style.animation = '';
      delete container.dataset.pulsing;
    }

    const circle = document.getElementById('timer-circle');
    if (circle) {
      circle.style.stroke = '#4f8ef7';
      circle.style.filter = 'drop-shadow(0 0 6px rgba(79, 142, 247, 0.6))';
    }
  }
};
