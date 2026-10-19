import React, { useState } from 'react';
import { CharacterConfig, UserSettings } from '../../types/character';
import { translations } from '../../i18n/translations';
import { CharacterSvg } from '../character/CharacterSvg';
import { NavTab } from '../layout/Navbar';
import { soundEngine } from '../../utils/audio';
import {
  Palette,
  Shirt,
  MessageCircle,
  Gamepad2,
  Sparkles,
  Coins,
  Star,
  Heart,
  ChevronRight,
  Smile,
} from 'lucide-react';

interface HomePageProps {
  character: CharacterConfig;
  settings: UserSettings;
  onNavigate: (tab: NavTab) => void;
  onUpdateCharacter: (char: CharacterConfig) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  character,
  settings,
  onNavigate,
}) => {
  const [isJumping, setIsJumping] = useState(false);
  const [activeReaction, setActiveReaction] = useState<string | null>(null);

  const t = translations[settings.language] || translations.uz;

  const handleCharacterTap = () => {
    soundEngine.playGiggle();
    setIsJumping(true);
    const reactions = ['happy', 'shy', 'surprised'];
    const r = reactions[Math.floor(Math.random() * reactions.length)];
    setActiveReaction(r);

    window.setTimeout(() => {
      setIsJumping(false);
    }, 600);

    window.setTimeout(() => {
      setActiveReaction(null);
    }, 2200);
  };

  const displayName = settings.userName || (settings.language === 'uz' ? 'Do\'stim' : 'Friend');
  const greeting = t.home.heroGreeting.replace('{name}', displayName);

  return (
    <div className="space-y-8 pb-12">
      {/* ── HERO BANNER WITH CURRENT CHARACTER ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600/20 via-pink-500/20 to-amber-400/20 dark:from-purple-900/40 dark:via-pink-950/40 dark:to-indigo-950/40 border border-purple-200/60 dark:border-purple-800/40 p-6 md:p-10 shadow-xl backdrop-blur-md">
        {/* Soft Background Radial Glow */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-pink-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Info & Actions */}
          <div className="md:col-span-7 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-purple-700 dark:text-purple-300 text-xs font-bold shadow-sm border border-purple-100 dark:border-purple-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.home.statusReady}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white leading-tight">
              {greeting}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-xl">
              {t.home.welcomeBack}
            </p>

            {/* Current Character Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              <span className="px-3 py-1 rounded-xl bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-800">
                {t.home.activeCharacter}: {character.name}
              </span>
              <span className="px-3 py-1 rounded-xl bg-pink-100 dark:bg-pink-950/70 text-pink-700 dark:text-pink-300 text-xs font-bold border border-pink-200 dark:border-pink-800">
                {t.home.currentOutfit}: {t.wardrobe.outfits[character.outfit.id] || character.outfit.id}
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => {
                  soundEngine.playPop();
                  onNavigate('chat');
                }}
                className="px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.home.btnChat}</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playPop();
                  onNavigate('studio');
                }}
                className="px-5 py-3 rounded-2xl font-bold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-purple-100 dark:border-slate-700 cursor-pointer"
              >
                <Palette className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>{t.home.btnStudio}</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playPop();
                  onNavigate('wardrobe');
                }}
                className="px-5 py-3 rounded-2xl font-bold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-purple-100 dark:border-slate-700 cursor-pointer"
              >
                <Shirt className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                <span>{t.home.btnWardrobe}</span>
              </button>
            </div>
          </div>

          {/* Right Live 2D Character Display */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div
              onClick={handleCharacterTap}
              className="relative group cursor-pointer w-64 md:w-80 flex flex-col items-center"
              title={t.home.tapToReact}
            >
              {/* Tap Reaction Floating Speech */}
              {activeReaction && (
                <div className="absolute -top-10 bg-white dark:bg-slate-900 px-4 py-1.5 rounded-full shadow-lg border border-pink-200 text-xs font-bold text-pink-600 dark:text-pink-400 animate-bounce flex items-center gap-1 z-30">
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                  <span>Hehe! ♡</span>
                </div>
              )}

              {/* Character SVG Component */}
              <CharacterSvg
                config={character}
                emotion={(activeReaction as any) || 'normal'}
                isJumping={isJumping}
                isSpeaking={false}
                isWaving={false}
                className="transition-transform group-hover:scale-105 duration-300"
              />

              {/* Tap me indicator badge */}
              <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 text-[11px] font-bold text-purple-600 dark:text-purple-300 shadow-sm border border-purple-100 dark:border-slate-700 opacity-80 group-hover:opacity-100 transition-opacity">
                <Smile className="w-3.5 h-3.5" />
                <span>{t.home.tapToReact}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ACTION TILES ── */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            tab: 'studio' as NavTab,
            title: t.home.btnStudio,
            desc: t.studio.subtitle,
            icon: Palette,
            gradient: 'from-purple-500 to-indigo-600',
          },
          {
            tab: 'wardrobe' as NavTab,
            title: t.home.btnWardrobe,
            desc: t.wardrobe.subtitle,
            icon: Shirt,
            gradient: 'from-pink-500 to-rose-600',
          },
          {
            tab: 'chat' as NavTab,
            title: t.home.btnChat,
            desc: t.chat.subtitle,
            icon: MessageCircle,
            gradient: 'from-amber-500 to-orange-600',
          },
          {
            tab: 'games' as NavTab,
            title: t.home.btnGames,
            desc: t.games.subtitle,
            icon: Gamepad2,
            gradient: 'from-emerald-500 to-teal-600',
          },
        ].map((tile) => {
          const Icon = tile.icon;
          return (
            <button
              key={tile.tab}
              onClick={() => {
                soundEngine.playPop();
                onNavigate(tile.tab);
              }}
              className="p-5 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-purple-100 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-left group cursor-pointer flex flex-col justify-between"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${tile.gradient} flex items-center justify-center text-white shadow-md mb-3 group-hover:rotate-6 transition-transform`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-base group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {tile.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                  {tile.desc}
                </p>
              </div>
              <div className="mt-3 flex items-center text-xs font-bold text-purple-600 dark:text-purple-400 gap-1">
                <span>Open</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </section>

      {/* ── YUIMI'S DAILY TIP & STATS SECTION ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Yuimi Tip (2 cols) */}
        <div className="md:col-span-2 p-6 rounded-3xl bg-gradient-to-r from-purple-100/70 via-pink-100/70 to-amber-50/70 dark:from-slate-900/90 dark:via-purple-950/40 dark:to-slate-900/90 border border-purple-200/60 dark:border-purple-800/40 shadow-md flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-800 dark:text-white text-sm md:text-base flex items-center gap-2">
              <span>{t.home.yuimiTipTitle}</span>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                Tip
              </span>
            </h4>
            <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed">
              {t.home.yuimiTip}
            </p>
          </div>
        </div>

        {/* User Stats Card (1 col) */}
        <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-purple-100 dark:border-slate-800 shadow-md flex flex-col justify-between">
          <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-3">
            {t.home.dailyStats}
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-2xl border border-amber-200 dark:border-amber-900/40 flex items-center gap-2">
              <Coins className="w-6 h-6 text-amber-500" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.home.coins}</p>
                <p className="text-lg font-black text-amber-600 dark:text-amber-400">
                  {settings.coins}
                </p>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/40 p-3 rounded-2xl border border-purple-200 dark:border-purple-900/40 flex items-center gap-2">
              <Star className="w-6 h-6 text-purple-500 fill-purple-500" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.home.stars}</p>
                <p className="text-lg font-black text-purple-600 dark:text-purple-400">
                  {settings.stars}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
