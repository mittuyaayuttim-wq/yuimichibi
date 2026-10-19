import React, { useState, useEffect } from 'react';
import { CharacterSvg } from './CharacterSvg';
import { readyPresets } from '../../data/presets';
import { Language } from '../../types/character';
import { voiceService } from '../../utils/voice';
import { soundEngine } from '../../utils/audio';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface YuimiGuideProps {
  gender?: 'girl' | 'boy';
  language: Language;
  dialogueText: string;
  onFinishIntro?: () => void;
  showActionButton?: boolean;
  actionButtonText?: string;
  onActionClick?: () => void;
  className?: string;
  compact?: boolean;
}

export const YuimiGuide: React.FC<YuimiGuideProps> = ({
  gender = 'girl',
  language,
  dialogueText,
  onFinishIntro,
  showActionButton = false,
  actionButtonText = "Let's Start!",
  onActionClick,
  className = '',
  compact = false,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasVoicePlayed, setHasVoicePlayed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const yuimiPreset = gender === 'boy' ? readyPresets[1] : readyPresets[0];

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    let idx = 0;
    const clean = dialogueText;

    const timer = window.setInterval(() => {
      idx++;
      setDisplayedText(clean.slice(0, idx));
      if (idx >= clean.length) {
        window.clearInterval(timer);
      }
    }, 24);

    return () => window.clearInterval(timer);
  }, [dialogueText]);

  // Read greeting aloud once on mount if not muted
  useEffect(() => {
    if (hasVoicePlayed || isMuted) return;
    const timeout = window.setTimeout(() => {
      setHasVoicePlayed(true);
      voiceService.speak(
        dialogueText,
        {
          language,
          pitch: gender === 'girl' ? 1.25 : 1.05,
          rate: 1.0,
        },
        (speaking) => setIsSpeaking(speaking)
      );
    }, 600);

    return () => {
      window.clearTimeout(timeout);
      voiceService.stopSpeaking();
    };
  }, [dialogueText, language, gender, hasVoicePlayed, isMuted]);

  const toggleVoice = () => {
    soundEngine.playPop();
    if (isSpeaking) {
      voiceService.stopSpeaking();
      setIsSpeaking(false);
      setIsMuted(true);
    } else {
      setIsMuted(false);
      voiceService.speak(
        dialogueText,
        {
          language,
          pitch: gender === 'girl' ? 1.25 : 1.05,
          rate: 1.0,
        },
        (speaking) => setIsSpeaking(speaking)
      );
    }
  };

  return (
    <div className={`flex flex-col md:flex-row items-center gap-6 justify-center ${className}`}>
      {/* Yuimi 2D Animated Vector Character */}
      <div className={`relative ${compact ? 'w-36 md:w-44' : 'w-48 md:w-64'} shrink-0`}>
        {/* Magical glow circle behind Yuimi */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-400/20 via-pink-400/30 to-amber-300/20 blur-2xl -z-10 animate-pulse" />

        <CharacterSvg
          config={yuimiPreset}
          emotion={isSpeaking ? 'happy' : 'normal'}
          isSpeaking={isSpeaking}
          isWaving={true}
          isJumping={false}
          className="transition-transform hover:scale-105 duration-300"
          onClick={() => {
            soundEngine.playGiggle();
            toggleVoice();
          }}
        />

        {/* Voice Speech Indicator Badge */}
        <button
          onClick={toggleVoice}
          title="Toggle Voice"
          className="absolute bottom-2 right-2 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-md hover:scale-110 active:scale-95 transition-all text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800"
        >
          {isSpeaking ? (
            <span className="flex items-center gap-1">
              <Volume2 className="w-4 h-4 animate-bounce" />
            </span>
          ) : (
            <VolumeX className="w-4 h-4 opacity-60" />
          )}
        </button>
      </div>

      {/* Speech Bubble */}
      <div className="relative max-w-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-purple-100 dark:border-slate-800">
        {/* Bubble arrow pointing to character */}
        <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-12 border-r-white/95 dark:border-r-slate-900/95 border-b-8 border-b-transparent" />

        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Yuimi ({gender === 'girl' ? 'Guide' : 'Companion'})
            </span>
            {isSpeaking && (
              <span className="text-xs text-purple-600 dark:text-purple-400 font-medium animate-pulse flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                Speaking...
              </span>
            )}
          </div>
        </div>

        {/* Typewritten Dialogue */}
        <p className="text-slate-700 dark:text-slate-200 text-base md:text-lg leading-relaxed min-h-[4rem]">
          {displayedText}
          {displayedText.length < dialogueText.length && (
            <span className="inline-block w-2 h-4 ml-1 bg-purple-500 animate-pulse" />
          )}
        </p>

        {showActionButton && (
          <div className="mt-5 flex items-center justify-end">
            <button
              onClick={() => {
                soundEngine.playSuccess();
                if (onActionClick) onActionClick();
                if (onFinishIntro) onFinishIntro();
              }}
              className="px-6 py-2.5 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              {actionButtonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
