import { CharacterConfig, UserSettings } from '../types/character';
import { readyPresets } from '../data/presets';

const STORAGE_KEYS = {
  ACTIVE_CHAR: 'yume_active_character_v2',
  CHAR_LIST: 'yume_character_list_v2',
  SETTINGS: 'yume_user_settings_v2',
};

export const defaultSettings: UserSettings = {
  deviceMode: 'auto',
  language: 'uz', // Uzbek default as requested
  theme: 'light',
  accent: 'purple',
  bgmEnabled: false,
  sfxEnabled: true,
  masterVolume: 0.7,
  animationLevel: 'full',
  textSize: 'normal',
  guideGender: 'girl',
  hasCompletedIntro: false,
  userName: '',
  coins: 50,
  stars: 5,
  unlockedBadges: ['welcome_creator'],
};

export function getStoredSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return defaultSettings;
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return defaultSettings;
  }
}

export function saveStoredSettings(settings: UserSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch {}
}

export function getStoredCharacters(): CharacterConfig[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHAR_LIST);
    if (!raw) {
      // Initialize with default presets so user has an instant rich collection
      const initial = [readyPresets[0], readyPresets[2], readyPresets[3], readyPresets[4]];
      saveStoredCharacters(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [readyPresets[0]];
  } catch {
    return [readyPresets[0]];
  }
}

export function saveStoredCharacters(list: CharacterConfig[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CHAR_LIST, JSON.stringify(list));
  } catch {}
}

export function getActiveCharacter(): CharacterConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_CHAR);
    if (raw) return JSON.parse(raw);
    return readyPresets[0];
  } catch {
    return readyPresets[0];
  }
}

export function saveActiveCharacter(char: CharacterConfig): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_CHAR, JSON.stringify(char));
  } catch {}
}
