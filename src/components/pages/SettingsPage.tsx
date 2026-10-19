import React, { useState } from 'react';
import {
  UserSettings,
  DeviceMode,
  Language,
  ThemeMode,
  AccentColor,
  AnimationLevel,
} from '../../types/character';
import { translations } from '../../i18n/translations';
import { soundEngine } from '../../utils/audio';
import { defaultSettings } from '../../utils/storage';
import {
  Monitor,
  Smartphone,
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  Languages,
  Sun,
  Moon,
  Trash2,
  Type,
  Flame,
  Zap,
} from 'lucide-react';

interface SettingsPageProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onRerunIntro: () => void;
  onResetAllData: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  settings,
  onUpdateSettings,
  onRerunIntro,
  onResetAllData,
}) => {
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const t = translations[settings.language] || translations.uz;

  const handleDeviceModeChange = (mode: DeviceMode) => {
    soundEngine.playPop();
    onUpdateSettings({ deviceMode: mode });
  };

  const handleLanguageChange = (lang: Language) => {
    soundEngine.playPop();
    onUpdateSettings({ language: lang });
  };

  const handleThemeChange = (theme: ThemeMode) => {
    soundEngine.playPop();
    onUpdateSettings({ theme });
  };

  const handleAccentChange = (accent: AccentColor) => {
    soundEngine.playPop();
    onUpdateSettings({ accent });
  };

  const handleBgmToggle = () => {
    const next = !settings.bgmEnabled;
    soundEngine.setBgmEnabled(next);
    onUpdateSettings({ bgmEnabled: next });
    if (next) soundEngine.playPop();
  };

  const handleVolumeChange = (vol: number) => {
    soundEngine.setMasterVolume(vol);
    onUpdateSettings({ masterVolume: vol });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* ── HEADER TITLE ── */}
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 rounded-3xl border border-purple-100 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white">
          {t.settings.title}
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t.settings.subtitle}
        </p>
      </div>

      {/* ── 1. DEVICE MODE SELECTOR (PC / PHONE / AUTO) ── */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-purple-100 dark:border-slate-800 shadow-md space-y-4">
        <div>
          <h3 className="font-extrabold text-base text-slate-800 dark:text-white flex items-center gap-2">
            <Monitor className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>{t.settings.deviceMode}</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Switch between computer multi-column view and compact mobile touch phone frame
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'auto' as DeviceMode, label: t.settings.deviceAuto, icon: Sparkles },
            { id: 'pc' as DeviceMode, label: t.settings.devicePc, icon: Monitor },
            { id: 'phone' as DeviceMode, label: t.settings.devicePhone, icon: Smartphone },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = settings.deviceMode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleDeviceModeChange(item.id)}
                className={`p-4 rounded-2xl border text-left font-bold text-sm transition-all flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-[1.02]'
                    : 'bg-purple-50/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-purple-100 dark:border-slate-700 hover:bg-purple-100/60'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2. SYSTEM LANGUAGE (5 LANGUAGES) ── */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-purple-100 dark:border-slate-800 shadow-md space-y-4">
        <h3 className="font-extrabold text-base text-slate-800 dark:text-white flex items-center gap-2">
          <Languages className="w-5 h-5 text-pink-500" />
          <span>{t.settings.language}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { code: 'uz' as Language, label: "O'zbekcha", flag: '🇺🇿' },
            { code: 'ru' as Language, label: 'Русский', flag: '🇷🇺' },
            { code: 'en' as Language, label: 'English', flag: '🇬🇧' },
            { code: 'tr' as Language, label: 'Türkçe', flag: '🇹🇷' },
            { code: 'ja' as Language, label: '日本語', flag: '🇯🇵' },
          ].map((l) => (
            <button
              key={l.code}
              onClick={() => handleLanguageChange(l.code)}
              className={`p-3.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer border ${
                settings.language === l.code
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-md scale-105'
                  : 'bg-purple-50/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-purple-100 dark:border-slate-700 hover:bg-purple-100/50'
              }`}
            >
              <span className="text-2xl">{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. VISUAL THEME & ACCENT COLOR ── */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-purple-100 dark:border-slate-800 shadow-md space-y-6">
        <div>
          <h3 className="font-extrabold text-base text-slate-800 dark:text-white flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-500" />
            <span>{t.settings.theme}</span>
          </h3>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {[
              { id: 'light' as ThemeMode, label: t.settings.themeLight, icon: Sun },
              { id: 'dark' as ThemeMode, label: t.settings.themeDark, icon: Moon },
              { id: 'auto' as ThemeMode, label: t.settings.themeAuto, icon: Sparkles },
            ].map((th) => (
              <button
                key={th.id}
                onClick={() => handleThemeChange(th.id)}
                className={`py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                  settings.theme === th.id
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                    : 'bg-purple-50/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-purple-100 dark:border-slate-700'
                }`}
              >
                <th.icon className="w-4 h-4" />
                <span>{th.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4 Accent Colors */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            {t.settings.accentColor}
          </label>
          <div className="flex items-center gap-3">
            {[
              { id: 'purple' as AccentColor, color: '#8b5cf6', label: 'Celestial Violet' },
              { id: 'sakura' as AccentColor, color: '#ec4899', label: 'Sakura Pink' },
              { id: 'blue' as AccentColor, color: '#3b82f6', label: 'Sky Blue' },
              { id: 'emerald' as AccentColor, color: '#10b981', label: 'Matcha Green' },
            ].map((acc) => (
              <button
                key={acc.id}
                onClick={() => handleAccentChange(acc.id)}
                style={{ backgroundColor: acc.color }}
                title={acc.label}
                className={`w-10 h-10 rounded-full border-2 transition-transform cursor-pointer ${
                  settings.accent === acc.id
                    ? 'scale-125 border-white shadow-lg'
                    : 'border-transparent hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. SOUND & WEB AUDIO AMBIENT BGM ── */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-purple-100 dark:border-slate-800 shadow-md space-y-4">
        <h3 className="font-extrabold text-base text-slate-800 dark:text-white flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-indigo-500" />
          <span>{t.settings.soundSettings}</span>
        </h3>

        {/* BGM Toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-50 dark:bg-slate-800/60">
          <div>
            <p className="font-bold text-xs text-slate-800 dark:text-white">
              {t.settings.bgmLabel}
            </p>
            <p className="text-[11px] text-slate-500">Soothing procedural pentatonic harp melody</p>
          </div>
          <button
            onClick={handleBgmToggle}
            className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
              settings.bgmEnabled
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {settings.bgmEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* SFX Toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-50 dark:bg-slate-800/60">
          <p className="font-bold text-xs text-slate-800 dark:text-white">
            {t.settings.sfxLabel}
          </p>
          <button
            onClick={() => onUpdateSettings({ sfxEnabled: !settings.sfxEnabled })}
            className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
              settings.sfxEnabled
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {settings.sfxEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Master Volume Slider */}
        <div className="space-y-1 pt-1">
          <div className="flex justify-between text-xs text-slate-500 font-bold">
            <span>{t.settings.volumeLabel}</span>
            <span>{Math.round(settings.masterVolume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={settings.masterVolume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-full accent-purple-600 cursor-pointer"
          />
        </div>
      </div>

      {/* ── 5. ANIMATIONS & TEXT SIZE ── */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-purple-100 dark:border-slate-800 shadow-md space-y-6">
        <div>
          <h3 className="font-extrabold text-base text-slate-800 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <span>{t.settings.animations}</span>
          </h3>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {[
              { id: 'full' as AnimationLevel, label: t.settings.animFull },
              { id: 'reduced' as AnimationLevel, label: t.settings.animReduced },
              { id: 'off' as AnimationLevel, label: t.settings.animOff },
            ].map((an) => (
              <button
                key={an.id}
                onClick={() => onUpdateSettings({ animationLevel: an.id })}
                className={`py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                  settings.animationLevel === an.id
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                    : 'bg-purple-50/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-purple-100 dark:border-slate-700'
                }`}
              >
                {an.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-extrabold text-base text-slate-800 dark:text-white flex items-center gap-2">
            <Type className="w-5 h-5 text-purple-600" />
            <span>{t.settings.textSize}</span>
          </h3>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {(['small', 'normal', 'large'] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => onUpdateSettings({ textSize: sz })}
                className={`py-2.5 rounded-2xl text-xs font-bold capitalize transition-all cursor-pointer border ${
                  settings.textSize === sz
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                    : 'bg-purple-50/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-purple-100 dark:border-slate-700'
                }`}
              >
                {t.settings[`text${sz.charAt(0).toUpperCase() + sz.slice(1)}` as keyof typeof t.settings] || sz}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 6. DANGER ZONE & INTRO RERUN ── */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-purple-100 dark:border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-4">
        {/* Rerun intro */}
        <button
          onClick={onRerunIntro}
          className="px-5 py-2.5 rounded-2xl font-bold text-xs bg-purple-100 dark:bg-slate-800 text-purple-700 dark:text-purple-300 hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.settings.rerunIntro}</span>
        </button>

        {/* Reset all data button */}
        <button
          onClick={() => setResetConfirmOpen(true)}
          className="px-5 py-2.5 rounded-2xl font-bold text-xs bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>{t.settings.resetAll}</span>
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-red-200 dark:border-red-900 space-y-4">
            <h3 className="text-lg font-bold text-red-600 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              <span>{t.settings.resetAll}</span>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {t.settings.resetConfirm}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setResetConfirmOpen(false);
                  onResetAllData();
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 cursor-pointer"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
