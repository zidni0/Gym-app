// timer.js — Circular rest timer with bottom sheet

const RestTimer = {
  // Config
  RADIUS: 52,

  // State
  duration: 0,
  remaining: 0,
  intervalId: null,
  onComplete: null,
  isRunning: false,
  circumference: 0,

  init() {
    this.circumference = 2 * Math.PI * this.RADIUS;
    const circle = document.getElementById('timer-circle');
    if (circle) {
      circle.style.strokeDasharray = this.circumference;
      circle.style.strokeDashoffset = '0';
    }
  },

  // Start the timer. seconds: rest duration. onComplete: callback when done or skipped.
  start(seconds, onComplete) {
    this.stop();
    this.duration = seconds;
    this.remaining = seconds;
    this.onComplete = onComplete;
    this.isRunning = true;

    this._updateDisplay();
    this._showSheet();

    this.intervalId = setInterval(() => {
      this.remaining--;
      this._updateDisplay();

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
  },

  // Skip the rest early — same callback as natural completion
  skip() {
    if (!this.isRunning) return;
    this.stop();
    SoundManager.playChime();
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    this._hideSheet();
    if (this.onComplete) this.onComplete();
  },

  _complete() {
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
      if (this.onComplete) this.onComplete();
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
