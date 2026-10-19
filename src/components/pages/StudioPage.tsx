import React, { useState } from 'react';
import {
  CharacterConfig,
  UserSettings,
  HeadShape,
  EyeShape,
  EyebrowShape,
  MouthShape,
  BlushStyle,
  HairStyle,
  Headwear,
  AccessoryId,
  Emotion,
  Personality,
  CharacterRole,
} from '../../types/character';
import { translations } from '../../i18n/translations';
import { readyPresets } from '../../data/presets';
import { CharacterSvg } from '../character/CharacterSvg';
import { voiceService } from '../../utils/voice';
import { soundEngine } from '../../utils/audio';
import {
  Sparkles,
  Dices,
  RotateCcw,
  Undo2,
  Redo2,
  BookmarkCheck,
  Volume2,
  User,
  Eye,
  Scissors,
  Crown,
  Glasses,
  Smile,
  Sliders,
  Check,
} from 'lucide-react';

interface StudioPageProps {
  character: CharacterConfig;
  settings: UserSettings;
  onUpdateCharacter: (char: CharacterConfig) => void;
  onSaveCharacter: (char: CharacterConfig) => void;
}

type StudioTab = 'body' | 'face' | 'hair' | 'headwear' | 'accessories' | 'profile';

const skinToneSwatches = [
  '#fff7ed', // porcelain
  '#ffedd5', // fair peach
  '#ffe4d6', // cute warm anime
  '#fed7aa', // sunkissed
  '#fcd3ba', // uzbek golden warm
  '#ffd9c7', // warm blush
  '#fbcfe8', // pastel fairy
  '#e2e8f0', // cool pale
  '#d4a373', // tan
  '#a16207', // bronze
  '#78350f', // deep warm
  '#451a03', // rich espresso
];

const hairColors = [
  '#18181b', // raven black
  '#3f3f46', // charcoal
  '#713f12', // chestnut brown
  '#b45309', // warm amber
  '#ea580c', // fiery ginger
  '#eab308', // golden blonde
  '#f59e0b', // sunset yellow
  '#ec4899', // sakura pink
  '#f43f5e', // ruby crimson
  '#8b5cf6', // celestial purple
  '#4f46e5', // indigo blue
  '#06b6d4', // neon cyan
  '#10b981', // matcha green
  '#ffffff', // snow white
  '#cbd5e1', // silver gray
];

const eyeColors = [
  '#ec4899', // ruby pink
  '#3b82f6', // sky sapphire
  '#8b5cf6', // violet amethyst
  '#10b981', // emerald green
  '#f59e0b', // golden topaz
  '#06b6d4', // aqua
  '#b45309', // hazel amber
  '#18181b', // onyx black
  '#dc2626', // crimson
  '#6366f1', // starry royal
];

export const StudioPage: React.FC<StudioPageProps> = ({
  character,
  settings,
  onUpdateCharacter,
  onSaveCharacter,
}) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('body');
  const [previewEmotion, setPreviewEmotion] = useState<Emotion>('normal');
  const [showPresetsModal, setShowPresetsModal] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Undo / Redo history
  const [history, setHistory] = useState<CharacterConfig[]>([character]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const t = translations[settings.language] || translations.uz;

  // Apply new character state with history tracking
  const updateChar = (newChar: CharacterConfig) => {
    soundEngine.playPop();
    onUpdateCharacter(newChar);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newChar);
    if (newHistory.length > 20) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      soundEngine.playPop();
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      onUpdateCharacter(prev);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      soundEngine.playPop();
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      onUpdateCharacter(next);
    }
  };

  const handleRandomize = () => {
    soundEngine.playSparkle();
    const hairStyles: HairStyle[] = [
      'twin_tails',
      'long_flowing',
      'bob_cut',
      'spiky_anime',
      'short_messy',
      'braids',
      'curly_wave',
      'hime_cut',
      'wolf_cut',
      'short_slick',
    ];
    const headwears: Headwear[] = [
      'none',
      'school_ribbon',
      'doppi',
      'cat_ears',
      'crown',
      'wizard_hat',
      'ninja_band',
      'flower_clip',
    ];
    const accessories: AccessoryId[] = [
      'none',
      'glasses_round',
      'glasses_stylish',
      'star_necklace',
      'scarf',
      'cat_tail',
      'angel_wings',
    ];
    const eyeShapes: EyeShape[] = ['sparkle', 'cute', 'anime', 'cool', 'starry', 'gentle', 'determined'];
    const personalities: Personality[] = ['cheerful', 'kind', 'smart', 'warrior', 'funny', 'calm'];

    const randomChar: CharacterConfig = {
      ...character,
      skinTone: skinToneSwatches[Math.floor(Math.random() * skinToneSwatches.length)],
      eyes: {
        ...character.eyes,
        shape: eyeShapes[Math.floor(Math.random() * eyeShapes.length)],
        color: eyeColors[Math.floor(Math.random() * eyeColors.length)],
      },
      hair: {
        ...character.hair,
        style: hairStyles[Math.floor(Math.random() * hairStyles.length)],
        color: hairColors[Math.floor(Math.random() * hairColors.length)],
        highlightColor: hairColors[Math.floor(Math.random() * hairColors.length)],
      },
      headwear: headwears[Math.floor(Math.random() * headwears.length)],
      accessory: accessories[Math.floor(Math.random() * accessories.length)],
      personality: personalities[Math.floor(Math.random() * personalities.length)],
    };

    updateChar(randomChar);
  };

  const handleReset = () => {
    soundEngine.playPop();
    updateChar(readyPresets[0]);
  };

  const handleSave = () => {
    soundEngine.playSuccess();
    onSaveCharacter(character);
    setSaveToast(true);
    window.setTimeout(() => setSaveToast(false), 2400);
  };

  const handleTestVoice = () => {
    soundEngine.playPop();
    const phrases: Record<string, string> = {
      uz: `Salom! Mening ismim ${character.name}. Siz bilan do'stlashganimdan judayam xursandman!`,
      ru: `Привет! Меня зовут ${character.name}. Я так рада познакомиться с тобой!`,
      en: `Hello! My name is ${character.name}. I'm super excited to be your friend!`,
      tr: `Merhaba! Benim adım ${character.name}. Seninle tanıştığıma çok memnun oldum!`,
      ja: `こんにちは！私の名前は${character.name}です。仲良くしてくださいね！`,
    };
    voiceService.speak(phrases[settings.language] || phrases.en, {
      language: settings.language,
      pitch: character.voice.pitch,
      rate: character.voice.rate,
      voiceURI: character.voice.voiceURI,
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ── HEADER TITLE & CONTROLS ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-5 rounded-3xl border border-purple-100 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white">
            {t.studio.title}
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            {t.studio.subtitle}
          </p>
        </div>

        {/* Action Tools */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Preset templates button */}
          <button
            onClick={() => {
              soundEngine.playPop();
              setShowPresetsModal(true);
            }}
            className="px-3.5 py-2 rounded-2xl text-xs font-bold bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 hover:bg-purple-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.studio.btnPresets}</span>
          </button>

          {/* Randomize */}
          <button
            onClick={handleRandomize}
            title={t.studio.btnRandomize}
            className="p-2 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Dices className="w-4 h-4" />
          </button>

          {/* Undo */}
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            title={t.studio.btnUndo}
            className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Undo2 className="w-4 h-4" />
          </button>

          {/* Redo */}
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            title={t.studio.btnRedo}
            className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Redo2 className="w-4 h-4" />
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            title={t.studio.btnReset}
            className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Save to Gallery */}
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-md shadow-purple-500/30 flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-all"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>{t.studio.btnSave}</span>
          </button>
        </div>
      </div>

      {/* Save Success Toast */}
      {saveToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5" />
          <span className="font-bold text-sm">{t.studio.savedSuccess}</span>
        </div>
      )}

      {/* ── MAIN WORKSPACE: PREVIEW (LEFT) + CONTROLS (RIGHT) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Live Character Preview with Emotion Switcher */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="sticky top-20 w-full max-w-sm p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-purple-100 dark:border-slate-800 shadow-xl flex flex-col items-center">
            {/* Live Character SVG */}
            <div className="w-64 md:w-72">
              <CharacterSvg config={character} emotion={previewEmotion} />
            </div>

            {/* Character Name Label */}
            <h2 className="mt-2 text-xl font-extrabold text-slate-800 dark:text-white">
              {character.name}
            </h2>

            {/* Live Emotion Switcher Chips */}
            <div className="w-full mt-4 pt-3 border-t border-purple-100 dark:border-slate-800">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                Emotion Preview
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {(
                  [
                    'normal',
                    'happy',
                    'sad',
                    'angry',
                    'surprised',
                    'thinking',
                    'shy',
                    'sleepy',
                  ] as Emotion[]
                ).map((em) => (
                  <button
                    key={em}
                    onClick={() => {
                      soundEngine.playPop();
                      setPreviewEmotion(em);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                      previewEmotion === em
                        ? 'bg-purple-600 text-white shadow-sm scale-105'
                        : 'bg-purple-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-purple-100'
                    }`}
                  >
                    {t.studio.emotions[em] || em}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Tabbed Customization Panel */}
        <div className="lg:col-span-7 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-purple-100 dark:border-slate-800 shadow-xl p-5 md:p-8 space-y-6">
          {/* Studio Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-purple-100 dark:border-slate-800">
            {[
              { id: 'body' as StudioTab, label: t.studio.tabBody, icon: User },
              { id: 'face' as StudioTab, label: t.studio.tabFace, icon: Eye },
              { id: 'hair' as StudioTab, label: t.studio.tabHair, icon: Scissors },
              { id: 'headwear' as StudioTab, label: t.studio.tabHeadwear, icon: Crown },
              { id: 'accessories' as StudioTab, label: t.studio.tabAccessories, icon: Glasses },
              { id: 'profile' as StudioTab, label: t.studio.tabProfile, icon: Sliders },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundEngine.playPop();
                    setActiveTab(tab.id);
                  }}
                  className={`px-3.5 py-2 rounded-2xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── TAB CONTENT: BODY & SKIN ── */}
          {activeTab === 'body' && (
            <div className="space-y-6">
              {/* Gender style / proportions */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.studio.genderStyle}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['girl', 'boy', 'neutral'] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => updateChar({ ...character, gender: g })}
                      className={`py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                        character.gender === g
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-purple-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100'
                      }`}
                    >
                      {t.studio[g]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin Tone Swatches */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.studio.skinTone}
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {skinToneSwatches.map((color) => (
                    <button
                      key={color}
                      onClick={() => updateChar({ ...character, skinTone: color })}
                      style={{ backgroundColor: color }}
                      className={`w-9 h-9 rounded-full border-2 transition-transform cursor-pointer ${
                        character.skinTone === color
                          ? 'scale-125 border-purple-600 shadow-lg'
                          : 'border-slate-300 dark:border-slate-700 hover:scale-110'
                      }`}
                    />
                  ))}
                  {/* Custom color picker */}
                  <label
                    title={t.studio.customColor}
                    className="w-9 h-9 rounded-full border-2 border-dashed border-purple-400 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform relative overflow-hidden"
                  >
                    <input
                      type="color"
                      value={character.skinTone}
                      onChange={(e) => updateChar({ ...character, skinTone: e.target.value })}
                      className="opacity-0 absolute inset-0 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-purple-600">+</span>
                  </label>
                </div>
              </div>

              {/* Head Shape */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.studio.headShape}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['round', 'chibi', 'oval', 'heart'] as HeadShape[]).map((shape) => (
                    <button
                      key={shape}
                      onClick={() => updateChar({ ...character, headShape: shape })}
                      className={`py-2 rounded-2xl text-xs font-bold capitalize transition-all cursor-pointer ${
                        character.headShape === shape
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-purple-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100'
                      }`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB CONTENT: FACE & EYES ── */}
          {activeTab === 'face' && (
            <div className="space-y-6">
              {/* Eye Shape */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.studio.eyesShape}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      'sparkle',
                      'cute',
                      'anime',
                      'cool',
                      'wink',
                      'cat',
                      'starry',
                      'gentle',
                      'determined',
                    ] as EyeShape[]
                  ).map((shape) => (
                    <button
                      key={shape}
                      onClick={() =>
                        updateChar({
                          ...character,
                          eyes: { ...character.eyes, shape },
                        })
                      }
                      className={`py-2 rounded-2xl text-xs font-bold capitalize transition-all cursor-pointer ${
                        character.eyes.shape === shape
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-purple-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100'
                      }`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>

              {/* Eye Colors */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.studio.eyesColor}
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {eyeColors.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        updateChar({
                          ...character,
                          eyes: { ...character.eyes, color },
                        })
                      }
                      style={{ backgroundColor: color }}
                      className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                        character.eyes.color === color
                          ? 'scale-125 border-purple-600 shadow-md'
                          : 'border-slate-300 dark:border-slate-700 hover:scale-110'
                      }`}
                    />
                  ))}
                  <label className="w-8 h-8 rounded-full border-2 border-dashed border-purple-400 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform relative overflow-hidden">
                    <input
                      type="color"
                      value={character.eyes.color}
                      onChange={(e) =>
                        updateChar({
                          ...character,
                          eyes: { ...character.eyes, color: e.target.value },
                        })
                      }
                      className="opacity-0 absolute inset-0 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-purple-600">+</span>
                  </label>
                </div>
              </div>

              {/* Mouth Shapes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.studio.mouth}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {(['smile', 'open', 'cat_w', 'shy', 'grin', 'small_o'] as MouthShape[]).map(
                    (m) => (
                      <button
                        key={m}
                        onClick={() =>
                          updateChar({
                            ...character,
                            mouth: { ...character.mouth, shape: m },
                          })
                        }
                        className={`py-2 rounded-2xl text-xs font-bold capitalize transition-all cursor-pointer ${
                          character.mouth.shape === m
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-purple-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100'
                        }`}
                      >
                        {m === 'cat_w' ? ':3' : m}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Blush Styles */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.studio.blush}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {(
                    ['none', 'soft', 'cute_lines', 'anime_cheeks', 'heart_blush'] as BlushStyle[]
                  ).map((b) => (
                    <button
                      key={b}
                      onClick={() => updateChar({ ...character, blush: b })}
                      className={`py-2 rounded-2xl text-xs font-bold capitalize transition-all cursor-pointer ${
                        character.blush === b
                          ? 'bg-pink-600 text-white shadow-md'
                          : 'bg-pink-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-pink-100'
                      }`}
                    >
                      {b.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Freckles Toggle */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-50 dark:bg-slate-800/60">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.studio.freckles}
                </span>
                <input
                  type="checkbox"
                  checked={character.freckles}
                  onChange={(e) => updateChar({ ...character, freckles: e.target.checked })}
                  className="w-5 h-5 accent-purple-600 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* ── TAB CONTENT: HAIR ── */}
          {activeTab === 'hair' && (
            <div className="space-y-6">
              {/* Hairstyle Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.studio.hairStyle}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                  {(
                    [
                      'twin_tails',
                      'long_flowing',
                      'bob_cut',
                      'spiky_anime',
                      'short_messy',
                      'braids',
                      'curly_wave',
                      'hime_cut',
                      'wolf_cut',
                      'short_slick',
                      'fluffy_curls',
                      'undercut',
                    ] as HairStyle[]
                  ).map((style) => (
                    <button
                      key={style}
                      onClick={() =>
                        updateChar({
                          ...character,
                          hair: { ...character.hair, style },
                        })
                      }
                      className={`py-2.5 px-3 rounded-2xl text-xs font-bold capitalize transition-all cursor-pointer text-left ${
                        character.hair.style === style
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-purple-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100'
                      }`}
                    >
                      {style.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hair Colors */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.studio.hairColor}
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {hairColors.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        updateChar({
                          ...character,
                          hair: { ...character.hair, color },
                        })
                      }
                      style={{ backgroundColor: color }}
                      className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                        character.hair.color === color
                          ? 'scale-125 border-purple-600 shadow-md'
                          : 'border-slate-300 dark:border-slate-700 hover:scale-110'
                      }`}
                    />
                  ))}
                  <label className="w-8 h-8 rounded-full border-2 border-dashed border-purple-400 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform relative overflow-hidden">
                    <input
                      type="color"
                      value={character.hair.color}
                      onChange={(e) =>
                        updateChar({
                          ...character,
                          hair: { ...character.hair, color: e.target.value },
                        })
                      }
                      className="opacity-0 absolute inset-0 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-purple-600">+</span>
                  </label>
                </div>
              </div>

              {/* Hair Highlight / Gradient Color */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.studio.hairHighlight}
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {hairColors.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        updateChar({
                          ...character,
                          hair: { ...character.hair, highlightColor: color },
                        })
                      }
                      style={{ backgroundColor: color }}
                      className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                        character.hair.highlightColor === color
                          ? 'scale-125 border-pink-500 shadow-md'
                          : 'border-slate-300 dark:border-slate-700 hover:scale-110'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB CONTENT: HEADWEAR ── */}
          {activeTab === 'headwear' && (
            <div className="space-y-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {t.studio.headwear}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'doppi', label: "Do'ppi (Uzbek)", tag: 'Traditional' },
                  { id: 'school_ribbon', label: 'School Ribbon' },
                  { id: 'crown', label: 'Royal Crown' },
                  { id: 'cat_ears', label: 'Cat Ears' },
                  { id: 'bunny_ears', label: 'Bunny Ears' },
                  { id: 'wizard_hat', label: 'Wizard Hat' },
                  { id: 'ninja_band', label: 'Ninja Headband' },
                  { id: 'flower_clip', label: 'Flower Clip' },
                  { id: 'cyber_visor', label: 'Cyber Visor' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateChar({ ...character, headwear: item.id as Headwear })}
                    className={`p-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer flex flex-col justify-between ${
                      character.headwear === item.id
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-purple-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.tag && (
                      <span className="text-[10px] text-amber-300 uppercase mt-1">
                        {item.tag}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB CONTENT: ACCESSORIES ── */}
          {activeTab === 'accessories' && (
            <div className="space-y-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {t.studio.accessories}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'glasses_round', label: 'Round Glasses' },
                  { id: 'glasses_stylish', label: 'Stylish Glasses' },
                  { id: 'sunglasses', label: 'Cool Shades' },
                  { id: 'star_necklace', label: 'Star Necklace' },
                  { id: 'scarf', label: 'Winter Scarf' },
                  { id: 'face_mask', label: 'Face Mask' },
                  { id: 'cat_tail', label: 'Cat Tail' },
                  { id: 'angel_wings', label: 'Angel Wings' },
                  { id: 'demon_wings', label: 'Demon Wings' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateChar({ ...character, accessory: item.id as AccessoryId })}
                    className={`p-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                      character.accessory === item.id
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-purple-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB CONTENT: PROFILE, PERSONALITY & VOICE ── */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Character Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.studio.charName}
                </label>
                <input
                  type="text"
                  maxLength={20}
                  value={character.name}
                  onChange={(e) => updateChar({ ...character, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-purple-50 dark:bg-slate-800 border border-purple-200 dark:border-slate-700 text-slate-800 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Personality */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.studio.personality}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    ['cheerful', 'kind', 'smart', 'warrior', 'shy', 'funny', 'calm', 'mysterious'] as Personality[]
                  ).map((p) => (
                    <button
                      key={p}
                      onClick={() => updateChar({ ...character, personality: p })}
                      className={`py-2 rounded-2xl text-xs font-bold capitalize transition-all cursor-pointer ${
                        character.personality === p
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-purple-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Character Role */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.studio.role}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(
                    ['friend', 'teacher', 'storyteller', 'coach', 'anime_hero', 'magical_guide'] as CharacterRole[]
                  ).map((r) => (
                    <button
                      key={r}
                      onClick={() => updateChar({ ...character, role: r })}
                      className={`py-2 rounded-2xl text-xs font-bold capitalize transition-all cursor-pointer ${
                        character.role === r
                          ? 'bg-pink-600 text-white shadow-md'
                          : 'bg-purple-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100'
                      }`}
                    >
                      {r.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Sliders */}
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-slate-800/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    {t.studio.voiceSettings}
                  </span>
                  <button
                    onClick={handleTestVoice}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-sm flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{t.studio.previewVoice}</span>
                  </button>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>{t.studio.pitch}</span>
                    <span>{character.voice.pitch.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.8"
                    step="0.1"
                    value={character.voice.pitch}
                    onChange={(e) =>
                      updateChar({
                        ...character,
                        voice: { ...character.voice, pitch: parseFloat(e.target.value) },
                      })
                    }
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>{t.studio.speed}</span>
                    <span>{character.voice.rate.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.5"
                    step="0.1"
                    value={character.voice.rate}
                    onChange={(e) =>
                      updateChar({
                        ...character,
                        voice: { ...character.voice, rate: parseFloat(e.target.value) },
                      })
                    }
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── PRESETS MODAL ── */}
      {showPresetsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-purple-100 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white">
                  {t.studio.btnPresets}
                </h3>
                <p className="text-xs text-slate-500">Pick any pre-made character to customize</p>
              </div>
              <button
                onClick={() => setShowPresetsModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold hover:scale-110 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {readyPresets.map((preset) => {
                const info = t.presets[preset.id.replace('preset_', '')] || {
                  name: preset.name,
                  desc: preset.role,
                };
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      soundEngine.playSparkle();
                      updateChar(preset);
                      setShowPresetsModal(false);
                    }}
                    className="p-3 rounded-2xl bg-purple-50/60 dark:bg-slate-800/60 hover:bg-purple-100 dark:hover:bg-slate-800 border border-purple-100 dark:border-slate-700 transition-all hover:scale-105 text-left cursor-pointer flex flex-col items-center"
                  >
                    <div className="w-24 h-32 mb-2">
                      <CharacterSvg config={preset} enableMouseTracking={false} />
                    </div>
                    <span className="font-bold text-xs text-slate-800 dark:text-white line-clamp-1">
                      {info.name}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 text-center mt-1">
                      {info.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
