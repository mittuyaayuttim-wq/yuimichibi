import React, { useState, useEffect, useRef } from 'react';
import {
  CharacterConfig,
  UserSettings,
  ChatMessage,
  Emotion,
  SceneBackground,
} from '../../types/character';
import { translations } from '../../i18n/translations';
import { CharacterSvg } from '../character/CharacterSvg';
import { voiceService } from '../../utils/voice';
import { soundEngine } from '../../utils/audio';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Trash2,
  Sparkles,
  Image as ImageIcon,
  Bot,
  User,
  Heart,
} from 'lucide-react';

interface ChatPageProps {
  character: CharacterConfig;
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
}

const sceneBackgrounds: { id: SceneBackground; gradient: string }[] = [
  { id: 'celestial_night', gradient: 'from-slate-950 via-indigo-950 to-purple-950 text-white' },
  { id: 'sakura_garden', gradient: 'from-pink-100 via-rose-50 to-purple-100 text-slate-800' },
  { id: 'classroom', gradient: 'from-sky-100 via-blue-50 to-indigo-100 text-slate-800' },
  { id: 'dojo', gradient: 'from-amber-100 via-yellow-50 to-orange-100 text-slate-800' },
  { id: 'beach', gradient: 'from-cyan-100 via-teal-50 to-sky-100 text-slate-800' },
  { id: 'cozy_room', gradient: 'from-orange-100 via-amber-50 to-rose-100 text-slate-800' },
  { id: 'registan_square', gradient: 'from-amber-200 via-yellow-100 to-sky-200 text-slate-800' },
];

export const ChatPage: React.FC<ChatPageProps> = ({
  character,
  settings,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg_welcome',
      sender: 'character',
      text:
        settings.language === 'uz'
          ? `Salom ${settings.userName || 'do\'stim'}! Men ${character.name}man. Bugun siz bilan suhbatlashishdan judayam baxtiyorman! Nimalar haqida gaplashamiz?`
          : settings.language === 'ru'
          ? `Привет, ${settings.userName || 'друг'}! Я ${character.name}. Так рада поболтать с тобой! О чем поговорим сегодня?`
          : settings.language === 'tr'
          ? `Merhaba ${settings.userName || 'dostum'}! Ben ${character.name}. Seninle konuştuğum için çok mutluyum! Bugün nelerden bahsedelim?`
          : settings.language === 'ja'
          ? `こんにちは、${settings.userName || 'お友達'}！私は${character.name}です。今日はいっぱいお話ししましょうね！`
          : `Hello ${settings.userName || 'friend'}! I am ${character.name}. I'm so happy to talk with you! What shall we talk about today?`,
      emotion: 'happy',
      timestamp: Date.now(),
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>('happy');
  const [activeScene, setActiveScene] = useState<SceneBackground>('celestial_night');
  const [micController, setMicController] = useState<{ stop: () => void } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const t = translations[settings.language] || translations.uz;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Read message aloud and lip-sync
  const speakMessage = (text: string) => {
    if (voiceMuted) return;
    voiceService.speak(
      text,
      {
        language: settings.language,
        pitch: character.voice.pitch,
        rate: character.voice.rate,
        voiceURI: character.voice.voiceURI,
      },
      (speaking) => {
        setIsSpeaking(speaking);
      }
    );
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isTyping) return;

    soundEngine.playPop();
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);
    setCurrentEmotion('thinking');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          character,
          language: settings.language,
          userName: settings.userName || 'Friend',
          history: messages.slice(-4),
        }),
      });

      const data = await response.json();
      const replyText = data.reply || "I'm right here with you!";
      const emotion: Emotion = data.emotion || 'happy';

      setCurrentEmotion(emotion);
      setIsTyping(false);

      const charMsg: ChatMessage = {
        id: `char_${Date.now()}`,
        sender: 'character',
        text: replyText,
        emotion,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, charMsg]);
      speakMessage(replyText);
    } catch {
      setIsTyping(false);
      setCurrentEmotion('happy');
      const fallbackText =
        settings.language === 'uz'
          ? "Siz bilan suhbatlashish menga juda yoqadi! Yana biror narsa aytib bering!"
          : "I really enjoy talking with you! Tell me more!";
      setMessages((prev) => [
        ...prev,
        {
          id: `char_${Date.now()}`,
          sender: 'character',
          text: fallbackText,
          emotion: 'happy',
          timestamp: Date.now(),
        },
      ]);
      speakMessage(fallbackText);
    }
  };

  // Toggle Voice Recognition Microphone
  const toggleMicrophone = () => {
    if (isListening) {
      micController?.stop();
      setIsListening(false);
      setMicController(null);
      return;
    }

    soundEngine.playPop();
    const controller = voiceService.startListening(
      settings.language,
      (transcript) => {
        setIsListening(false);
        setInputVal(transcript);
        handleSendMessage(transcript);
      },
      () => {
        setIsListening(false);
      },
      (err) => {
        console.warn('Mic error:', err);
        setIsListening(false);
      }
    );

    if (controller) {
      setMicController(controller);
      setIsListening(true);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ── CHAT STAGE & CONTROLS ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-5 rounded-3xl border border-purple-100 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span>{t.chat.title}</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            {t.chat.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mute Voice button */}
          <button
            onClick={() => {
              const next = !voiceMuted;
              setVoiceMuted(next);
              if (next) voiceService.stopSpeaking();
            }}
            title={voiceMuted ? t.chat.voiceMuted : t.chat.voiceActive}
            className={`p-2 rounded-2xl transition-all cursor-pointer ${
              voiceMuted
                ? 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300'
                : 'bg-purple-100 text-purple-700 dark:bg-slate-800 dark:text-purple-300'
            }`}
          >
            {voiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Clear history */}
          <button
            onClick={() => {
              soundEngine.playPop();
              setMessages([]);
            }}
            title={t.chat.clearChat}
            className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-105 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── MAIN CHAT ARENA: CHARACTER STAGE (LEFT) + CHAT MESSAGES (RIGHT) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Character View with Animated Scene Backdrop */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            className={`sticky top-20 w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-white/20 flex flex-col items-center transition-all bg-gradient-to-b ${
              sceneBackgrounds.find((s) => s.id === activeScene)?.gradient ||
              'from-slate-900 to-indigo-950 text-white'
            }`}
          >
            {/* Speaking Status Floating Pill */}
            {isSpeaking && (
              <div className="mb-2 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-purple-600 text-xs font-bold shadow-md animate-bounce flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5" />
                <span>{t.chat.speaking}</span>
              </div>
            )}

            {/* Live 2D SVG Character */}
            <div className="w-64 md:w-72">
              <CharacterSvg
                config={character}
                emotion={currentEmotion}
                isSpeaking={isSpeaking}
                className="transition-all duration-300"
              />
            </div>

            {/* Character Persona Tag */}
            <div className="mt-3 text-center">
              <h3 className="font-extrabold text-lg tracking-wide">{character.name}</h3>
              <p className="text-xs opacity-75 capitalize">
                {character.personality} • {character.role.replace('_', ' ')}
              </p>
            </div>

            {/* Scene Selector Strip */}
            <div className="w-full mt-4 pt-3 border-t border-white/20">
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-70 mb-2 flex items-center gap-1">
                <ImageIcon className="w-3 h-3" />
                {t.chat.changeScene}
              </p>
              <div className="flex flex-wrap items-center gap-1.5">
                {sceneBackgrounds.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => {
                      soundEngine.playPop();
                      setActiveScene(scene.id);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
                      activeScene === scene.id
                        ? 'bg-white text-slate-900 shadow-md font-black scale-105'
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                  >
                    {t.chat.scenes[scene.id] || scene.id}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Messages Feed & Input */}
        <div className="lg:col-span-7 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-purple-100 dark:border-slate-800 shadow-xl flex flex-col h-[650px] overflow-hidden">
          {/* Quick Suggestion Topic Chips */}
          <div className="p-3 bg-purple-50/70 dark:bg-slate-800/40 border-b border-purple-100 dark:border-slate-800 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              {t.chat.suggestionsTitle}
            </span>
            {t.chat.suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(suggestion)}
                className="px-3 py-1 rounded-full bg-white dark:bg-slate-700 hover:bg-purple-100 text-xs text-purple-700 dark:text-purple-300 font-medium border border-purple-100 dark:border-slate-600 shadow-2xs hover:scale-105 transition-all cursor-pointer shrink-0"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isChar = msg.sender === 'character';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isChar ? 'justify-start' : 'justify-end'}`}
                >
                  {isChar && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-3xl px-4 py-3 shadow-sm ${
                      isChar
                        ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-purple-100 dark:border-slate-700 rounded-tl-sm'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    {isChar && (
                      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                        <button
                          onClick={() => speakMessage(msg.text)}
                          className="hover:text-purple-600 flex items-center gap-1 cursor-pointer"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Replay</span>
                        </button>
                        <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    )}
                  </div>

                  {!isChar && (
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 shadow-sm mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-purple-100 dark:border-slate-700 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-xs text-slate-400 ml-1 font-medium">{t.chat.typing}</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-white/95 dark:bg-slate-900/95 border-t border-purple-100 dark:border-slate-800 flex items-center gap-2">
            {/* Microphone Voice Button */}
            <button
              onClick={toggleMicrophone}
              title={isListening ? t.chat.stopMic : t.chat.startMic}
              className={`p-3 rounded-2xl transition-all cursor-pointer ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/40'
                  : 'bg-purple-100 dark:bg-slate-800 text-purple-600 dark:text-purple-300 hover:scale-105'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Input field */}
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={isListening ? t.chat.listening : t.chat.inputPlaceholder}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              className="flex-1 px-4 py-3 rounded-2xl bg-purple-50/70 dark:bg-slate-800 border border-purple-100 dark:border-slate-700 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputVal.trim() || isTyping}
              className="p-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white disabled:opacity-40 shadow-md shadow-purple-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
