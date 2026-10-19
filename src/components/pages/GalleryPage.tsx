import React, { useState, useRef } from 'react';
import {
  CharacterConfig,
  UserSettings,
  SceneBackground,
} from '../../types/character';
import { translations } from '../../i18n/translations';
import { CharacterSvg } from '../character/CharacterSvg';
import { exportCharacterPng, exportCharacterJson, importCharacterJson } from '../../utils/export';
import { soundEngine } from '../../utils/audio';
import {
  Download,
  Share2,
  Trash2,
  Copy,
  Heart,
  Plus,
  Check,
  Upload,
  FileCode,
  Sparkles,
} from 'lucide-react';

interface GalleryPageProps {
  characters: CharacterConfig[];
  activeCharacterId: string;
  settings: UserSettings;
  onSelectCharacter: (char: CharacterConfig) => void;
  onUpdateCharactersList: (list: CharacterConfig[]) => void;
  onNavigateToStudio: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  characters,
  activeCharacterId,
  settings,
  onSelectCharacter,
  onUpdateCharactersList,
  onNavigateToStudio,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [selectedSceneForExport, setSelectedSceneForExport] = useState<SceneBackground>('sakura_garden');

  const cardSvgRefs = useRef<{ [key: string]: SVGSVGElement | null }>({});
  const t = translations[settings.language] || translations.uz;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSelect = (char: CharacterConfig) => {
    soundEngine.playSuccess();
    onSelectCharacter(char);
    showToast(t.gallery.loadSuccess);
  };

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playPop();
    const updated = characters.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c));
    onUpdateCharactersList(updated);
  };

  const handleDuplicate = (char: CharacterConfig, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playPop();
    const duplicate: CharacterConfig = {
      ...char,
      id: `char_${Date.now()}`,
      name: `${char.name} (Copy)`,
      createdAt: Date.now(),
    };
    onUpdateCharactersList([duplicate, ...characters]);
    showToast('Character duplicated!');
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (characters.length <= 1) {
      alert("You need at least one character in your gallery!");
      return;
    }
    if (window.confirm(t.gallery.deleteConfirm)) {
      soundEngine.playPop();
      const updated = characters.filter((c) => c.id !== id);
      onUpdateCharactersList(updated);
      if (activeCharacterId === id && updated.length > 0) {
        onSelectCharacter(updated[0]);
      }
    }
  };

  const handleExportPng = async (char: CharacterConfig, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playSparkle();
    const svg = cardSvgRefs.current[char.id];
    if (svg) {
      await exportCharacterPng(svg, char.name, selectedSceneForExport);
      showToast('PNG Downloaded!');
    }
  };

  const handleCopyJson = (char: CharacterConfig, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playPop();
    const json = exportCharacterJson(char);
    navigator.clipboard.writeText(json);
    showToast(t.gallery.copyCodeSuccess);
  };

  const handleImportJson = () => {
    soundEngine.playSparkle();
    const imported = importCharacterJson(importJsonText);
    if (!imported) {
      alert('Invalid character JSON format!');
      return;
    }
    onUpdateCharactersList([imported, ...characters]);
    onSelectCharacter(imported);
    setImportModalOpen(false);
    setImportJsonText('');
    showToast('Imported successfully!');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ── HEADER TITLE ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-5 rounded-3xl border border-purple-100 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-pink-500" />
            <span>{t.gallery.title}</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            {t.gallery.subtitle} ({characters.length} characters)
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Import JSON button */}
          <button
            onClick={() => setImportModalOpen(true)}
            className="px-3.5 py-2 rounded-2xl text-xs font-bold bg-purple-100 dark:bg-slate-800 text-purple-700 dark:text-purple-300 hover:bg-purple-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>{t.gallery.cardImportJson}</span>
          </button>

          {/* New Character button */}
          <button
            onClick={() => {
              soundEngine.playPop();
              onNavigateToStudio();
            }}
            className="px-5 py-2 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-md shadow-purple-500/25 flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" />
            <span>{t.gallery.btnNew}</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-purple-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5" />
          <span className="font-bold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* ── CHARACTERS GRID ── */}
      {characters.length === 0 ? (
        <div className="text-center py-16 bg-white/60 dark:bg-slate-900/60 rounded-3xl border border-dashed border-purple-200 p-8">
          <p className="text-slate-500">{t.gallery.emptyText}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((char) => {
            const isActive = char.id === activeCharacterId;
            return (
              <div
                key={char.id}
                onClick={() => handleSelect(char)}
                className={`group rounded-3xl p-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border transition-all duration-300 hover:scale-[1.03] cursor-pointer flex flex-col justify-between relative shadow-md hover:shadow-xl ${
                  isActive
                    ? 'border-purple-600 ring-2 ring-purple-400 shadow-purple-500/20'
                    : 'border-purple-100 dark:border-slate-800 hover:border-purple-300'
                }`}
              >
                {/* Favorite Heart Toggle */}
                <button
                  onClick={(e) => handleToggleFavorite(char.id, e)}
                  title={t.gallery.cardFavorite}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-xs hover:scale-110 cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      char.favorite
                        ? 'fill-pink-500 text-pink-500'
                        : 'text-slate-400 hover:text-pink-400'
                    }`}
                  />
                </button>

                {/* Active Badge */}
                {isActive && (
                  <span className="absolute top-4 left-4 z-20 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xs">
                    Active
                  </span>
                )}

                {/* Render Character SVG with ref hook for canvas PNG export */}
                <div
                  ref={(el) => {
                    if (el) {
                      const svg = el.querySelector('svg');
                      if (svg) cardSvgRefs.current[char.id] = svg;
                    }
                  }}
                  className="w-36 h-48 mx-auto my-2"
                >
                  <CharacterSvg config={char} emotion="happy" enableMouseTracking={false} />
                </div>

                {/* Character Name & Role */}
                <div className="text-center mt-2">
                  <h3 className="font-extrabold text-base text-slate-800 dark:text-white line-clamp-1">
                    {char.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 capitalize mt-0.5">
                    {char.personality} • {char.role.replace('_', ' ')}
                  </p>
                </div>

                {/* Action Toolbar on Card */}
                <div className="mt-4 pt-3 border-t border-purple-100 dark:border-slate-800/80 flex items-center justify-around text-slate-500 dark:text-slate-400">
                  {/* PNG Export */}
                  <button
                    onClick={(e) => handleExportPng(char, e)}
                    title={t.gallery.cardExportPng}
                    className="p-1.5 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  {/* Copy JSON */}
                  <button
                    onClick={(e) => handleCopyJson(char, e)}
                    title={t.gallery.cardExportJson}
                    className="p-1.5 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <FileCode className="w-4 h-4" />
                  </button>

                  {/* Duplicate */}
                  <button
                    onClick={(e) => handleDuplicate(char, e)}
                    title={t.gallery.cardDuplicate}
                    className="p-1.5 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={(e) => handleDelete(char.id, e)}
                    title={t.gallery.cardDelete}
                    className="p-1.5 hover:text-red-500 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── IMPORT JSON MODAL ── */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-purple-100 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                {t.gallery.cardImportJson}
              </h3>
              <button
                onClick={() => setImportModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <textarea
              rows={6}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Paste character JSON code here..."
              className="w-full p-3 rounded-2xl bg-purple-50 dark:bg-slate-800 border border-purple-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setImportModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleImportJson}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 cursor-pointer"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
