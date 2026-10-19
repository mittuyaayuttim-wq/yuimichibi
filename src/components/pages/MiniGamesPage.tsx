import React, { useState } from 'react';
import {
  CharacterConfig,
  UserSettings,
  Emotion,
} from '../../types/character';
import { translations } from '../../i18n/translations';
import { CharacterSvg } from '../character/CharacterSvg';
import { soundEngine } from '../../utils/audio';
import {
  Sparkles,
  Gamepad2,
  Brain,
  Grid,
  Shirt,
  Heart,
  Coins,
  Star,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from 'lucide-react';

interface MiniGamesPageProps {
  character: CharacterConfig;
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
}

type GameTab = 'quiz' | 'memory' | 'dressUp' | 'pet';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

const quizData: Record<string, QuizQuestion[]> = {
  uz: [
    {
      question: "O'zbekistonning mashhur milliy bosh kiyimi nima deb ataladi?",
      options: ["Do'ppi", "Beret", "Shlyapa", "Kepka"],
      correct: 0,
    },
    {
      question: "Tabiiy ipakdan to'qiladigan yorqin o'zbek matosi qanday ataladi?",
      options: ["Atlas", "Denim", "Flanel", "Baxmal"],
      correct: 0,
    },
    {
      question: "Anime madaniyatida 'Kavai' (Kawaii) so'zi nimani anglatadi?",
      options: ["Yoqimtoy / Shirintoy", "Kuchli jangchi", "Qorong'i tun", "Tez poyga"],
      correct: 0,
    },
    {
      question: "Mushuk quloqchali anime qahramonlari nima deb ataladi?",
      options: ["Nekomimi", "Samuray", "Shinobi", "Mecha"],
      correct: 0,
    },
    {
      question: "Sharqona jang san'atlarida eng yuqori darajadagi belbog' qaysi rangda bo'ladi?",
      options: ["Qora", "Oq", "Sariq", "Yashil"],
      correct: 0,
    },
  ],
  ru: [
    {
      question: "Как называется традиционная узбекская тюбетейка?",
      options: ["Доппи", "Берет", "Кепка", "Сомбреро"],
      correct: 0,
    },
    {
      question: "Как называется традиционный узбекский шелк с узором облаков?",
      options: ["Атлас", "Джинса", "Шерсть", "Хлопок"],
      correct: 0,
    },
    {
      question: "Что означает слово 'Каваи' (Kawaii) в японской культуре?",
      options: ["Милый / Прелестный", "Храбрый", "Грозный", "Быстрый"],
      correct: 0,
    },
    {
      question: "Как называют персонажей с кошачьими ушками?",
      options: ["Нэкомими", "Шиноби", "Самурай", "Цундере"],
      correct: 0,
    },
    {
      question: "Какого цвета пояс у мастера восточных единоборств?",
      options: ["Черный", "Белый", "Синий", "Желтый"],
      correct: 0,
    },
  ],
  en: [
    {
      question: "What is the traditional Uzbek embroidered skullcap called?",
      options: ["Doppi", "Beret", "Fedora", "Crown"],
      correct: 0,
    },
    {
      question: "What is the iconic Uzbek cloud-patterned silk fabric called?",
      options: ["Atlas", "Denim", "Velvet", "Linen"],
      correct: 0,
    },
    {
      question: "What does the Japanese anime word 'Kawaii' mean?",
      options: ["Cute / Adorable", "Warrior", "Mystic", "Giant"],
      correct: 0,
    },
    {
      question: "What are anime characters with cat ears called?",
      options: ["Nekomimi", "Shinobi", "Mecha", "Sensei"],
      correct: 0,
    },
    {
      question: "Which belt color signifies mastery in traditional martial arts?",
      options: ["Black", "White", "Green", "Yellow"],
      correct: 0,
    },
  ],
  tr: [
    {
      question: "Geleneksel nakışlı Özbek takkesine ne ad verilir?",
      options: ["Doppi", "Bere", "Fes", "Kasket"],
      correct: 0,
    },
    {
      question: "Geleneksel rengarenk Özbek ipek kumaşına ne ad verilir?",
      options: ["Atlas", "Kot", "Kadife", "Keten"],
      correct: 0,
    },
    {
      question: "Japon kültüründe 'Kawaii' ne anlama gelir?",
      options: ["Sevimli / Tatlı", "Cesur", "Gizemli", "Hızlı"],
      correct: 0,
    },
    {
      question: "Kedi kulaklı anime karakterlerine ne ad verilir?",
      options: ["Nekomimi", "Samuray", "Şinobi", "Ninja"],
      correct: 0,
    },
    {
      question: "Dövüş sanatlarında ustalığı temsil eden kemer hangi renktir?",
      options: ["Siyah", "Beyaz", "Kırmızı", "Sarı"],
      correct: 0,
    },
  ],
  ja: [
    {
      question: "ウズベキスタンの伝統的な刺繍入り帽子は何と呼ばれますか？",
      options: ["ドッピ (Doppi)", "ベレー帽", "キャップ", "シルクハット"],
      correct: 0,
    },
    {
      question: "ウズベキスタンの美しい伝統的な雲柄シルク織物の名前は？",
      options: ["アトラス (Atlas)", "デニム", "フランネル", "サテン"],
      correct: 0,
    },
    {
      question: "アニメや日本文化で「Kawaii」とはどういう意味？",
      options: ["可愛い・愛らしい", "勇敢な戦士", "暗い夜", "高速スピード"],
      correct: 0,
    },
    {
      question: "猫の耳が生えたキャラクターを何と呼ぶ？",
      options: ["猫耳 (ねこみみ)", "忍者", "侍", "メカ"],
      correct: 0,
    },
    {
      question: "伝統的な武道で最高段位の帯の色は何色？",
      options: ["黒帯", "白帯", "黄帯", "青帯"],
      correct: 0,
    },
  ],
};

const memoryIcons = ['🌸', '⭐', '🧢', '🪄', '🐱', '🎀'];

export const MiniGamesPage: React.FC<MiniGamesPageProps> = ({
  character,
  settings,
  onUpdateSettings,
}) => {
  const [activeTab, setActiveTab] = useState<GameTab>('quiz');
  const [characterEmotion, setCharacterEmotion] = useState<Emotion>('happy');

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  // Memory Cards State
  const [cards, setCards] = useState<
    { id: number; icon: string; flipped: boolean; matched: boolean }[]
  >(() => initMemoryCards());
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);

  // Dress Up Challenge State
  const [dressThemeIndex, setDressThemeIndex] = useState(0);
  const [dressFeedback, setDressFeedback] = useState<string | null>(null);
  const [dressScore, setDressScore] = useState<number | null>(null);

  // Pet Reaction State
  const [petMessage, setPetMessage] = useState<string | null>(null);

  const t = translations[settings.language] || translations.uz;
  const currentQuizList = quizData[settings.language] || quizData.uz;

  function initMemoryCards() {
    const doubled = [...memoryIcons, ...memoryIcons];
    const shuffled = doubled
      .sort(() => Math.random() - 0.5)
      .map((icon, idx) => ({
        id: idx,
        icon,
        flipped: false,
        matched: false,
      }));
    return shuffled;
  }

  // Quiz Answer selection
  const handleQuizAnswer = (optIndex: number) => {
    if (quizAnswered !== null) return;
    setQuizAnswered(optIndex);

    const isCorrect = optIndex === currentQuizList[quizIndex].correct;
    if (isCorrect) {
      soundEngine.playSuccess();
      setCharacterEmotion('happy');
      setQuizScore((prev) => prev + 1);
    } else {
      soundEngine.playPop();
      setCharacterEmotion('sad');
    }
  };

  const handleNextQuiz = () => {
    soundEngine.playPop();
    if (quizIndex + 1 < currentQuizList.length) {
      setQuizIndex((prev) => prev + 1);
      setQuizAnswered(null);
      setCharacterEmotion('normal');
    } else {
      // Finished!
      setQuizFinished(true);
      setCharacterEmotion('happy');
      const rewardStars = quizScore + 2;
      const rewardCoins = (quizScore + 1) * 10;
      soundEngine.playCoin();
      onUpdateSettings({
        stars: settings.stars + rewardStars,
        coins: settings.coins + rewardCoins,
      });
    }
  };

  const handleRestartQuiz = () => {
    soundEngine.playPop();
    setQuizIndex(0);
    setQuizScore(0);
    setQuizAnswered(null);
    setQuizFinished(false);
    setCharacterEmotion('happy');
  };

  // Memory Card Click
  const handleCardClick = (id: number) => {
    if (selectedCards.length >= 2) return;
    const clicked = cards.find((c) => c.id === id);
    if (!clicked || clicked.flipped || clicked.matched) return;

    soundEngine.playPop();
    const newCards = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    setCards(newCards);

    const newSelected = [...selectedCards, id];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMemoryMoves((m) => m + 1);
      const [firstId, secondId] = newSelected;
      const c1 = cards.find((c) => c.id === firstId);
      const c2 = cards.find((c) => c.id === secondId);

      if (c1 && c2 && c1.icon === c2.icon) {
        // Matched!
        soundEngine.playSuccess();
        setCharacterEmotion('happy');
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, matched: true } : c))
          );
          setSelectedCards([]);
          setMatchedPairs((p) => {
            const next = p + 1;
            if (next === memoryIcons.length) {
              soundEngine.playCoin();
              onUpdateSettings({
                stars: settings.stars + 3,
                coins: settings.coins + 25,
              });
            }
            return next;
          });
        }, 400);
      } else {
        // Not matched
        setCharacterEmotion('thinking');
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, flipped: false } : c
            )
          );
          setSelectedCards([]);
          setCharacterEmotion('normal');
        }, 900);
      }
    }
  };

  const handleResetMemory = () => {
    soundEngine.playPop();
    setCards(initMemoryCards());
    setSelectedCards([]);
    setMemoryMoves(0);
    setMatchedPairs(0);
    setCharacterEmotion('happy');
  };

  // Dress Up Challenge Scoring
  const dressThemes = [
    { title: "Traditional Cultural Feast", matchOutfit: ['uzbek_atlas', 'uzbek_chapan', 'kimono'] },
    { title: "School Day & Study Session", matchOutfit: ['school_girl', 'school_boy', 'casual_hoodie'] },
    { title: "Celestial Magic & Sorcery", matchOutfit: ['yuimi_celestial', 'fantasy_mage', 'princess_gown'] },
    { title: "Stealth Ninja Mission", matchOutfit: ['ninja_suit', 'martial_arts_gi', 'cyberpunk'] },
  ];

  const handleCheckStyle = () => {
    soundEngine.playSparkle();
    const currentTheme = dressThemes[dressThemeIndex];
    const isMatched = currentTheme.matchOutfit.includes(character.outfit.id);

    if (isMatched) {
      setCharacterEmotion('happy');
      setDressScore(100);
      setDressFeedback(t.games.dressUp.commentGreat);
      soundEngine.playCoin();
      onUpdateSettings({
        stars: settings.stars + 2,
        coins: settings.coins + 20,
      });
    } else {
      setCharacterEmotion('shy');
      setDressScore(75);
      setDressFeedback(t.games.dressUp.commentGood);
      onUpdateSettings({ coins: settings.coins + 10 });
    }
  };

  // Pet Reaction
  const handlePetAction = (part: 'head' | 'cheeks' | 'tummy' | 'hands') => {
    soundEngine.playGiggle();
    if (part === 'head') setCharacterEmotion('happy');
    if (part === 'cheeks') setCharacterEmotion('shy');
    if (part === 'tummy') setCharacterEmotion('surprised');
    if (part === 'hands') setCharacterEmotion('happy');

    setPetMessage(t.games.pet.reactions[part]);
    window.setTimeout(() => setPetMessage(null), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ── HEADER TITLE ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-5 rounded-3xl border border-purple-100 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
            <Gamepad2 className="w-7 h-7 text-emerald-500" />
            <span>{t.games.title}</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            {t.games.subtitle}
          </p>
        </div>

        {/* Currency badges */}
        <div className="flex items-center gap-2 bg-purple-50 dark:bg-slate-800 px-4 py-2 rounded-2xl border border-purple-100 dark:border-slate-700 text-xs font-bold">
          <span className="flex items-center gap-1 text-amber-500">
            <Coins className="w-4 h-4" />
            {settings.coins}
          </span>
          <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
            <Star className="w-4 h-4 fill-purple-500" />
            {settings.stars}
          </span>
        </div>
      </div>

      {/* ── WORKSPACE: CHARACTER (LEFT) + ACTIVE GAME (RIGHT) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Responsive Live Character cheering */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="sticky top-20 w-full max-w-sm p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-purple-100 dark:border-slate-800 shadow-xl flex flex-col items-center relative">
            {/* Pet Speech bubble popup */}
            {petMessage && (
              <div className="absolute -top-12 z-30 bg-purple-600 text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-xl animate-bounce text-center max-w-xs">
                {petMessage}
              </div>
            )}

            <div className="w-64 md:w-72">
              <CharacterSvg
                config={character}
                emotion={characterEmotion}
                onPetPart={handlePetAction}
              />
            </div>

            <div className="mt-3 text-center">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-slate-800 text-purple-700 dark:text-purple-300">
                {character.name} is cheering for you!
              </span>
            </div>
          </div>
        </div>

        {/* Right: Games Tabbed Arena */}
        <div className="lg:col-span-7 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-purple-100 dark:border-slate-800 shadow-xl p-5 md:p-8 space-y-6">
          {/* Game Selection Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-purple-100 dark:border-slate-800">
            {[
              { id: 'quiz' as GameTab, label: t.games.tabQuiz, icon: Brain },
              { id: 'memory' as GameTab, label: t.games.tabMemory, icon: Grid },
              { id: 'dressUp' as GameTab, label: t.games.tabDressUp, icon: Shirt },
              { id: 'pet' as GameTab, label: t.games.tabPet, icon: Heart },
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
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── GAME 1: QUIZ ── */}
          {activeTab === 'quiz' && (
            <div className="space-y-6">
              {!quizFinished ? (
                <>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>
                      {t.games.quiz.questionNum} {quizIndex + 1} / {currentQuizList.length}
                    </span>
                    <span>
                      {t.games.quiz.score}: {quizScore}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-extrabold text-slate-800 dark:text-white leading-relaxed">
                    {currentQuizList[quizIndex].question}
                  </h3>

                  <div className="space-y-2.5">
                    {currentQuizList[quizIndex].options.map((opt, oIdx) => {
                      const isChosen = quizAnswered === oIdx;
                      const isCorrect = oIdx === currentQuizList[quizIndex].correct;
                      let btnStyle =
                        'bg-purple-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:bg-purple-100';

                      if (quizAnswered !== null) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-600 text-white font-bold';
                        } else if (isChosen) {
                          btnStyle = 'bg-red-500 text-white font-bold';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={quizAnswered !== null}
                          onClick={() => handleQuizAnswer(oIdx)}
                          className={`w-full p-4 rounded-2xl text-left text-sm font-semibold transition-all border border-purple-100 dark:border-slate-700/60 flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizAnswered !== null && isCorrect && <CheckCircle2 className="w-5 h-5" />}
                          {quizAnswered !== null && isChosen && !isCorrect && (
                            <XCircle className="w-5 h-5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizAnswered !== null && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleNextQuiz}
                        className="px-6 py-2.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        {quizIndex + 1 < currentQuizList.length
                          ? t.games.quiz.next
                          : t.games.quiz.finish}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">
                    {t.games.quiz.finish}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {t.games.quiz.rewardText
                      .replace('{stars}', String(quizScore + 2))
                      .replace('{coins}', String((quizScore + 1) * 10))}
                  </p>
                  <button
                    onClick={handleRestartQuiz}
                    className="px-6 py-2.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-all cursor-pointer"
                  >
                    Play Again
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── GAME 2: MEMORY MATCH ── */}
          {activeTab === 'memory' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>
                  {t.games.memory.moves}: {memoryMoves}
                </span>
                <span>
                  {t.games.memory.pairs}: {matchedPairs} / {memoryIcons.length}
                </span>
                <button
                  onClick={handleResetMemory}
                  title="Reset"
                  className="p-1.5 hover:text-purple-600 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {matchedPairs === memoryIcons.length ? (
                <div className="text-center py-8 space-y-3">
                  <h3 className="text-2xl font-extrabold text-emerald-600">
                    {t.games.memory.victory}
                  </h3>
                  <p className="text-xs text-slate-500">+3 Stars & +25 Coins earned!</p>
                  <button
                    onClick={handleResetMemory}
                    className="px-6 py-2.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-600 cursor-pointer"
                  >
                    {t.games.memory.playAgain}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {cards.map((c) => {
                    const isRevealed = c.flipped || c.matched;
                    return (
                      <button
                        key={c.id}
                        onClick={() => handleCardClick(c.id)}
                        className={`h-20 rounded-2xl text-2xl font-bold flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                          isRevealed
                            ? 'bg-purple-100 dark:bg-purple-950/80 border-2 border-purple-400 rotate-0'
                            : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:scale-105'
                        }`}
                      >
                        {isRevealed ? c.icon : '?'}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── GAME 3: DRESS UP CHALLENGE ── */}
          {activeTab === 'dressUp' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-300">
                  {t.games.dressUp.challengeTheme}
                </span>
                <h3 className="text-lg font-black text-slate-800 dark:text-white mt-0.5">
                  {dressThemes[dressThemeIndex].title}
                </h3>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    soundEngine.playPop();
                    setDressThemeIndex((prev) => (prev + 1) % dressThemes.length);
                    setDressFeedback(null);
                    setDressScore(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  Change Theme
                </button>

                <button
                  onClick={handleCheckStyle}
                  className="px-6 py-2.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all shadow-md cursor-pointer"
                >
                  {t.games.dressUp.checkStyle}
                </button>
              </div>

              {dressFeedback && (
                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-slate-800 border border-purple-200 text-center space-y-1">
                  <p className="text-xl font-black text-purple-600 dark:text-purple-400">
                    {t.games.dressUp.scoreLabel} {dressScore} / 100
                  </p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {dressFeedback}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── GAME 4: PET THE CHARACTER ── */}
          {activeTab === 'pet' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.games.pet.instruction}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handlePetAction('head')}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-purple-100 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-purple-50 hover:scale-105 transition-all cursor-pointer"
                >
                  💆 Pat Head
                </button>
                <button
                  onClick={() => handlePetAction('cheeks')}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-purple-100 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-purple-50 hover:scale-105 transition-all cursor-pointer"
                >
                  😳 Pinch Cheeks
                </button>
                <button
                  onClick={() => handlePetAction('tummy')}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-purple-100 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-purple-50 hover:scale-105 transition-all cursor-pointer"
                >
                  🤭 Tickle Tummy
                </button>
                <button
                  onClick={() => handlePetAction('hands')}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-purple-100 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-purple-50 hover:scale-105 transition-all cursor-pointer"
                >
                  ✋ High Five
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
