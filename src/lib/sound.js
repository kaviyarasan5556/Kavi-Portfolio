import { soundStore } from './stores';

const tones = {
  tick: { from: 880, to: 660, duration: 0.05 },
  open: { from: 420, to: 760, duration: 0.09 },
  confirm: { from: 520, to: 1040, duration: 0.16 },
};

let context = null;

/**
 * Plays a short synthesized blip. Does nothing unless the visitor has turned
 * sound on (it is off by default). No audio files are loaded.
 */
export function playTone(tone) {
  if (!soundStore.get()) return;

  try {
    context ??= new AudioContext();
    if (context.state === 'suspended') void context.resume();

    const { from, to, duration } = tones[tone];
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(from, now);
    oscillator.frequency.exponentialRampToValueAtTime(to, now + duration);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.05, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  } catch {
    // Audio is a nicety; never let it break an interaction.
  }
}
