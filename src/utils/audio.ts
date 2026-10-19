// Pure Web Audio API Synthesizer for ambient BGM and cute SFX

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private isBgmPlaying = false;
  private bgmTimer: number | null = null;
  private noteIndex = 0;

  // Pentatonic dream scale (Hz)
  private melodyNotes = [
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99, // G5
    880.00, // A5
    1046.50, // C6
    880.00,
    783.99,
    659.25,
    587.33
  ];

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);
        this.masterGain.gain.value = 0.5;

        this.bgmGain = this.ctx.createGain();
        this.bgmGain.connect(this.masterGain);
        this.bgmGain.gain.value = 0.15;

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.connect(this.masterGain);
        this.sfxGain.gain.value = 0.4;
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMasterVolume(vol: number) {
    this.init();
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, vol));
    }
  }

  public setBgmEnabled(enabled: boolean) {
    if (enabled) {
      this.startBgm();
    } else {
      this.stopBgm();
    }
  }

  public startBgm() {
    this.init();
    if (this.isBgmPlaying || !this.ctx) return;
    this.isBgmPlaying = true;
    this.playNextBgNote();
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      window.clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  private playNextBgNote() {
    if (!this.isBgmPlaying || !this.ctx || !this.bgmGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      const freq = this.melodyNotes[this.noteIndex % this.melodyNotes.length];
      this.noteIndex++;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Bell-like soft envelope
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.3, now + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(noteGain);
      noteGain.connect(this.bgmGain);

      osc.start(now);
      osc.stop(now + 1.25);

      // Schedule next note randomly between 400ms and 900ms for organic harp feel
      const delay = 480 + (this.noteIndex % 3 === 0 ? 320 : 0);
      this.bgmTimer = window.setTimeout(() => this.playNextBgNote(), delay);
    } catch {
      // AudioContext could still be waiting for user interaction
    }
  }

  // Cute Pop SFX for button clicks
  public playPop() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  // Sparkle / Wardrobe equip sound
  public playSparkle() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    try {
      const notes = [800, 1000, 1200, 1600];
      notes.forEach((freq, i) => {
        const now = this.ctx!.currentTime + i * 0.05;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(now);
        osc.stop(now + 0.16);
      });
    } catch {}
  }

  // Success chime (level up, quiz win)
  public playSuccess() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    try {
      const chords = [523.25, 659.25, 783.99, 1046.5];
      chords.forEach((freq, idx) => {
        const now = this.ctx!.currentTime + idx * 0.07;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(now);
        osc.stop(now + 0.36);
      });
    } catch {}
  }

  // Coin collect sound
  public playCoin() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.32);
    } catch {}
  }

  // Cute giggle or boing sound when tapping character
  public playGiggle() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    try {
      const freqs = [600, 750, 900, 750, 950];
      freqs.forEach((freq, i) => {
        const now = this.ctx!.currentTime + i * 0.04;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(now);
        osc.stop(now + 0.06);
      });
    } catch {}
  }
}

export const soundEngine = new SoundEngine();
