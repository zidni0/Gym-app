// sound.js — Audio management with Web Audio API fallback

const SoundManager = {
  audioContext: null,
  mp3Audio: null,
  mp3Ready: false,
  mp3Failed: false,

  init() {
    // Attempt to preload the MP3 file
    this.mp3Audio = new Audio();
    this.mp3Audio.preload = 'auto';

    this.mp3Audio.addEventListener('canplaythrough', () => {
      this.mp3Ready = true;
    }, { once: true });

    this.mp3Audio.addEventListener('error', () => {
      this.mp3Failed = true;
    }, { once: true });

    this.mp3Audio.src = 'assets/audio/timer-end.mp3';
    this.mp3Audio.load();
  },

  // Lazily create AudioContext on first user gesture (browser requirement)
  getContext() {
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        return null;
      }
    }
    // Resume if suspended (auto-play policy)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => {});
    }
    return this.audioContext;
  },

  // Play the timer-end chime — tries MP3 first, falls back to Web Audio API
  playChime() {
    if (this.mp3Ready && !this.mp3Failed) {
      this.mp3Audio.currentTime = 0;
      this.mp3Audio.play().catch(() => this._playGeneratedChime());
    } else {
      this._playGeneratedChime();
    }
  },

  // Two-tone ascending chime: 440 Hz then 660 Hz, sine wave, smooth fade
  _playGeneratedChime() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    const playTone = (frequency, startTime, duration) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, startTime);

        // Smooth attack and exponential decay
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.35, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.start(startTime);
        osc.stop(startTime + duration);
      } catch (e) {
        // Silently fail — audio is non-critical
      }
    };

    playTone(440, now, 0.35);        // First tone: A4
    playTone(660, now + 0.38, 0.45); // Second tone: E5
  },

  // Short click/tick for UI feedback (optional, very subtle)
  playTick() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  }
};
