// app.js — Main application logic for Kazi's Gym App

// ============================================================
// CONFETTI
// ============================================================
function startConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#4f8ef7', '#7b5af7', '#f7a94f', '#4ade80', '#f74f4f', '#ffffff', '#a855f7', '#38bdf8'];
  const particles = [];

  for (let i = 0; i < 160; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 120,
      width: Math.random() * 10 + 5,
      height: Math.random() * 5 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 5,
      vy: Math.random() * 3 + 1.5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 7,
      opacity: 1,
      gravity: 0.06 + Math.random() * 0.04
    });
  }

  let animId;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let anyActive = false;

    for (const p of particles) {
      if (p.y < canvas.height + 30 && p.opacity > 0) {
        anyActive = true;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height * 0.6) {
          p.opacity -= 0.018;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        ctx.restore();
      }
    }

    if (anyActive) {
      animId = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  draw();

  setTimeout(() => {
    cancelAnimationFrame(animId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 5000);
}


// ============================================================
// WEIGHT LOG
// ============================================================
const WeightLog = {
  storageKey: 'gym-app-weights',

  _getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    } catch (e) {
      return {};
    }
  },

  getLastWeight(dayId, exerciseName) {
    const all = this._getAll();
    const prefix = `${dayId}|${exerciseName}|`;
    const matching = Object.keys(all)
      .filter(k => k.startsWith(prefix))
      .sort()
      .reverse();
    return matching.length > 0 ? all[matching[0]] : null;
  },

  saveWeight(dayId, exerciseName, weight) {
    if (!weight || weight.trim() === '') return;
    const all = this._getAll();
    const today = new Date().toISOString().slice(0, 10);
    all[`${dayId}|${exerciseName}|${today}`] = weight.trim();
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(all));
    } catch (e) {}
  }
};


// ============================================================
// MAIN APP
// ============================================================
const App = {

  // ----------------------------------------------------------
  // STATE
  // ----------------------------------------------------------
  state: {
    selectedDayIndex: null,
    currentExerciseIndex: 0,
    currentSet: 1,
    completedExercises: {},    // Map of exerciseIndex → true for completed exercises
    workoutStartTime: null,
    workoutTimerInterval: null,
    wakeLock: null,
    quoteIndex: 0,
    quoteInterval: null,
    currentScreenEl: null,
    setDoneLocked: false,
  },

  quotes: [
    "Show up. Every. Time.",
    "The pain today is the strength tomorrow.",
    "Push past the limit.",
    "Your only competition is who you were yesterday.",
    "Earn it.",
    "Champions are made when nobody is watching."
  ],


  // ----------------------------------------------------------
  // INIT
  // ----------------------------------------------------------
  init() {
    SoundManager.init();
    RestTimer.init();

    this.renderDayCards();
    this.updateTodayDate();
    this.startQuoteRotation();
    this.checkResumeData();
    this.setupEventListeners();

    this.state.currentScreenEl = document.getElementById('screen-home');
    document.getElementById('screen-home').style.visibility = 'visible';

    const updateTimerDisplay = () => {
      if (!this.state.workoutStartTime) return;
      const elapsed = Date.now() - this.state.workoutStartTime;
      const m = Math.floor(elapsed / 60000);
      const s = Math.floor((elapsed % 60000) / 1000);
      const el = document.getElementById('workout-timer');
      if (el) el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      const elMenu = document.getElementById('workout-timer-menu');
      if (elMenu) elMenu.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') updateTimerDisplay();
    });

    window.addEventListener('pageshow', () => {
      this._restoreWorkoutTimer();
      updateTimerDisplay();
    });

    window.addEventListener('pagehide', () => {
      this._persistWorkoutTimer();
    });
  },


  // ----------------------------------------------------------
  // SCREEN NAVIGATION
  // ----------------------------------------------------------
  navigateTo(targetId, direction = 'forward') {
    const target = document.getElementById(`screen-${targetId}`);
    const current = this.state.currentScreenEl;

    if (!target || target === current) return;

    const DURATION = 420;
    const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';

    target.style.transition = 'none';
    target.style.transform = direction === 'forward' ? 'translateX(100%)' : 'translateX(-28%)';
    target.style.visibility = 'visible';
    target.style.zIndex = '2';

    if (current) current.style.zIndex = '1';

    target.getBoundingClientRect();

    const transition = `transform ${DURATION}ms ${easing}`;

    target.style.transition = transition;
    target.style.transform = 'translateX(0)';

    if (current) {
      current.style.transition = transition;
      current.style.transform = direction === 'forward' ? 'translateX(-28%)' : 'translateX(100%)';
    }

    setTimeout(() => {
      if (current) {
        current.style.visibility = 'hidden';
        current.style.transform = '';
        current.style.transition = '';
        current.style.zIndex = '';
      }
      target.style.transition = '';
      target.style.zIndex = '';
      this.state.currentScreenEl = target;
    }, DURATION);
  },


  // ----------------------------------------------------------
  // HOME SCREEN
  // ----------------------------------------------------------
  renderDayCards() {
    const container = document.getElementById('day-cards');
    if (!container) return;

    container.innerHTML = '';

    workoutData.days.forEach((day, index) => {
      const card = document.createElement('div');
      card.className = 'day-card';
      card.style.animationDelay = `${60 + index * 80}ms`;

      card.innerHTML = `
        <div class="day-card-header">
          <span class="day-label">${day.label}</span>
          <span class="day-weekday">${day.weekday}</span>
        </div>
        <div class="day-name">${day.name}</div>
        <div class="day-muscles">${day.muscles}</div>
        <div class="day-card-footer">
          <span class="day-exercises-count">${day.exercises.length} exercises</span>
          <div class="day-card-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      `;

      card.addEventListener('click', () => this.selectDay(index));
      container.appendChild(card);
    });
  },

  updateTodayDate() {
    const el = document.getElementById('today-date');
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  },

  startQuoteRotation() {
    if (this.state.quoteInterval) clearInterval(this.state.quoteInterval);

    const el = document.getElementById('motivational-quote');
    if (!el) return;

    el.textContent = this.quotes[this.state.quoteIndex];
    el.classList.add('fade-in');

    this.state.quoteInterval = setInterval(() => {
      el.style.opacity = '0';

      setTimeout(() => {
        this.state.quoteIndex = (this.state.quoteIndex + 1) % this.quotes.length;
        el.textContent = this.quotes[this.state.quoteIndex];
        el.style.opacity = '';
        el.classList.remove('fade-in');
        void el.offsetWidth;
        el.classList.add('fade-in');
      }, 450);
    }, 5000);
  },

  selectDay(dayIndex) {
    this.state.selectedDayIndex = dayIndex;
    this.state.currentExerciseIndex = 0;
    this.state.currentSet = 1;
    this.state.completedExercises = {};

    const cards = document.querySelectorAll('.day-card');
    const card = cards[dayIndex];
    if (card) {
      card.classList.add('tapped');
      setTimeout(() => card.classList.remove('tapped'), 600);
    }

    setTimeout(() => {
      this.navigateTo('warmup', 'forward');
    }, 260);
  },


  // ----------------------------------------------------------
  // RESUME LOGIC
  // ----------------------------------------------------------
  checkResumeData() {
    const saved = localStorage.getItem('gym-app-progress');
    if (!saved) return;

    let data;
    try {
      data = JSON.parse(saved);
    } catch (e) {
      localStorage.removeItem('gym-app-progress');
      return;
    }

    const day = workoutData.days[data.dayIndex];
    if (!day) { localStorage.removeItem('gym-app-progress'); return; }

    const banner = document.getElementById('resume-banner');
    const detail = document.getElementById('resume-detail');

    if (!banner || !detail) return;

    const completedCount = data.completedExercises ? Object.keys(data.completedExercises).length : 0;
    detail.textContent = `${day.label} · ${day.name}  —  ${completedCount} of ${day.exercises.length} done`;
    banner.classList.remove('hidden');

    document.getElementById('resume-yes').addEventListener('click', () => {
      this.resumeWorkout(data);
    }, { once: true });

    document.getElementById('resume-no').addEventListener('click', () => {
      localStorage.removeItem('gym-app-progress');
      banner.classList.add('hidden');
    }, { once: true });
  },

  resumeWorkout(data) {
    this.state.selectedDayIndex = data.dayIndex;
    this.state.currentExerciseIndex = data.exerciseIndex;
    this.state.currentSet = data.currentSet || 1;
    this.state.completedExercises = data.completedExercises || {};

    const banner = document.getElementById('resume-banner');
    if (banner) banner.classList.add('hidden');

    this._beginWorkout();
  },

  saveProgress() {
    const data = {
      dayIndex: this.state.selectedDayIndex,
      exerciseIndex: this.state.currentExerciseIndex,
      currentSet: this.state.currentSet,
      completedExercises: this.state.completedExercises,
      savedAt: Date.now()
    };
    localStorage.setItem('gym-app-progress', JSON.stringify(data));
  },

  clearProgress() {
    localStorage.removeItem('gym-app-progress');
  },


  // ----------------------------------------------------------
  // WARMUP → MENU TRANSITION
  // ----------------------------------------------------------
  _beginWorkout() {
    this.state.workoutStartTime = Date.now();
    this.state.setDoneLocked = false;
    this._startWorkoutTimer();
    this._requestWakeLock();

    this.navigateTo('exercise-menu', 'forward');

    setTimeout(() => {
      this.renderExerciseMenu();
    }, 100);
  },


  // ----------------------------------------------------------
  // EXERCISE MENU — Free-form exercise picker
  // ----------------------------------------------------------
  renderExerciseMenu() {
    const day = workoutData.days[this.state.selectedDayIndex];
    if (!day) return;

    const dayLabelEl = document.getElementById('menu-day-label');
    if (dayLabelEl) dayLabelEl.textContent = `${day.label} · ${day.name}`;

    const progressEl = document.getElementById('menu-progress');
    const completedCount = Object.keys(this.state.completedExercises).length;
    if (progressEl) progressEl.textContent = `${completedCount} of ${day.exercises.length} done`;

    const content = document.getElementById('menu-content');
    if (!content) return;

    content.innerHTML = '';

    day.exercises.forEach((exercise, index) => {
      const isCompleted = this.state.completedExercises[index];
      const card = document.createElement('div');
      card.className = `menu-exercise-card${isCompleted ? ' completed' : ''}`;
      card.style.animationDelay = `${index * 50}ms`;

      card.innerHTML = `
        <div class="menu-exercise-check">✓</div>
        <div class="menu-exercise-info">
          <div class="menu-exercise-name">${exercise.name}</div>
          <div class="menu-exercise-meta">
            <span>${exercise.muscles}</span>
            <span>${exercise.sets} sets · ${exercise.reps} reps</span>
          </div>
        </div>
        <div class="menu-exercise-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      `;

      card.addEventListener('click', () => this.selectExercise(index));
      content.appendChild(card);
    });

    // Finish bar
    const allDone = completedCount >= day.exercises.length;
    const finishBar = document.createElement('div');
    finishBar.className = 'menu-finish-bar';
    finishBar.innerHTML = `
      <button class="${allDone ? 'btn-finish-workout' : 'btn-primary'}" id="btn-finish-menu">
        ${allDone ? 'FINISH WORKOUT' : 'End Workout Early'}
      </button>
    `;
    content.appendChild(finishBar);

    document.getElementById('btn-finish-menu')?.addEventListener('click', () => {
      if (allDone) {
        this.showDayComplete();
      } else {
        this.showModal();
      }
    });

    this.saveProgress();
  },

  selectExercise(exerciseIndex) {
    const day = workoutData.days[this.state.selectedDayIndex];
    if (!day) return;

    const exercise = day.exercises[exerciseIndex];
    if (!exercise) return;

    // If already completed, still allow re-doing (remove from completed so it can be re-tracked)
    // Actually, let the user re-do if they want — they can always redo an exercise.

    this.state.currentExerciseIndex = exerciseIndex;
    this.state.currentSet = 1;
    this.state.setDoneLocked = false;

    this.navigateTo('exercise', 'forward');

    setTimeout(() => {
      this.loadExercise(exerciseIndex);
    }, 150);
  },


  // ----------------------------------------------------------
  // EXERCISE SCREEN
  // ----------------------------------------------------------
  loadExercise(exerciseIndex) {
    const day = workoutData.days[this.state.selectedDayIndex];
    if (!day) return;

    const exercise = day.exercises[exerciseIndex];
    if (!exercise) return;

    this.state.currentExerciseIndex = exerciseIndex;
    this.state.currentSet = 1;
    this.state.setDoneLocked = false;

    // Progress bar — show overall day progress
    const completedCount = Object.keys(this.state.completedExercises).length;
    const total = day.exercises.length;
    const progress = ((completedCount + 1) / total) * 100;
    const progressBar = document.getElementById('exercise-progress-bar');
    if (progressBar) progressBar.style.width = `${progress}%`;

    const counterEl = document.getElementById('exercise-counter');
    if (counterEl) counterEl.textContent = `${completedCount + 1} of ${total}`;

    const dayLabelEl = document.getElementById('exercise-day-label');
    if (dayLabelEl) dayLabelEl.textContent = `${day.label} · ${day.name}`;

    this._loadVideo(exercise);

    const nameEl = document.getElementById('exercise-name');
    const musclesEl = document.getElementById('exercise-muscles');
    const tagsEl = document.getElementById('equipment-tags');

    if (nameEl) nameEl.textContent = exercise.name;
    if (musclesEl) musclesEl.textContent = exercise.muscles;

    if (tagsEl) {
      tagsEl.innerHTML = '';
      exercise.equipment.slice(0, 3).forEach(eq => {
        const tag = document.createElement('span');
        tag.className = 'equipment-tag';
        tag.textContent = eq;
        tagsEl.appendChild(tag);
      });
    }

    this._updateSetDisplay();
    this._updateWeightHint(exercise.name);

    const btnSetDone = document.getElementById('btn-set-done');
    const completeMsg = document.getElementById('exercise-complete-msg');
    if (btnSetDone) {
      btnSetDone.style.display = 'flex';
      btnSetDone.disabled = false;
    }
    if (completeMsg) completeMsg.classList.remove('visible');

    this._updateNextPreview(exerciseIndex);

    const content = document.querySelector('.exercise-content');
    if (content) {
      content.classList.remove('slide-in');
      void content.offsetWidth;
      content.classList.add('slide-in');
    }

    this.saveProgress();
  },

  _loadVideo(exercise) {
    const iframe = document.getElementById('exercise-video');
    const placeholder = document.getElementById('video-placeholder');
    const placeholderText = document.getElementById('video-placeholder-text');

    if (!iframe || !placeholder) return;

    iframe.style.display = 'block';
    placeholder.classList.remove('visible');

    if (!exercise.video) {
      iframe.style.display = 'none';
      placeholder.classList.add('visible');
      if (placeholderText) placeholderText.textContent = exercise.name;
      return;
    }

    iframe.src = exercise.video;
  },

  _updateSetDisplay() {
    const day = workoutData.days[this.state.selectedDayIndex];
    const exercise = day.exercises[this.state.currentExerciseIndex];

    const setStatusEl = document.getElementById('set-status');
    const setRepsEl = document.getElementById('set-reps');

    if (setStatusEl) setStatusEl.textContent = `SET ${this.state.currentSet} OF ${exercise.sets}`;
    if (setRepsEl) setRepsEl.textContent = `Target: ${exercise.reps} reps`;
  },

  _updateNextPreview(currentIndex) {
    // Instead of showing the next linear exercise, show remaining exercises count
    const day = workoutData.days[this.state.selectedDayIndex];
    const completedCount = Object.keys(this.state.completedExercises).length;
    const remaining = day.exercises.length - completedCount - 1; // minus current
    const el = document.getElementById('next-exercise');
    if (el) {
      el.textContent = remaining > 0 ? `${remaining} exercise${remaining > 1 ? 's' : ''} remaining` : 'Last exercise — finish strong!';
    }
  },

  _updateWeightHint(exerciseName) {
    const day = workoutData.days[this.state.selectedDayIndex];
    const hintEl = document.getElementById('weight-hint');
    const inputEl = document.getElementById('weight-input');

    if (inputEl) inputEl.value = '';

    if (hintEl) {
      const last = WeightLog.getLastWeight(day.id, exerciseName);
      hintEl.textContent = last ? `Last logged: ${last}` : 'Log weight (optional)';
    }
  },


  // ----------------------------------------------------------
  // SET COMPLETION
  // ----------------------------------------------------------
  completeSet() {
    if (this.state.setDoneLocked) return;
    this.state.setDoneLocked = true;

    const day = workoutData.days[this.state.selectedDayIndex];
    const exercise = day.exercises[this.state.currentExerciseIndex];

    if (navigator.vibrate) navigator.vibrate(50);

    const weightInputEl = document.getElementById('weight-input');
    if (weightInputEl && weightInputEl.value.trim()) {
      WeightLog.saveWeight(day.id, exercise.name, weightInputEl.value.trim());
    }

    const btn = document.getElementById('btn-set-done');
    if (btn) {
      btn.classList.add('pulse');
      setTimeout(() => btn.classList.remove('pulse'), 400);
    }

    const isLastSet = this.state.currentSet >= exercise.sets;

    if (isLastSet) {
      if (btn) btn.style.display = 'none';
      this._showExerciseComplete();
    } else {
      this.state.currentSet++;
      this._updateSetDisplay();

      if (btn) {
        btn.style.display = 'none';
        btn.disabled = true;
      }

      if (exercise.rest > 0) {
        RestTimer.start(exercise.rest, () => {
          this.state.setDoneLocked = false;
          if (btn) {
            btn.style.display = 'flex';
            btn.disabled = false;
          }
        });
      } else {
        this.state.setDoneLocked = false;
        if (btn) {
          btn.style.display = 'flex';
          btn.disabled = false;
        }
      }
    }

    this.saveProgress();
  },

  _showExerciseComplete() {
    // Mark this exercise as completed
    this.state.completedExercises[this.state.currentExerciseIndex] = true;

    const completeMsg = document.getElementById('exercise-complete-msg');
    if (completeMsg) completeMsg.classList.add('visible');

    const day = workoutData.days[this.state.selectedDayIndex];
    const allDone = Object.keys(this.state.completedExercises).length >= day.exercises.length;

    this.saveProgress();

    setTimeout(() => {
      if (allDone) {
        this.showDayComplete();
      } else {
        // Go back to the exercise menu so user can pick the next exercise
        this.navigateTo('exercise-menu', 'back');
        setTimeout(() => this.renderExerciseMenu(), 100);
      }
    }, 1500);
  },


  // ----------------------------------------------------------
  // DAY COMPLETE SCREEN
  // ----------------------------------------------------------
  showDayComplete() {
    const elapsed = this.state.workoutStartTime ? Date.now() - this.state.workoutStartTime : 0;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const timeEl = document.getElementById('complete-time-value');
    if (timeEl) timeEl.textContent = timeStr;

    this._stopWorkoutTimer();
    this.clearProgress();
    this._releaseWakeLock();
    RestTimer.stop();
    RestTimer.hideSheet();

    this.navigateTo('complete', 'forward');

    setTimeout(() => startConfetti(), 350);
  },


  // ----------------------------------------------------------
  // END WORKOUT
  // ----------------------------------------------------------
  endWorkout() {
    this._stopWorkoutTimer();
    this._releaseWakeLock();
    this.clearProgress();
    RestTimer.stop();
    RestTimer.hideSheet();

    const iframe = document.getElementById('exercise-video');
    if (iframe) {
      iframe.src = '';
    }

    this.state.selectedDayIndex = null;
    this.state.currentExerciseIndex = 0;
    this.state.currentSet = 1;
    this.state.completedExercises = {};
    this.state.workoutStartTime = null;
    this.state.setDoneLocked = false;

    this.renderDayCards();
    this.startQuoteRotation();

    this.navigateTo('home', 'back');
  },


  // ----------------------------------------------------------
  // WORKOUT ELAPSED TIMER
  // ----------------------------------------------------------
  _startWorkoutTimer() {
    const updateEls = () => {
      if (!this.state.workoutStartTime) return;
      const elapsed = Date.now() - this.state.workoutStartTime;
      const m = Math.floor(elapsed / 60000);
      const s = Math.floor((elapsed % 60000) / 1000);
      const str = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      const el = document.getElementById('workout-timer');
      if (el) el.textContent = str;
      const elMenu = document.getElementById('workout-timer-menu');
      if (elMenu) elMenu.textContent = str;
    };

    this.state.workoutTimerInterval = setInterval(updateEls, 1000);
  },

  _stopWorkoutTimer() {
    if (this.state.workoutTimerInterval) {
      clearInterval(this.state.workoutTimerInterval);
      this.state.workoutTimerInterval = null;
    }
    const el = document.getElementById('workout-timer');
    if (el) el.textContent = '00:00';
    const elMenu = document.getElementById('workout-timer-menu');
    if (elMenu) elMenu.textContent = '00:00';
    localStorage.removeItem('gym-app-workout-timer');
  },

  _persistWorkoutTimer() {
    if (!this.state.workoutStartTime) return;
    try {
      localStorage.setItem('gym-app-workout-timer', JSON.stringify({
        workoutStartTime: this.state.workoutStartTime
      }));
    } catch (e) {}
  },

  _restoreWorkoutTimer() {
    try {
      const raw = localStorage.getItem('gym-app-workout-timer');
      if (!raw) return;
      const data = JSON.parse(raw);
      if (!data.workoutStartTime) return;
      if (!this.state.workoutStartTime) {
        this.state.workoutStartTime = data.workoutStartTime;
        this._startWorkoutTimer();
      }
    } catch (e) {
      localStorage.removeItem('gym-app-workout-timer');
    }
  },


  // ----------------------------------------------------------
  // WAKE LOCK API
  // ----------------------------------------------------------
  async _requestWakeLock() {
    if (!('wakeLock' in navigator)) return;
    try {
      this.state.wakeLock = await navigator.wakeLock.request('screen');

      document.addEventListener('visibilitychange', async () => {
        if (document.visibilityState === 'visible' && this.state.workoutStartTime) {
          try {
            this.state.wakeLock = await navigator.wakeLock.request('screen');
          } catch (e) {}
        }
      });
    } catch (e) {}
  },

  _releaseWakeLock() {
    if (this.state.wakeLock) {
      this.state.wakeLock.release().catch(() => {});
      this.state.wakeLock = null;
    }
  },


  // ----------------------------------------------------------
  // CONFIRMATION MODAL
  // ----------------------------------------------------------
  showModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.add('visible');
  },

  hideModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.remove('visible');
  },


  // ----------------------------------------------------------
  // EVENT LISTENERS
  // ----------------------------------------------------------
  setupEventListeners() {
    // Warmup "I'm ready" button
    document.getElementById('btn-ready')?.addEventListener('click', () => {
      this._beginWorkout();
    });

    // Back button on exercise screen → go to menu
    document.getElementById('btn-back')?.addEventListener('click', () => {
      this.navigateTo('exercise-menu', 'back');
      setTimeout(() => this.renderExerciseMenu(), 100);
    });

    // Back button on menu → end workout modal
    document.getElementById('btn-menu-back')?.addEventListener('click', () => {
      this.showModal();
    });

    // Modal — keep going
    document.getElementById('modal-no')?.addEventListener('click', () => {
      this.hideModal();
    });

    // Modal — end workout
    document.getElementById('modal-yes')?.addEventListener('click', () => {
      this.hideModal();
      this.endWorkout();
    });

    // Dismiss modal on backdrop tap
    document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) this.hideModal();
    });

    // SET DONE button
    document.getElementById('btn-set-done')?.addEventListener('click', () => {
      this.completeSet();
    });

    // Skip rest
    document.getElementById('btn-skip-rest')?.addEventListener('click', () => {
      RestTimer.skip();
    });

    // Day complete → back to home
    document.getElementById('btn-home')?.addEventListener('click', () => {
      this.renderDayCards();
      this.startQuoteRotation();
      this.navigateTo('home', 'back');
    });

    // Weight log: save on Enter key
    const weightInput = document.getElementById('weight-input');
    if (weightInput) {
      weightInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          weightInput.blur();
          const day = workoutData.days[this.state.selectedDayIndex];
          const exercise = day?.exercises[this.state.currentExerciseIndex];
          if (day && exercise && weightInput.value.trim()) {
            WeightLog.saveWeight(day.id, exercise.name, weightInput.value.trim());
            const hintEl = document.getElementById('weight-hint');
            if (hintEl) hintEl.textContent = `Logged: ${weightInput.value.trim()}`;
          }
        }
      });
    }
  }
};


// ============================================================
// BOOT
// ============================================================
document.addEventListener('DOMContentLoaded', () => App.init());
