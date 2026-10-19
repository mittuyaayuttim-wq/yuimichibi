import React, { useState, useEffect } from 'react';
import {
  CharacterConfig,
  UserSettings,
} from './types/character';
import {
  getStoredSettings,
  saveStoredSettings,
  getStoredCharacters,
  saveStoredCharacters,
  getActiveCharacter,
  saveActiveCharacter,
  defaultSettings,
} from './utils/storage';
import { Navbar, NavTab } from './components/layout/Navbar';
import { WelcomeFlow } from './components/intro/WelcomeFlow';
import { HomePage } from './components/pages/HomePage';
import { StudioPage } from './components/pages/StudioPage';
import { WardrobePage } from './components/pages/WardrobePage';
import { ChatPage } from './components/pages/ChatPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { MiniGamesPage } from './components/pages/MiniGamesPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { AboutPage } from './components/pages/AboutPage';

export default function App() {
  const [settings, setSettings] = useState<UserSettings>(() => getStoredSettings());
  const [characters, setCharacters] = useState<CharacterConfig[]>(() => getStoredCharacters());
  const [activeCharacter, setActiveCharacter] = useState<CharacterConfig>(() => getActiveCharacter());
  const [currentTab, setCurrentTab] = useState<NavTab>('home');

  // Save settings whenever changed
  useEffect(() => {
    saveStoredSettings(settings);

    // Apply dark mode class
    const isDark =
      settings.theme === 'dark' ||
      (settings.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  // Save active character whenever changed
  useEffect(() => {
    saveActiveCharacter(activeCharacter);
    // Also update in characters list
    setCharacters((prev) =>
      prev.map((c) => (c.id === activeCharacter.id ? activeCharacter : c))
    );
  }, [activeCharacter]);

  // Save characters list
  useEffect(() => {
    saveStoredCharacters(characters);
  }, [characters]);

  const updateSettings = (newPartial: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newPartial }));
  };

  const handleResetAllData = () => {
    localStorage.clear();
    setSettings(defaultSettings);
    const initialChars = getStoredCharacters();
    setCharacters(initialChars);
    setActiveCharacter(initialChars[0]);
    setCurrentTab('home');
  };

  const handleSaveToGallery = (charToSave: CharacterConfig) => {
    const exists = characters.some((c) => c.id === charToSave.id);
    if (exists) {
      setCharacters((prev) =>
        prev.map((c) => (c.id === charToSave.id ? charToSave : c))
      );
    } else {
      setCharacters((prev) => [charToSave, ...prev]);
    }
    // Also earn coins for saving
    updateSettings({ coins: settings.coins + 15, stars: settings.stars + 1 });
  };

  // Accent gradient background map
  const bgThemes = {
    purple: 'from-purple-50/70 via-pink-50/50 to-indigo-50/70 dark:from-slate-950 dark:via-purple-950/30 dark:to-slate-950',
    sakura: 'from-pink-50/80 via-rose-50/50 to-purple-50/70 dark:from-slate-950 dark:via-pink-950/30 dark:to-slate-950',
    blue: 'from-sky-50/80 via-blue-50/50 to-indigo-50/70 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-950',
    emerald: 'from-emerald-50/80 via-teal-50/50 to-green-50/70 dark:from-slate-950 dark:via-emerald-950/30 dark:to-slate-950',
  };

  // Text size classes
  const textSizeClass =
    settings.textSize === 'small'
      ? 'text-xs'
      : settings.textSize === 'large'
      ? 'text-base'
      : 'text-sm';

  const isPhoneMode = settings.deviceMode === 'phone';

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${
        bgThemes[settings.accent] || bgThemes.purple
      } transition-colors duration-500 font-['Nunito',sans-serif] ${textSizeClass}`}
    >
      {/* ── STEP A/B/C: ENTRY FLOW ── */}
      {!settings.hasCompletedIntro && (
        <WelcomeFlow
          settings={settings}
          onUpdateSettings={updateSettings}
          onComplete={() => updateSettings({ hasCompletedIntro: true })}
        />
      )}

      {/* Floating Background Sakura / Sparkle Elements */}
      {settings.animationLevel !== 'off' && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-10 left-[10%] w-64 h-64 rounded-full bg-pink-300/10 dark:bg-pink-500/5 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-[15%] w-80 h-80 rounded-full bg-purple-400/10 dark:bg-purple-600/5 blur-3xl animate-pulse" />
        </div>
      )}

      {/* ── PHONE SIMULATOR CONTAINER IF DEVICE MODE IS PHONE ── */}
      <div
        className={
          isPhoneMode
            ? 'max-w-[420px] mx-auto min-h-screen border-8 border-slate-800 dark:border-slate-700 rounded-[48px] shadow-2xl overflow-hidden my-4 relative bg-white/90 dark:bg-slate-900/90'
            : 'w-full relative z-10'
        }
      >
        {/* Phone Speaker Notch in Phone Mode */}
        {isPhoneMode && (
          <div className="w-full flex justify-center pt-2 pb-1 bg-slate-900 z-50">
            <div className="w-24 h-4 bg-slate-800 rounded-full" />
          </div>
        )}

        {/* Global Navigation Header */}
        <Navbar
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          settings={settings}
          onUpdateSettings={updateSettings}
        />

        {/* ── PAGE ROUTING ── */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-20 relative z-10">
          {currentTab === 'home' && (
            <HomePage
              character={activeCharacter}
              settings={settings}
              onNavigate={setCurrentTab}
              onUpdateCharacter={setActiveCharacter}
            />
          )}

          {currentTab === 'studio' && (
            <StudioPage
              character={activeCharacter}
              settings={settings}
              onUpdateCharacter={setActiveCharacter}
              onSaveCharacter={handleSaveToGallery}
            />
          )}

          {currentTab === 'wardrobe' && (
            <WardrobePage
              character={activeCharacter}
              settings={settings}
              onUpdateCharacter={setActiveCharacter}
            />
          )}

          {currentTab === 'chat' && (
            <ChatPage
              character={activeCharacter}
              settings={settings}
              onUpdateSettings={updateSettings}
            />
          )}

          {currentTab === 'gallery' && (
            <GalleryPage
              characters={characters}
              activeCharacterId={activeCharacter.id}
              settings={settings}
              onSelectCharacter={setActiveCharacter}
              onUpdateCharactersList={setCharacters}
              onNavigateToStudio={() => setCurrentTab('studio')}
            />
          )}

          {currentTab === 'games' && (
            <MiniGamesPage
              character={activeCharacter}
              settings={settings}
              onUpdateSettings={updateSettings}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsPage
              settings={settings}
              onUpdateSettings={updateSettings}
              onRerunIntro={() => updateSettings({ hasCompletedIntro: false })}
              onResetAllData={handleResetAllData}
            />
          )}

          {currentTab === 'about' && <AboutPage settings={settings} />}
        </main>
      </div>
    </div>
  );
}
