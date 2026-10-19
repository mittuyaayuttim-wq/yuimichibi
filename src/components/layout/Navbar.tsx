import React, { useState } from 'react';
import { Language, UserSettings } from '../../types/character';
import { translations } from '../../i18n/translations';
import { soundEngine } from '../../utils/audio';
import {
  Home,
  Palette,
  Shirt,
  MessageCircle,
  Images,
  Gamepad2,
  Settings as SettingsIcon,
  HelpCircle,
  Volume2,
  VolumeX,
  Coins,
  Star,
  Globe,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

export type NavTab =
  | 'home'
  | 'studio'
  | 'wardrobe'
  | 'chat'
  | 'gallery'
  | 'games'
  | 'settings'
  | 'about';

interface NavbarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  settings,
  onUpdateSettings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = translations[settings.language] || translations.uz;

  const navItems = [
    { id: 'home' as NavTab, label: t.nav.home, icon: Home },
    { id: 'studio' as NavTab, label: t.nav.studio, icon: Palette },
    { id: 'wardrobe' as NavTab, label: t.nav.wardrobe, icon: Shirt },
    { id: 'chat' as NavTab, label: t.nav.chat, icon: MessageCircle },
    { id: 'gallery' as NavTab, label: t.nav.gallery, icon: Images },
    { id: 'games' as NavTab, label: t.nav.games, icon: Gamepad2 },
    { id: 'settings' as NavTab, label: t.nav.settings, icon: SettingsIcon },
    { id: 'about' as NavTab, label: t.nav.about, icon: HelpCircle },
  ];

  const languages = [
    { code: 'uz' as Language, label: "O'zbekcha", flag: '🇺🇿' },
    { code: 'ru' as Language, label: 'Русский', flag: '🇷🇺' },
    { code: 'en' as Language, label: 'English', flag: '🇬🇧' },
    { code: 'tr' as Language, label: 'Türkçe', flag: '🇹🇷' },
    { code: 'ja' as Language, label: '日本語', flag: '🇯🇵' },
  ];

  const handleTabClick = (tab: NavTab) => {
    soundEngine.playPop();
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  const toggleSound = () => {
    const next = !settings.bgmEnabled;
    soundEngine.setBgmEnabled(next);
    onUpdateSettings({ bgmEnabled: next });
    if (next) soundEngine.playPop();
  };

  return (
    <>
      {/* ── DESKTOP FLOATING GLASS TOP BAR ── */}
      <header className="sticky top-2 z-40 px-3 md:px-6 max-w-7xl mx-auto w-full">
        <nav className="bg-white/80 dark:bg-slate-900/85 backdrop-blur-xl border border-purple-200/50 dark:border-purple-900/40 rounded-2xl md:rounded-full px-4 py-2.5 shadow-lg shadow-purple-500/10 flex items-center justify-between gap-2">
          {/* Logo & Title */}
          <div
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 via-purple-600 to-amber-400 p-0.5 shadow-md flex items-center justify-center group-hover:rotate-12 transition-transform">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-base md:text-lg bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
                YumeChibi
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-white shadow-md shadow-purple-500/30'
                      : 'text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 rounded-full -z-10" />
                  )}
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Icons: Economy, Sound, Language */}
          <div className="flex items-center gap-2">
            {/* Coins & Stars badges */}
            <div className="hidden sm:flex items-center gap-2 bg-purple-50 dark:bg-slate-800/80 px-3 py-1 rounded-full border border-purple-100 dark:border-purple-900/40 text-xs font-bold">
              <span className="flex items-center gap-1 text-amber-500">
                <Coins className="w-3.5 h-3.5" />
                {settings.coins}
              </span>
              <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                <Star className="w-3.5 h-3.5 fill-purple-500" />
                {settings.stars}
              </span>
            </div>

            {/* BGM Sound Toggle */}
            <button
              onClick={toggleSound}
              title={settings.bgmEnabled ? 'Mute Music' : 'Play Ambient Music'}
              className="p-2 rounded-full bg-purple-100/70 dark:bg-slate-800 text-purple-700 dark:text-purple-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {settings.bgmEnabled ? (
                <Volume2 className="w-4 h-4 text-purple-600 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 opacity-70" />
              )}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="px-2.5 py-1.5 rounded-full bg-purple-100/70 dark:bg-slate-800 text-purple-700 dark:text-purple-300 hover:scale-105 active:scale-95 transition-all text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="uppercase">{settings.language}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-purple-100 dark:border-slate-800 py-1.5 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        soundEngine.playPop();
                        onUpdateSettings({ language: l.code });
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center gap-2 hover:bg-purple-50 dark:hover:bg-slate-800 cursor-pointer ${
                        settings.language === l.code ? 'text-purple-600 dark:text-purple-400 font-bold' : ''
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Drawer Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-purple-100/70 dark:bg-slate-800 text-purple-700 dark:text-purple-300 hover:scale-105 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Hamburger Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-purple-200/50 dark:border-slate-800 rounded-3xl p-4 shadow-2xl space-y-1">
            <div className="flex items-center justify-between px-3 py-2 border-b border-purple-100 dark:border-slate-800 mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Navigation</span>
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="flex items-center gap-1 text-amber-500">
                  <Coins className="w-3.5 h-3.5" />
                  {settings.coins}
                </span>
                <span className="flex items-center gap-1 text-purple-500">
                  <Star className="w-3.5 h-3.5 fill-purple-500" />
                  {settings.stars}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`px-3 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* ── MOBILE BOTTOM TAB BAR (PUPPY BAR) ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-purple-100 dark:border-purple-950/60 px-2 py-1.5 shadow-2xl flex items-center justify-around">
        {[
          { id: 'home' as NavTab, label: t.nav.home, icon: Home },
          { id: 'studio' as NavTab, label: t.nav.studio, icon: Palette },
          { id: 'wardrobe' as NavTab, label: t.nav.wardrobe, icon: Shirt },
          { id: 'chat' as NavTab, label: t.nav.chat, icon: MessageCircle },
          { id: 'games' as NavTab, label: t.nav.games, icon: Gamepad2 },
          { id: 'settings' as NavTab, label: t.nav.settings, icon: SettingsIcon },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-purple-600 dark:text-purple-400 font-bold scale-110'
                  : 'text-slate-500 dark:text-slate-400 hover:text-purple-500'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
