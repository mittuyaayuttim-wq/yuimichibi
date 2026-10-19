import React, { useState } from 'react';
import {
  CharacterConfig,
  UserSettings,
  OutfitId,
  ShoesId,
} from '../../types/character';
import { translations } from '../../i18n/translations';
import { CharacterSvg } from '../character/CharacterSvg';
import { soundEngine } from '../../utils/audio';
import { Sparkles, Shirt, Palette, Footprints, Check } from 'lucide-react';

interface WardrobePageProps {
  character: CharacterConfig;
  settings: UserSettings;
  onUpdateCharacter: (char: CharacterConfig) => void;
}

type WardrobeCategory = 'all' | 'school' | 'fantasy' | 'traditional' | 'casual' | 'sports';

const outfitPresetsData: {
  id: OutfitId;
  category: 'school' | 'fantasy' | 'traditional' | 'casual' | 'sports';
  primary: string;
  secondary: string;
  accent: string;
  tag?: string;
}[] = [
  {
    id: 'yuimi_celestial',
    category: 'fantasy',
    primary: '#8b5cf6',
    secondary: '#fdf4ff',
    accent: '#f59e0b',
    tag: 'Celestial Star',
  },
  {
    id: 'uzbek_atlas',
    category: 'traditional',
    primary: '#e11d48',
    secondary: '#f59e0b',
    accent: '#059669',
    tag: "O'zbek Atlas",
  },
  {
    id: 'uzbek_chapan',
    category: 'traditional',
    primary: '#1e3a8a',
    secondary: '#d97706',
    accent: '#fbbf24',
    tag: "Zardo'zi Chopon",
  },
  {
    id: 'school_girl',
    category: 'school',
    primary: '#1e293b',
    secondary: '#ffffff',
    accent: '#e11d48',
  },
  {
    id: 'school_boy',
    category: 'school',
    primary: '#0f172a',
    secondary: '#ffffff',
    accent: '#0284c7',
  },
  {
    id: 'fantasy_mage',
    category: 'fantasy',
    primary: '#312e81',
    secondary: '#4f46e5',
    accent: '#fbbf24',
  },
  {
    id: 'ninja_suit',
    category: 'sports',
    primary: '#18181b',
    secondary: '#27272a',
    accent: '#dc2626',
    tag: 'Shinobi',
  },
  {
    id: 'martial_arts_gi',
    category: 'sports',
    primary: '#f8fafc',
    secondary: '#0f172a',
    accent: '#dc2626',
    tag: 'Black Belt',
  },
  {
    id: 'princess_gown',
    category: 'fantasy',
    primary: '#ec4899',
    secondary: '#fdf2f8',
    accent: '#f59e0b',
  },
  {
    id: 'prince_regal',
    category: 'fantasy',
    primary: '#1e3a8a',
    secondary: '#ffffff',
    accent: '#eab308',
  },
  {
    id: 'casual_hoodie',
    category: 'casual',
    primary: '#ec4899',
    secondary: '#fce7f3',
    accent: '#10b981',
  },
  {
    id: 'cyberpunk',
    category: 'casual',
    primary: '#09090b',
    secondary: '#ec4899',
    accent: '#06b6d4',
  },
  {
    id: 'kimono',
    category: 'traditional',
    primary: '#4338ca',
    secondary: '#f43f5e',
    accent: '#fef08a',
  },
  {
    id: 'sportswear',
    category: 'sports',
    primary: '#ef4444',
    secondary: '#ffffff',
    accent: '#1e293b',
  },
  {
    id: 'pajamas',
    category: 'casual',
    primary: '#bae6fd',
    secondary: '#ffffff',
    accent: '#f472b6',
  },
  {
    id: 'winter_coat',
    category: 'casual',
    primary: '#0369a1',
    secondary: '#ffffff',
    accent: '#78350f',
  },
];

const shoesList: { id: ShoesId; defaultColor: string }[] = [
  { id: 'sneakers', defaultColor: '#f8fafc' },
  { id: 'mary_janes', defaultColor: '#09090b' },
  { id: 'boots', defaultColor: '#1e3a8a' },
  { id: 'traditional_ichig', defaultColor: '#7f1d1d' },
  { id: 'ninja_tabi', defaultColor: '#09090b' },
  { id: 'sandals', defaultColor: '#78350f' },
  { id: 'slippers', defaultColor: '#f472b6' },
];

export const WardrobePage: React.FC<WardrobePageProps> = ({
  character,
  settings,
  onUpdateCharacter,
}) => {
  const [activeCategory, setActiveCategory] = useState<WardrobeCategory>('all');
  const [poofSparkle, setPoofSparkle] = useState(false);
  const [equipToast, setEquipToast] = useState(false);

  const t = translations[settings.language] || translations.uz;

  const handleSelectOutfit = (preset: typeof outfitPresetsData[0]) => {
    soundEngine.playSparkle();
    setPoofSparkle(true);
    setEquipToast(true);

    onUpdateCharacter({
      ...character,
      outfit: {
        id: preset.id,
        primaryColor: preset.primary,
        secondaryColor: preset.secondary,
        accentColor: preset.accent,
      },
    });

    window.setTimeout(() => setPoofSparkle(false), 500);
    window.setTimeout(() => setEquipToast(false), 2000);
  };

  const handleSelectShoes = (s: typeof shoesList[0]) => {
    soundEngine.playPop();
    onUpdateCharacter({
      ...character,
      shoes: {
        id: s.id,
        color: s.defaultColor,
      },
    });
  };

  const filteredOutfits =
    activeCategory === 'all'
      ? outfitPresetsData
      : outfitPresetsData.filter((o) => o.category === activeCategory);

  return (
    <div className="space-y-6 pb-12">
      {/* ── HEADER TITLE ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-5 rounded-3xl border border-purple-100 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
            <Shirt className="w-7 h-7 text-pink-500" />
            <span>{t.wardrobe.title}</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            {t.wardrobe.subtitle}
          </p>
        </div>

        {equipToast && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-pink-600 text-white text-xs font-bold shadow-md animate-pulse">
            <Check className="w-4 h-4" />
            <span>{t.wardrobe.equipSuccess}</span>
          </div>
        )}
      </div>

      {/* ── WORKSPACE: PREVIEW (LEFT) + CLOSET CATALOG (RIGHT) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Live Character with Poof Sparkle Effect */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="sticky top-20 w-full max-w-sm p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-purple-100 dark:border-slate-800 shadow-xl flex flex-col items-center relative overflow-hidden">
            {/* Poof Animation Overlay */}
            {poofSparkle && (
              <div className="absolute inset-0 bg-pink-400/20 backdrop-blur-xs flex items-center justify-center z-20 animate-ping pointer-events-none rounded-3xl">
                <Sparkles className="w-16 h-16 text-amber-300 animate-spin" />
              </div>
            )}

            <div className="w-64 md:w-72">
              <CharacterSvg config={character} emotion="happy" />
            </div>

            <div className="w-full mt-4 p-4 rounded-2xl bg-purple-50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.wardrobe.outfits[character.outfit.id] || character.outfit.id}
                </span>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-400">
                  Equipped
                </span>
              </div>

              {/* Color Customizer for Active Outfit */}
              <div className="pt-2 border-t border-purple-200/50 dark:border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">{t.wardrobe.primaryColor}:</span>
                  <input
                    type="color"
                    value={character.outfit.primaryColor}
                    onChange={(e) =>
                      onUpdateCharacter({
                        ...character,
                        outfit: { ...character.outfit, primaryColor: e.target.value },
                      })
                    }
                    className="w-6 h-6 rounded-md cursor-pointer border border-slate-300"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">{t.wardrobe.secondaryColor}:</span>
                  <input
                    type="color"
                    value={character.outfit.secondaryColor}
                    onChange={(e) =>
                      onUpdateCharacter({
                        ...character,
                        outfit: { ...character.outfit, secondaryColor: e.target.value },
                      })
                    }
                    className="w-6 h-6 rounded-md cursor-pointer border border-slate-300"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">{t.wardrobe.accentColor}:</span>
                  <input
                    type="color"
                    value={character.outfit.accentColor}
                    onChange={(e) =>
                      onUpdateCharacter({
                        ...character,
                        outfit: { ...character.outfit, accentColor: e.target.value },
                      })
                    }
                    className="w-6 h-6 rounded-md cursor-pointer border border-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Outfit Catalog with Categories */}
        <div className="lg:col-span-7 space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(
              ['all', 'school', 'fantasy', 'traditional', 'casual', 'sports'] as WardrobeCategory[]
            ).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playPop();
                  setActiveCategory(cat);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800 border border-purple-100 dark:border-slate-800'
                }`}
              >
                {t.wardrobe.categories[cat]}
              </button>
            ))}
          </div>

          {/* Outfit Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredOutfits.map((item) => {
              const isSelected = character.outfit.id === item.id;
              const outfitName = t.wardrobe.outfits[item.id] || item.id;
              // Mock config for preview card
              const previewConfig: CharacterConfig = {
                ...character,
                outfit: {
                  id: item.id,
                  primaryColor: item.primary,
                  secondaryColor: item.secondary,
                  accentColor: item.accent,
                },
              };

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectOutfit(item)}
                  className={`p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border transition-all text-left flex flex-col items-center justify-between hover:scale-[1.03] cursor-pointer group relative overflow-hidden ${
                    isSelected
                      ? 'border-pink-500 ring-2 ring-pink-400 shadow-xl'
                      : 'border-purple-100 dark:border-slate-800 hover:border-pink-300 shadow-md'
                  }`}
                >
                  {/* Tag if traditional or special */}
                  {item.tag && (
                    <span className="absolute top-3 right-3 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 shadow-xs">
                      {item.tag}
                    </span>
                  )}

                  {/* Tiny Character Thumbnail Preview */}
                  <div className="w-24 h-32 my-1">
                    <CharacterSvg config={previewConfig} enableMouseTracking={false} />
                  </div>

                  <div className="w-full text-center mt-2">
                    <p className="font-bold text-xs text-slate-800 dark:text-white line-clamp-1">
                      {outfitName}
                    </p>
                    {/* Swatch dots */}
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: item.primary }} />
                      <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: item.secondary }} />
                      <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: item.accent }} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── FOOTWEAR / SHOES SECTION ── */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-purple-100 dark:border-slate-800 shadow-md space-y-4">
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <Footprints className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>{t.wardrobe.shoesTitle}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {shoesList.map((s) => {
                const isSelected = character.shoes.id === s.id;
                const shoeName = t.wardrobe.shoes[s.id] || s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelectShoes(s)}
                    className={`p-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-purple-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100'
                    }`}
                  >
                    <span>{shoeName}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
