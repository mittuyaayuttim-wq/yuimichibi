import { Language } from '../types/character';

export interface VoiceOptions {
  pitch?: number;
  rate?: number;
  voiceURI?: string;
  language?: Language;
}

const langCodes: Record<Language, string[]> = {
  uz: ['uz-UZ', 'tr-TR', 'ru-RU', 'en-US'],
  ru: ['ru-RU', 'ru'],
  en: ['en-US', 'en-GB', 'en'],
  tr: ['tr-TR', 'tr'],
  ja: ['ja-JP', 'ja'],
};

class VoiceService {
  private synth: SpeechSynthesis | null = null;
  private recognition: any = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  public getVoicesForLanguage(lang: Language): SpeechSynthesisVoice[] {
    const all = this.getVoices();
    const codes = langCodes[lang] || ['en-US'];

    // Find voices that match any of the preference codes
    for (const code of codes) {
      const filtered = all.filter((v) => v.lang.toLowerCase().startsWith(code.toLowerCase().slice(0, 2)));
      if (filtered.length > 0) return filtered;
    }

    return all;
  }

  public speak(
    text: string,
    options: VoiceOptions = {},
    onSpeakingChange?: (isSpeaking: boolean) => void
  ): boolean {
    if (!this.synth) {
      onSpeakingChange?.(false);
      return false;
    }

    // Cancel current speaking
    this.synth.cancel();

    // Clean text of emotion tags or markdown before reading
    const cleanText = text.replace(/\[EMOTION:[^\]]+\]/gi, '').trim();
    if (!cleanText) {
      onSpeakingChange?.(false);
      return false;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.pitch = options.pitch ?? 1.1;
    utterance.rate = options.rate ?? 1.0;

    const voices = this.getVoices();
    if (options.voiceURI) {
      const selected = voices.find((v) => v.voiceURI === options.voiceURI);
      if (selected) utterance.voice = selected;
    } else if (options.language) {
      const langVoices = this.getVoicesForLanguage(options.language);
      if (langVoices.length > 0) {
        // Prefer female/cute voice if available, else first
        const female = langVoices.find((v) => /female|girl|google|natural/i.test(v.name));
        utterance.voice = female || langVoices[0];
      }
    }

    utterance.onstart = () => {
      onSpeakingChange?.(true);
    };

    utterance.onend = () => {
      onSpeakingChange?.(false);
    };

    utterance.onerror = () => {
      onSpeakingChange?.(false);
    };

    try {
      this.synth.speak(utterance);
      return true;
    } catch {
      onSpeakingChange?.(false);
      return false;
    }
  }

  public stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  // Web Speech API speech-to-text recognition
  public startListening(
    lang: Language,
    onResult: (text: string) => void,
    onEnd: () => void,
    onError: (err: string) => void
  ): { stop: () => void } | null {
    if (typeof window === 'undefined') return null;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      onError('Speech recognition not supported in this browser');
      return null;
    }

    try {
      this.recognition = new SpeechRecognition();
      const code = (langCodes[lang] && langCodes[lang][0]) || 'en-US';
      this.recognition.lang = code;
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      this.recognition.onend = () => {
        onEnd();
      };

      this.recognition.onerror = (e: any) => {
        onError(e.error || 'Recognition error');
      };

      this.recognition.start();

      return {
        stop: () => {
          try {
            this.recognition?.stop();
          } catch {}
        },
      };
    } catch (err: any) {
      onError(err?.message || 'Failed to start microphone');
      return null;
    }
  }
}

export const voiceService = new VoiceService();
