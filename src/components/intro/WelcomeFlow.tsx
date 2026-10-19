import React, { useState } from 'react';
import { Language, UserSettings } from '../../types/character';
import { translations } from '../../i18n/translations';
import { YuimiGuide } from '../character/YuimiGuide';
import { CharacterSvg } from '../character/CharacterSvg';
import { readyPresets } from '../../data/presets';
import { soundEngine } from '../../utils/audio';
import { Sparkles, Globe, ArrowRight, UserCheck, Heart } from 'lucide-react';

interface WelcomeFlowProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onComplete: () => void;
}

export const WelcomeFlow: React.FC<WelcomeFlowProps> = ({
  settings,
  onUpdateSettings,
  onComplete,
}) => {
  // Step 1 = Welcome & Language, Step 2 = Choose Gender, Step 3 = Yuimi Greeting & Name
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedGender, setSelectedGender] = useState<'girl' | 'boy'>(settings.guideGender || 'girl');
  const [userName, setUserName] = useState(settings.userName || '');

  const t = translations[settings.language] || translations.uz;

  const handleLanguageSelect = (lang: Language) => {
    soundEngine.playPop();
    onUpdateSettings({ language: lang });
  };

  const handleGenderSelect = (gender: 'girl' | 'boy') => {
    soundEngine.playPop();
    setSelectedGender(gender);
    onUpdateSettings({ guideGender: gender });
    setStep(3);
  };

  const handleFinish = () => {
    soundEngine.playSuccess();
    onUpdateSettings({
      hasCompletedIntro: true,
      guideGender: selectedGender,
      userName: userName.trim() || (selectedGender === 'girl' ? 'Yume Friend' : 'Adventurer'),
    });
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      {/* Floating background magical particles / stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/30 animate-pulse"
            style={{
              width: `${(i % 5) + 3}px`,
              height: `${(i % 5) + 3}px`,
              top: `${(i * 19) % 100}%`,
              left: `${(i * 37) % 100}%`,
              animationDuration: `${(i % 3) + 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-3xl z-10 my-auto">
        {/* ── STEP 1: WELCOME & LANGUAGE ── */}
        {step === 1 && (
          <div className="bg-white/10 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-10 text-white shadow-2xl text-center">
            {/* Sparkling Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-sm font-bold mb-4 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>YumeChibi Studio</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 bg-gradient-to-r from-pink-200 via-purple-200 to-amber-200 bg-clip-text text-transparent">
              {t.intro.welcomeTitle}
            </h1>
            <p className="text-purple-100/90 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              {t.intro.welcomeSubtitle}
            </p>

            {/* Language Selection Chips */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-purple-200 uppercase tracking-wider mb-3 flex items-center justify-center gap-2">
                <Globe className="w-4 h-4" />
                {t.intro.chooseLanguage}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {(
                  [
                    { code: 'uz', label: "O'zbekcha (Lotin)", flag: '🇺🇿' },
                    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
                    { code: 'en', label: 'English', flag: '🇬🇧' },
                    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
                    { code: 'ja', label: '日本語', flag: '🇯🇵' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.code}
                    onClick={() => handleLanguageSelect(item.code)}
                    className={`px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer ${
                      settings.language === item.code
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-500/40 scale-105 border-2 border-white/40'
                        : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/10'
                    }`}
                  >
                    <span>{item.flag}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() => {
                soundEngine.playPop();
                setStep(2);
              }}
              className="px-8 py-3.5 rounded-full font-bold text-lg text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-purple-500/40 flex items-center gap-2 mx-auto cursor-pointer"
            >
              <span>{t.intro.letsStart}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* ── STEP 2: CHOOSE GENDER / GUIDE DIRECTION ── */}
        {step === 2 && (
          <div className="bg-white/10 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-10 text-white shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-extrabold mb-2 text-white">
                {t.intro.chooseGenderTitle}
              </h2>
              <p className="text-purple-200 text-base">{t.intro.chooseGenderSubtitle}</p>
            </div>

            {/* Two Big Animated Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              {/* Girl Option (Yuimi Celestial Girl) */}
              <button
                onClick={() => handleGenderSelect('girl')}
                className="group relative bg-white/10 hover:bg-white/20 border-2 border-pink-400/40 hover:border-pink-400 rounded-3xl p-6 transition-all duration-300 hover:scale-[1.03] text-left cursor-pointer flex flex-col items-center"
              >
                <div className="w-36 h-44 mb-3">
                  <CharacterSvg config={readyPresets[0]} emotion="happy" enableMouseTracking={false} />
                </div>
                <h3 className="text-xl font-bold text-pink-300 mb-1 flex items-center gap-2">
                  <Heart className="w-5 h-5 fill-pink-400 text-pink-400" />
                  {t.intro.girlTitle}
                </h3>
                <p className="text-xs text-center text-purple-100/80 leading-relaxed">
                  {t.intro.girlDesc}
                </p>
              </button>

              {/* Boy Option (Yuimi Celestial Boy) */}
              <button
                onClick={() => handleGenderSelect('boy')}
                className="group relative bg-white/10 hover:bg-white/20 border-2 border-blue-400/40 hover:border-blue-400 rounded-3xl p-6 transition-all duration-300 hover:scale-[1.03] text-left cursor-pointer flex flex-col items-center"
              >
                <div className="w-36 h-44 mb-3">
                  <CharacterSvg config={readyPresets[1]} emotion="happy" enableMouseTracking={false} />
                </div>
                <h3 className="text-xl font-bold text-blue-300 mb-1 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  {t.intro.boyTitle}
                </h3>
                <p className="text-xs text-center text-purple-100/80 leading-relaxed">
                  {t.intro.boyDesc}
                </p>
              </button>
            </div>

            <div className="flex justify-between items-center text-sm">
              <button
                onClick={() => setStep(1)}
                className="text-purple-300 hover:text-white transition-colors cursor-pointer"
              >
                ← {t.studio.btnUndo}
              </button>
              <button
                onClick={handleFinish}
                className="text-purple-300/70 hover:text-white transition-colors cursor-pointer underline"
              >
                {t.intro.skipIntro}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: YUIMI GREETING & NAME INPUT ── */}
        {step === 3 && (
          <div className="bg-white/10 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 text-white shadow-2xl">
            <h2 className="text-2xl font-extrabold text-center mb-6 text-amber-200 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              {t.intro.meetYuimi}
            </h2>

            {/* Yuimi Guide Interactive Component */}
            <div className="mb-6">
              <YuimiGuide
                gender={selectedGender}
                language={settings.language}
                dialogueText={
                  selectedGender === 'boy' ? t.intro.yuimiIntroBoy : t.intro.yuimiIntroGirl
                }
              />
            </div>

            {/* Name Input Box */}
            <div className="max-w-md mx-auto mb-6 bg-white/10 p-4 rounded-2xl border border-white/10">
              <label className="block text-sm font-semibold text-purple-200 mb-2">
                {t.intro.askName}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder={t.intro.namePlaceholder}
                  maxLength={20}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleFinish();
                  }}
                />
                <button
                  onClick={handleFinish}
                  className="px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white shadow-md flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{t.intro.letsStart}</span>
                </button>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleFinish}
                className="text-xs text-purple-300/80 hover:text-white underline cursor-pointer"
              >
                {t.intro.skipIntro}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
