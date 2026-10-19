import { Language } from '../types/character';

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  nav: {
    home: string;
    studio: string;
    wardrobe: string;
    chat: string;
    gallery: string;
    games: string;
    settings: string;
    about: string;
  };
  intro: {
    welcomeTitle: string;
    welcomeSubtitle: string;
    chooseLanguage: string;
    chooseGenderTitle: string;
    chooseGenderSubtitle: string;
    girlTitle: string;
    girlDesc: string;
    boyTitle: string;
    boyDesc: string;
    meetYuimi: string;
    yuimiIntroGirl: string;
    yuimiIntroBoy: string;
    askName: string;
    namePlaceholder: string;
    letsStart: string;
    skipIntro: string;
  };
  home: {
    heroGreeting: string;
    welcomeBack: string;
    quickActions: string;
    btnStudio: string;
    btnWardrobe: string;
    btnChat: string;
    btnGames: string;
    yuimiTipTitle: string;
    yuimiTip: string;
    dailyStats: string;
    coins: string;
    stars: string;
    activeCharacter: string;
    currentOutfit: string;
    statusReady: string;
    tapToReact: string;
  };
  studio: {
    title: string;
    subtitle: string;
    tabBody: string;
    tabFace: string;
    tabHair: string;
    tabHeadwear: string;
    tabAccessories: string;
    tabProfile: string;
    genderStyle: string;
    girl: string;
    boy: string;
    neutral: string;
    skinTone: string;
    customColor: string;
    headShape: string;
    eyesShape: string;
    eyesColor: string;
    eyesSize: string;
    eyebrows: string;
    mouth: string;
    blush: string;
    freckles: string;
    hairStyle: string;
    hairColor: string;
    hairHighlight: string;
    headwear: string;
    accessories: string;
    shoes: string;
    charName: string;
    personality: string;
    role: string;
    voiceSettings: string;
    pitch: string;
    speed: string;
    previewVoice: string;
    btnRandomize: string;
    btnReset: string;
    btnUndo: string;
    btnRedo: string;
    btnSave: string;
    btnPresets: string;
    savedSuccess: string;
    emotions: {
      normal: string;
      happy: string;
      sad: string;
      angry: string;
      surprised: string;
      thinking: string;
      shy: string;
      sleepy: string;
    };
  };
  wardrobe: {
    title: string;
    subtitle: string;
    categories: {
      all: string;
      school: string;
      fantasy: string;
      traditional: string;
      casual: string;
      sports: string;
    };
    outfits: Record<string, string>;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    shoesTitle: string;
    shoes: Record<string, string>;
    equipSuccess: string;
  };
  chat: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    send: string;
    speaking: string;
    listening: string;
    startMic: string;
    stopMic: string;
    changeScene: string;
    clearChat: string;
    suggestionsTitle: string;
    suggestions: string[];
    scenes: Record<string, string>;
    typing: string;
    voiceMuted: string;
    voiceActive: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    emptyText: string;
    btnNew: string;
    cardLoad: string;
    cardFavorite: string;
    cardDuplicate: string;
    cardDelete: string;
    cardExportPng: string;
    cardExportJson: string;
    cardImportJson: string;
    copyCodeSuccess: string;
    loadSuccess: string;
    deleteConfirm: string;
  };
  games: {
    title: string;
    subtitle: string;
    tabQuiz: string;
    tabMemory: string;
    tabDressUp: string;
    tabPet: string;
    quiz: {
      title: string;
      score: string;
      questionNum: string;
      correct: string;
      wrong: string;
      next: string;
      finish: string;
      rewardText: string;
    };
    memory: {
      title: string;
      moves: string;
      pairs: string;
      victory: string;
      playAgain: string;
    };
    dressUp: {
      title: string;
      challengeTheme: string;
      checkStyle: string;
      scoreLabel: string;
      commentGreat: string;
      commentGood: string;
      commentTry: string;
    };
    pet: {
      title: string;
      instruction: string;
      reactions: {
        head: string;
        cheeks: string;
        tummy: string;
        hands: string;
      };
    };
  };
  settings: {
    title: string;
    subtitle: string;
    deviceMode: string;
    deviceAuto: string;
    devicePc: string;
    devicePhone: string;
    language: string;
    theme: string;
    themeLight: string;
    themeDark: string;
    themeAuto: string;
    accentColor: string;
    soundSettings: string;
    bgmLabel: string;
    sfxLabel: string;
    volumeLabel: string;
    animations: string;
    animFull: string;
    animReduced: string;
    animOff: string;
    textSize: string;
    textSmall: string;
    textNormal: string;
    textLarge: string;
    rerunIntro: string;
    resetAll: string;
    resetConfirm: string;
    resetSuccess: string;
  };
  about: {
    title: string;
    subtitle: string;
    howToUseTitle: string;
    steps: {
      step1: string;
      step2: string;
      step3: string;
      step4: string;
    };
    featuresTitle: string;
    features: string[];
    faqTitle: string;
    faqs: { q: string; a: string }[];
    yuimiMessageTitle: string;
    yuimiMessage: string;
    credits: string;
  };
  presets: Record<string, { name: string; desc: string }>;
}

export const translations: Record<Language, Translations> = {
  uz: {
    appTitle: "YumeChibi",
    appSubtitle: "O'z anime qahramoningizni yarating va u bilan suhbatlashing!",
    nav: {
      home: "Bosh sahifa",
      studio: "Studiya",
      wardrobe: "Garderob",
      chat: "Suhbat",
      gallery: "Qahramonlarim",
      games: "O'yinlar",
      settings: "Sozlamalar",
      about: "Yordam",
    },
    intro: {
      welcomeTitle: "YumeChibi olamiga xush kelibsiz!",
      welcomeSubtitle: "O'zingizning betakror 2D anime qahramoningizni yarating, kiyintiring va jonli ovozda suhbatlashing.",
      chooseLanguage: "Tilni tanlang",
      chooseGenderTitle: "Qahramoningiz yo'nalishini tanlang",
      chooseGenderSubtitle: "Sizga kim yo'l ko'rsatuvchi bo'lishini xohlaysiz?",
      girlTitle: "Qiz bola (Yuimi)",
      girlDesc: "Sehrli akademiya kiyimidagi maftunkor qiz Yuimi sizga yo'l ko'rsatadi.",
      boyTitle: "O'g'il bola (Yuimi)",
      boyDesc: "Yulduzli samoviy forma kiygan oqko'ngil jasur Yuimi sizga hamroh bo'ladi.",
      meetYuimi: "Yuimi bilan tanishing!",
      yuimiIntroGirl: "Salom do'stim! Mening ismim Yuimi! Men sizning anime olamidagi yo'lboshchingizman. Bu yerda siz xohlagan uslubda qahramon yaratishingiz, milliy do'ppi va atlas liboslar kiyintirishingiz va u bilan jonli suhbat qurishingiz mumkin! Keling, birga boshlaymiz!",
      yuimiIntroBoy: "Salom! Men Yuimi bo'laman! Biz birgalikda ajoyib anime qahramonlarini loyihalaymiz, kiyintiramiz va ular bilan suhbatlashamiz. Tayyormisiz? Qiziqarli sarguzasht bizni kutmoqda!",
      askName: "Ismingiz nima?",
      namePlaceholder: "Ismingizni kiriting...",
      letsStart: "Boshladik!",
      skipIntro: "O'tkazib yuborish",
    },
    home: {
      heroGreeting: "Salom, {name}!",
      welcomeBack: "Qahramoningiz siz bilan suhbatlashishga tayyor!",
      quickActions: "Tezkor bo'limlar",
      btnStudio: "Qahramon yaratish",
      btnWardrobe: "Kiyim tanlash",
      btnChat: "Jonli suhbat",
      btnGames: "Mini-o'yinlar",
      yuimiTipTitle: "Yuimining bugungi maslahati",
      yuimiTip: "Qahramoningiz yuziga yoki qo'llariga bosib ko'ring — u quvonch bilan javob qaytaradi! Shuningdek, O'zbekiston milliy do'ppisi va atlas ko'ylagini Garderobdan kiyintirib ko'ring!",
      dailyStats: "Sizning natijalaringiz",
      coins: "Tangalar",
      stars: "Yulduzlar",
      activeCharacter: "Hozirgi qahramon",
      currentOutfit: "Libos",
      statusReady: "Muloqotga tayyor",
      tapToReact: "Menga bosing!",
    },
    studio: {
      title: "Qahramon Studiyasi",
      subtitle: "Yuz shakli, soch, ko'zlar va aksessuarlarni o'z didingizga moslang",
      tabBody: "Tana va Teri",
      tabFace: "Yuz va Ko'zlar",
      tabHair: "Soch turmagi",
      tabHeadwear: "Bosh kiyim",
      tabAccessories: "Aksessuarlar",
      tabProfile: "Xarakter & Ovoz",
      genderStyle: "Tana tuzilishi",
      girl: "Qiz",
      boy: "O'g'il",
      neutral: "Universal",
      skinTone: "Teri rangi",
      customColor: "Boshqa rang",
      headShape: "Yuz shakli",
      eyesShape: "Ko'z shakli",
      eyesColor: "Ko'z rangi",
      eyesSize: "Ko'z o'lchami",
      eyebrows: "Qoshlar",
      mouth: "Og'iz shakli",
      blush: "Qizarish (Yonoq)",
      freckles: "Sepkillar",
      hairStyle: "Soch uslubi",
      hairColor: "Soch rangi",
      hairHighlight: "Soch jilosi rangi",
      headwear: "Bosh kiyim",
      accessories: "Aksessuarlar",
      shoes: "Oyoq kiyim",
      charName: "Qahramon ismi",
      personality: "Xarakteri",
      role: "Vazifasi",
      voiceSettings: "Ovoz sozlamalari",
      pitch: "Ovoz balandligi (Pitch)",
      speed: "Tezlik (Speed)",
      previewVoice: "Ovozni tinglash",
      btnRandomize: "Tasodifiy",
      btnReset: "Qaytarish",
      btnUndo: "Orqaga",
      btnRedo: "Oldinga",
      btnSave: "Saqlash",
      btnPresets: "Tayyor andozalar",
      savedSuccess: "Qahramon galereyaga saqlandi!",
      emotions: {
        normal: "Oddiy",
        happy: "Xursand",
        sad: "Xafa",
        angry: "Jahldor",
        surprised: "Hayron",
        thinking: "O'ychan",
        shy: "Uyatchan",
        sleepy: "Uyqusiragan",
      },
    },
    wardrobe: {
      title: "Sehrli Garderob",
      subtitle: "Qahramoningizga turli xil uslubdagi ajoyib liboslarni kiydiring",
      categories: {
        all: "Barchasi",
        school: "Maktab",
        fantasy: "Fantaziya",
        traditional: "Milliy",
        casual: "Kundalik",
        sports: "Sport & Jang",
      },
      outfits: {
        yuimi_celestial: "Yuimi Samoviy Libosi",
        school_girl: "Maktab Formasi (Qiz)",
        school_boy: "Maktab Formasi (O'g'il)",
        casual_hoodie: "Zamonaviy Hudi",
        uzbek_atlas: "O'zbek Milliy Atlas Libosi",
        uzbek_chapan: "Zar chopon va belbog'",
        ninja_suit: "Shinobi Ninja Kiyimi",
        fantasy_mage: "Yulduzlar Sehri Mantiyasi",
        martial_arts_gi: "Karate / Taekvondo Kimono",
        princess_gown: "Malika Bal Ko'ylagi",
        prince_regal: "Shahzoda Qadami",
        sportswear: "Sport Forma",
        cyberpunk: "Kiberpank Kurtka",
        kimono: "Yapon Yukatasi",
        pajamas: "Kavai Pajama",
        winter_coat: "Qishki Qalin Palto",
      },
      primaryColor: "Asosiy rang",
      secondaryColor: "Ikkinchi rang",
      accentColor: "Bezak rangi",
      shoesTitle: "Oyoq kiyimlari",
      shoes: {
        sneakers: "Krossovka",
        mary_janes: "Klassik tufli",
        boots: "Etiklar",
        sandals: "Yozgi bosonojka",
        ninja_tabi: "Ninja Tabi",
        traditional_ichig: "Milliy Mahsi / Ichigi",
        slippers: "Yumshoq shippak",
      },
      equipSuccess: "Libos muvaffaqiyatli almashtirildi!",
    },
    chat: {
      title: "Jonli Suhbat",
      subtitle: "Qahramoningiz bilan suhbatlashing, u ovoz chiqarib javob beradi!",
      inputPlaceholder: "Xabaringizni yozing...",
      send: "Yuborish",
      speaking: "Gapirmoqda...",
      listening: "Tinglamoqda... mikrofon orqali gapiring",
      startMic: "Ovoz bilan gapirish",
      stopMic: "Mikrofonni to'xtatish",
      changeScene: "Orqa fonni tanlash",
      clearChat: "Tarixni tozalash",
      suggestionsTitle: "Qiziqarli savollar:",
      suggestions: [
        "Menga qiziqarli ertak aytib ber!",
        "Kulgili hazil bilasanmi?",
        "Bugun qanday yangi kiyim kiyishni maslahat berasan?",
        "Matematikadan yordam bera olasanmi?",
        "O'zing haqingda gapirib ber!",
      ],
      scenes: {
        sakura_garden: "Sakura Bog'i",
        classroom: "Anime Sinfxonasi",
        celestial_night: "Yulduzli Tun",
        dojo: "Sharq Dojosi",
        beach: "Quyoshli Sohil",
        cozy_room: "Issiq Xona",
        registan_square: "Registon Maydoni",
      },
      typing: "Qahramon yozmoqda...",
      voiceMuted: "Ovoz o'chirilgan",
      voiceActive: "Ovoz yoqilgan",
    },
    gallery: {
      title: "Mening Qahramonlarim",
      subtitle: "Barcha yaratgan personajlaringiz shu yerda saqlanadi",
      emptyText: "Hozircha saqlangan qahramonlar yo'q. Studiyaga o'tib birinchi qahramoningizni yarating!",
      btnNew: "Yangi Qahramon",
      cardLoad: "Tanlash",
      cardFavorite: "Sevimli",
      cardDuplicate: "Nusxa olish",
      cardDelete: "O'chirish",
      cardExportPng: "PNG yuklab olish",
      cardExportJson: "Kodini nusxalash",
      cardImportJson: "Kodni yuklash",
      copyCodeSuccess: "Qahramon kodi buferga nusxalandi!",
      loadSuccess: "Qahramon faollashtirildi!",
      deleteConfirm: "Haqiqatan ham bu qahramonni o'chirmoqchimisiz?",
    },
    games: {
      title: "Mini-o'yinlar va Qiziqarli Mashg'ulotlar",
      subtitle: "Qahramoningiz bilan o'ynang, tangalar va yulduzlar yutib oling!",
      tabQuiz: "Anime Viktorina",
      tabMemory: "Xotira Kartalari",
      tabDressUp: "Moda Tanlovi",
      tabPet: "E'tibor va Qitiqlash",
      quiz: {
        title: "Tezkor Bilimdon Viktorinasi",
        score: "Ballar",
        questionNum: "Savol",
        correct: "To'g'ri javob! Barakalla!",
        wrong: "Afsus, bu safar adashdingiz!",
        next: "Keyingi savol",
        finish: "Viktorina yakunlandi!",
        rewardText: "Siz {stars} ta yulduz va {coins} ta tanga yutib oldingiz!",
      },
      memory: {
        title: "Kavai Xotira O'yini",
        moves: "Urinishlar",
        pairs: "Topilgan juftliklar",
        victory: "Tabriklaymiz! Barcha juftliklarni topdingiz!",
        playAgain: "Yana o'ynash",
      },
      dressUp: {
        title: "Moda Sinovi",
        challengeTheme: "Bugungi mavzu:",
        checkStyle: "Uslubimni bahola!",
        scoreLabel: "Ball:",
        commentGreat: "Ajoyib! Sizning didingiz shunchaki super!",
        commentGood: "Juda chiroyli moslashtirildi!",
        commentTry: "Yomon emas, keling boshqa aksessuarlar qo'shamiz!",
      },
      pet: {
        title: "Qahramonga E'tibor Berish",
        instruction: "Qahramonning boshiga, yuziga, qorniga yoki qo'llariga bosing va uning kulgili reaksiyasini ko'ring!",
        reactions: {
          head: "Boshimni silaganingiz uchun rahmat! Bu juda yoqimli!",
          cheeks: "Iye, yonoqlarimni cho'zmang, uyalyapman!",
          tummy: "Qitiq-qitiq! Kuldirib yubordingiz-ku!",
          hands: "Salom! Besh tashlang!",
        },
      },
    },
    settings: {
      title: "Sozlamalar",
      subtitle: "Interfeys, til, mavzu va ovozni o'zingizga qulay qiling",
      deviceMode: "Qurilma rejimi",
      deviceAuto: "Avto (Moslashuvchan)",
      devicePc: "Kompyuter (Keng)",
      devicePhone: "Telefon (Mobil)",
      language: "Tizim tili",
      theme: "Vizual mavzu",
      themeLight: "Yorug'",
      themeDark: "Qorong'i",
      themeAuto: "Tizim bo'yicha",
      accentColor: "Urg'u rangi",
      soundSettings: "Ovoz va Musiqa",
      bgmLabel: "Sehrli fon musiqasi (Web Audio)",
      sfxLabel: "Tugma tovushlari (SFX)",
      volumeLabel: "Asosiy ovoz balandligi",
      animations: "Animatsiyalar darajasi",
      animFull: "To'liq (Go'zal)",
      animReduced: "Kamaytirilgan",
      animOff: "O'chirilgan",
      textSize: "Shrift o'lchami",
      textSmall: "Kichik",
      textNormal: "O'rtacha",
      textLarge: "Katta",
      rerunIntro: "Yuimi tanishtiruvini qayta ko'rish",
      resetAll: "Barcha ma'lumotlarni tozalash",
      resetConfirm: "Barcha saqlangan qahramonlar va natijalar o'chib ketadi. Rozimisiz?",
      resetSuccess: "Tizim to'liq yangilandi!",
    },
    about: {
      title: "Yordam va Ma'lumot",
      subtitle: "YumeChibi ilovasining imkoniyatlari va sirlari",
      howToUseTitle: "Qanday foydalanish kerak?",
      steps: {
        step1: "1. Qahramon Studiyasiga kiring va o'z tasavvuringizdagi qiyofani tanlang.",
        step2: "2. Garderobdan unga chiroyli maktab, jang yoki milliy o'zbek liboslarini kiydiring.",
        step3: "3. Suhbat bo'limiga o'ting va sun'iy intellekt yordamida u bilan jonli muloqot qiling.",
        step4: "4. Mini-o'yinlar o'ynab yulduzlar yutib oling va natijangizni oshiring!",
      },
      featuresTitle: "Ilova imkoniyatlari",
      features: [
        "100% Inline 2D SVG vektor grafika — hech qanday tashqi rasm talab qilinmaydi va tez ishlaydi",
        "Jonli animatsiyalar: nafas olish, miltillash, sichqonchani kuzatuvchi ko'zlar, lab harakati",
        "O'zbek milliy liboslari: Zardo'zi do'ppi, atlas ko'ylak, chopon va mahsi",
        "Gemini 3.8 Flash modeli orqali xavfsiz va aqlli suhbatlar",
        "Web Speech API orqali nutqni ovoz chiqarib o'qish va mikrofondan kiritish",
        "Web Audio API asosidagi tinchlantiruvchi fon kuylari va tovush effektlari",
        "5 tildagi to'liq moslashuvchan interfeys",
      ],
      faqTitle: "Ko'p so'raladigan savollar",
      faqs: [
        {
          q: "Qahramonim saqlanib qoladimi?",
          a: "Ha! Barcha yaratilgan qahramonlar brauzeringizning localStorage xotirasida xavfsiz saqlanadi.",
        },
        {
          q: "Internet bo'lmasa qahramon javob beradimi?",
          a: "Albatta! Gemini tarmog'i mavjud bo'lmaganda ham ichki shirin dialoglar tizimi orqali u siz bilan suhbatlashadi.",
        },
        {
          q: "Rasmini yuklab olsa bo'ladimi?",
          a: "Ha, Qahramonlarim bo'limida 'PNG yuklab olish' tugmasi orqali yuqori sifatli rasmni saqlab olishingiz mumkin.",
        },
      ],
      yuimiMessageTitle: "Yuimidan iliq tilaklar",
      yuimiMessage: "Bizning ijodiy olamimizga qo'shilganingizdan minnatdormiz! O'z qahramoningizni mehr bilan yarating va do'stlaringizga ham ko'rsating!",
      credits: "YumeChibi • Ishlab chiqilgan: AI Studio Build",
    },
    presets: {
      yuimi_girl: { name: "Yuimi (Sehrgar Qiz)", desc: "Samoviy akademiya libosidagi yoqimtoy yo'lboshchi qiz" },
      yuimi_boy: { name: "Yuimi (Jasur O'g'il)", desc: "Yulduzli samoviy uniformadagi oqko'ngil yo'lboshchi yigit" },
      shirin_uzbek: { name: "Shirin (Atlas Qiz)", desc: "Milliy atlas ko'ylak va do'ppili o'zbek qizi" },
      farxod_uzbek: { name: "Farxod (Choponli Yigit)", desc: "Do'ppi va zar choponli o'zbek yigiti" },
      sakura_student: { name: "Sakura (O'quvchi)", desc: "Yapon maktab formasi kiygan quvnoq qiz" },
      ren_student: { name: "Ren (O'quvchi)", desc: "Zamonaviy maktab formasi kiygan a'lochi yigit" },
      hayato_ninja: { name: "Hayato (Ninja)", desc: "Yashirin soya san'ati ustasi" },
      lyra_mage: { name: "Lyra (Yulduz Sehrgari)", desc: "Kosmik quvvatlarni boshqaruvchi sehrgar" },
      kenji_fighter: { name: "Kenji (Jangchi)", desc: "Qora belbog'li sharqona jang san'ati ustasi" },
      princess_aurelia: { name: "Malika Aureliya", desc: "Oltin toji va malika libosidagi nozik qiz" },
      prince_julian: { name: "Shahzoda Julian", desc: "Qirollik libosidagi asilzoda shahzoda" },
      mia_catgirl: { name: "Mia (Mushukvoy)", desc: "Yoqimtoy mushuk quloqchali qizcha" },
      jin_cyber: { name: "Jin (Kiberpank)", desc: "Kelajak ko'chalarining kiber jangchisi" },
      aoi_kimono: { name: "Aoi (Yukata)", desc: "Klassik yapon libosidagi muloyim qiz" },
    },
  },
  ru: {
    appTitle: "YumeChibi",
    appSubtitle: "Создай своего аниме-чиби персонажа и общайся с ним голосом!",
    nav: {
      home: "Главная",
      studio: "Студия",
      wardrobe: "Гардероб",
      chat: "Чат",
      gallery: "Мои герои",
      games: "Игры",
      settings: "Настройки",
      about: "Помощь",
    },
    intro: {
      welcomeTitle: "Добро пожаловать в мир YumeChibi!",
      welcomeSubtitle: "Создай неповторимого 2D аниме-персонажа, меняй наряды и общайся голосом в реальном времени.",
      chooseLanguage: "Выберите язык",
      chooseGenderTitle: "Выберите проводника",
      chooseGenderSubtitle: "Кто встретит вас в этом волшебном мире?",
      girlTitle: "Девочка (Юими)",
      girlDesc: "Очаровательная Юими в форме магической академии станет твоим гидом.",
      boyTitle: "Мальчик (Юими)",
      boyDesc: "Храбрый Юими в звездной форме сопроводит тебя в мир творчества.",
      meetYuimi: "Познакомьтесь с Юими!",
      yuimiIntroGirl: "Привет, друг! Меня зовут Юими! Я твой проводник по аниме-миру. Здесь ты можешь создать своего уникального чиби-персонажа, одевать его в стильные и традиционные костюмы и общаться вживую! Давай начнем!",
      yuimiIntroBoy: "Привет! Я Юими! Вместе мы создадим потрясающего героя, подберем классные наряды и сможем душевно поболтать. Готов? Вперед!",
      askName: "Как тебя зовут?",
      namePlaceholder: "Введи свое имя...",
      letsStart: "Начать!",
      skipIntro: "Пропустить",
    },
    home: {
      heroGreeting: "Привет, {name}!",
      welcomeBack: "Твой персонаж ждет общения с тобой!",
      quickActions: "Быстрые действия",
      btnStudio: "Создать персонажа",
      btnWardrobe: "Гардероб",
      btnChat: "Чат голосом",
      btnGames: "Мини-игры",
      yuimiTipTitle: "Совет от Юими",
      yuimiTip: "Нажми на персонажа — он весело отреагирует! Обязательно примерь наряд звездного мага или традиционный узбекский костюм с тюбетейкой!",
      dailyStats: "Твои достижения",
      coins: "Монеты",
      stars: "Звезды",
      activeCharacter: "Текущий герой",
      currentOutfit: "Наряд",
      statusReady: "Готов к общению",
      tapToReact: "Нажми на меня!",
    },
    studio: {
      title: "Студия персонажа",
      subtitle: "Настраивай форму лица, глаза, прическу и уникальные черты",
      tabBody: "Тело и кожа",
      tabFace: "Лицо и глаза",
      tabHair: "Прическа",
      tabHeadwear: "Головной убор",
      tabAccessories: "Аксессуары",
      tabProfile: "Характер и голос",
      genderStyle: "Тип телосложения",
      girl: "Девочка",
      boy: "Мальчик",
      neutral: "Нейтральный",
      skinTone: "Оттенок кожи",
      customColor: "Свой цвет",
      headShape: "Форма лица",
      eyesShape: "Форма глаз",
      eyesColor: "Цвет глаз",
      eyesSize: "Размер глаз",
      eyebrows: "Брови",
      mouth: "Форма рта",
      blush: "Румянец",
      freckles: "Веснушки",
      hairStyle: "Прическа",
      hairColor: "Цвет волос",
      hairHighlight: "Блик / градиент",
      headwear: "Головной убор",
      accessories: "Аксессуары",
      shoes: "Обувь",
      charName: "Имя персонажа",
      personality: "Характер",
      role: "Роль",
      voiceSettings: "Настройки голоса",
      pitch: "Высота тона (Pitch)",
      speed: "Скорость речи (Speed)",
      previewVoice: "Прослушать голос",
      btnRandomize: "Случайно",
      btnReset: "Сбросить",
      btnUndo: "Назад",
      btnRedo: "Вперед",
      btnSave: "Сохранить",
      btnPresets: "Готовые шаблоны",
      savedSuccess: "Персонаж успешно сохранен в галерею!",
      emotions: {
        normal: "Обычный",
        happy: "Радостный",
        sad: "Грустный",
        angry: "Сердитый",
        surprised: "Удивленный",
        thinking: "Задумчивый",
        shy: "Смущенный",
        sleepy: "Сонный",
      },
    },
    wardrobe: {
      title: "Волшебный гардероб",
      subtitle: "Примеряй стильные, фэнтезийные и национальные наряды",
      categories: {
        all: "Все",
        school: "Школа",
        fantasy: "Фэнтези",
        traditional: "Традиционные",
        casual: "Повседневные",
        sports: "Спорт и битвы",
      },
      outfits: {
        yuimi_celestial: "Наряд Юими (Звездная академия)",
        school_girl: "Школьная форма (Девочка)",
        school_boy: "Школьная форма (Мальчик)",
        casual_hoodie: "Уютное худи",
        uzbek_atlas: "Узбекское шелковое платье Атлас",
        uzbek_chapan: "Золотой чапан с поясом",
        ninja_suit: "Костюм ниндзя шиноби",
        fantasy_mage: "Мантия звездного мага",
        martial_arts_gi: "Кимоно единоборств",
        princess_gown: "Бальное платье принцессы",
        prince_regal: "Королевский костюм принца",
        sportswear: "Спортивный костюм",
        cyberpunk: "Киберпанк куртка",
        kimono: "Японская юката",
        pajamas: "Милая пижама",
        winter_coat: "Зимнее теплое пальто",
      },
      primaryColor: "Основной цвет",
      secondaryColor: "Второй цвет",
      accentColor: "Цвет отделки",
      shoesTitle: "Обувь",
      shoes: {
        sneakers: "Кроссовки",
        mary_janes: "Туфельки Мэри Джейн",
        boots: "Сапожки",
        sandals: "Сандалии",
        ninja_tabi: "Ниндзя таби",
        traditional_ichig: "Традиционные махси",
        slippers: "Домашние тапочки",
      },
      equipSuccess: "Наряд надет!",
    },
    chat: {
      title: "Живой чат",
      subtitle: "Общайся с персонажем, наблюдай живые эмоции и слушай его голос!",
      inputPlaceholder: "Напиши сообщение...",
      send: "Отправить",
      speaking: "Говорит...",
      listening: "Слушаю... говори в микрофон",
      startMic: "Голосовой ввод",
      stopMic: "Остановить запись",
      changeScene: "Сменить фон",
      clearChat: "Очистить чат",
      suggestionsTitle: "Быстрые темы:",
      suggestions: [
        "Расскажи мне сказку на ночь!",
        "Знаешь смешную шутку?",
        "Посоветуй мне крутой наряд на сегодня!",
        "Помоги мне с математикой!",
        "Расскажи о себе подробнее!",
      ],
      scenes: {
        sakura_garden: "Сад сакуры",
        classroom: "Аниме класс",
        celestial_night: "Звездная ночь",
        dojo: "Додзё",
        beach: "Пляж",
        cozy_room: "Уютная комната",
        registan_square: "Площадь Регистан",
      },
      typing: "Персонаж печатает...",
      voiceMuted: "Голос выключен",
      voiceActive: "Голос включен",
    },
    gallery: {
      title: "Мои персонажи",
      subtitle: "Все твои сохраненные герои",
      emptyText: "Пока нет сохраненных персонажей. Перейди в Студию и создай первого!",
      btnNew: "Создать нового",
      cardLoad: "Выбрать",
      cardFavorite: "Любимый",
      cardDuplicate: "Дублировать",
      cardDelete: "Удалить",
      cardExportPng: "Скачать PNG",
      cardExportJson: "Копировать код",
      cardImportJson: "Импорт кода",
      copyCodeSuccess: "Код персонажа скопирован!",
      loadSuccess: "Персонаж выбран!",
      deleteConfirm: "Вы уверены, что хотите удалить этого персонажа?",
    },
    games: {
      title: "Мини-игры и развлечения",
      subtitle: "Играй вместе с персонажем, зарабатывай монетки и звезды!",
      tabQuiz: "Аниме викторина",
      tabMemory: "Карточки памяти",
      tabDressUp: "Модный вызов",
      tabPet: "Погладить героя",
      quiz: {
        title: "Викторина эрудита",
        score: "Очки",
        questionNum: "Вопрос",
        correct: "Верно! Отличная работа!",
        wrong: "Увы, неправильно!",
        next: "Следующий",
        finish: "Викторина завершена!",
        rewardText: "Ты заработал {stars} звезд и {coins} монет!",
      },
      memory: {
        title: "Каваи игра памяти",
        moves: "Ходы",
        pairs: "Найдено пар",
        victory: "Ура! Ты нашел все пары!",
        playAgain: "Играть снова",
      },
      dressUp: {
        title: "Модный показ",
        challengeTheme: "Тема дня:",
        checkStyle: "Оценить наряд!",
        scoreLabel: "Оценка:",
        commentGreat: "Великолепно! Ты прирожденный стилист!",
        commentGood: "Очень симпатично подобрано!",
        commentTry: "Неплохо, попробуй добавить аксессуары!",
      },
      pet: {
        title: "Интерактивное общение",
        instruction: "Нажимай на голову, щечки, животик или ручки персонажа и смотри на забавную реакцию!",
        reactions: {
          head: "Спасибо за поглаживание! Это так приятно!",
          cheeks: "Ой, не щипай за щечки, я стесняюсь!",
          tummy: "Щекотно! Перестань хихикать!",
          hands: "Привет! Дай пять!",
        },
      },
    },
    settings: {
      title: "Настройки",
      subtitle: "Интерфейс, язык, звуки и анимация",
      deviceMode: "Режим устройства",
      deviceAuto: "Авто (Адаптивный)",
      devicePc: "Компьютер (Широкий)",
      devicePhone: "Телефон (Мобильный фрейм)",
      language: "Язык интерфейса",
      theme: "Тема оформления",
      themeLight: "Светлая",
      themeDark: "Темная",
      themeAuto: "Системная",
      accentColor: "Цветовой акцент",
      soundSettings: "Звук и музыка",
      bgmLabel: "Фоновая эмбиент музыка (Web Audio)",
      sfxLabel: "Звуковые эффекты (SFX)",
      volumeLabel: "Громкость",
      animations: "Уровень анимаций",
      animFull: "Полный (Красивый)",
      animReduced: "Умеренный",
      animOff: "Отключен",
      textSize: "Размер текста",
      textSmall: "Мелкий",
      textNormal: "Обычный",
      textLarge: "Крупный",
      rerunIntro: "Пройти знакомство с Юими снова",
      resetAll: "Сбросить все данные",
      resetConfirm: "Все сохраненные персонажи и монеты будут удалены. Продолжить?",
      resetSuccess: "Все данные сброшены!",
    },
    about: {
      title: "Помощь и о проекте",
      subtitle: "Возможности приложения YumeChibi",
      howToUseTitle: "Как пользоваться?",
      steps: {
        step1: "1. Зайди в Студию и выбери прическу, цвет глаз и черты лица.",
        step2: "2. В Гардеробе примерь классные школьные, волшебные или узбекские традиционные наряды.",
        step3: "3. Перейди в Чат и начни живой диалог с поддержкой озвучки.",
        step4: "4. Играй в мини-игры и получай награды!",
      },
      featuresTitle: "Особенности приложения",
      features: [
        "100% Векторная графика SVG — без тяжелых внешних картинок, мгновенная загрузка",
        "Живые анимации: дыхание, моргание, взгляд за курсором, движение рта при речи",
        "Традиционные узбекские наряды: тюбетейка доппи, атласное платье, чапан",
        "Интеллектуальный чат на базе Gemini 3.8 Flash с живыми эмоциями",
        "Синтез и распознавание речи (Web Speech API)",
        "Атмосферная музыка и эффекты через чистый Web Audio API",
        "Полная поддержка 5 языков",
      ],
      faqTitle: "Часто задаваемые вопросы",
      faqs: [
        {
          q: "Сохраняются ли мои персонажи?",
          a: "Да, все созданные персонажи сохраняются в localStorage браузера.",
        },
        {
          q: "Работает ли чат без интернета?",
          a: "Да, встроенная система диалогов ответит тебе даже при отсутствии связи с сетью.",
        },
        {
          q: "Можно ли сохранить картинку?",
          a: "Да, нажми 'Скачать PNG' в галерее для экспорта на красивом фоне.",
        },
      ],
      yuimiMessageTitle: "Послание от Юими",
      yuimiMessage: "Спасибо, что заглянул в наш творческий мир! Твори с душой и делись радостью с друзьями!",
      credits: "YumeChibi • Сделано с любовью в AI Studio Build",
    },
    presets: {
      yuimi_girl: { name: "Юими (Волшебница)", desc: "Милая проводница в форме академии звезд" },
      yuimi_boy: { name: "Юими (Храбрец)", desc: "Добрый юноша-проводник в звездном мундире" },
      shirin_uzbek: { name: "Ширин (Атлас)", desc: "Традиционная узбекская девушка в атласном платье и тюбетейке" },
      farxod_uzbek: { name: "Фарход (Чапан)", desc: "Узбекский юноша в чапане и тюбетейке" },
      sakura_student: { name: "Сакура (Школьница)", desc: "Энергичная школьница в форме с бантом" },
      ren_student: { name: "Рен (Школьник)", desc: "Стильный старшеклассник" },
      hayato_ninja: { name: "Хаято (Ниндзя)", desc: "Таинственный мастер теней" },
      lyra_mage: { name: "Лира (Маг звезд)", desc: "Чародейка космической магии" },
      kenji_fighter: { name: "Кэндзи (Боец)", desc: "Мастер восточных единоборств с черным поясом" },
      princess_aurelia: { name: "Принцесса Аурелия", desc: "Утонченная принцесса в золотой короне" },
      prince_julian: { name: "Принц Джулиан", desc: "Благородный наследник трона" },
      mia_catgirl: { name: "Мия (Кошечка)", desc: "Озорная девочка с кошачьими ушками" },
      jin_cyber: { name: "Джин (Кибер)", desc: "Уличный самурай будущего" },
      aoi_kimono: { name: "Аой (Юката)", desc: "Скромная девушка в традиционном японском кимоно" },
    },
  },
  en: {
    appTitle: "YumeChibi",
    appSubtitle: "Design your anime chibi character and chat in real-time with voice!",
    nav: {
      home: "Home",
      studio: "Studio",
      wardrobe: "Wardrobe",
      chat: "Chat",
      gallery: "My Chibis",
      games: "Mini-Games",
      settings: "Settings",
      about: "Help",
    },
    intro: {
      welcomeTitle: "Welcome to YumeChibi!",
      welcomeSubtitle: "Craft your unique 2D anime character, customize outfits, and talk aloud with AI companion voice.",
      chooseLanguage: "Choose Language",
      chooseGenderTitle: "Choose your Guide",
      chooseGenderSubtitle: "Who would you like to guide you through this world?",
      girlTitle: "Girl (Yuimi)",
      girlDesc: "Charming Yuimi in magical celestial academy attire will guide your journey.",
      boyTitle: "Boy (Yuimi)",
      boyDesc: "Noble and kind Yuimi in royal star adventurer garb will be by your side.",
      meetYuimi: "Meet Yuimi!",
      yuimiIntroGirl: "Hello friend! My name is Yuimi! I am your guide in this magical anime studio. Here you can build any character you dream of, try on school uniforms, fantasy robes, or traditional Uzbek silk dresses, and talk with them aloud! Let's get started!",
      yuimiIntroBoy: "Hey there! I am Yuimi! Together we will design amazing anime characters, try cool outfits, and have heartwarming voice conversations. Ready for an adventure? Let's go!",
      askName: "What is your name?",
      namePlaceholder: "Enter your name...",
      letsStart: "Let's Start!",
      skipIntro: "Skip Intro",
    },
    home: {
      heroGreeting: "Hello, {name}!",
      welcomeBack: "Your character is ready to chat and play!",
      quickActions: "Quick Actions",
      btnStudio: "Character Studio",
      btnWardrobe: "Wardrobe Closet",
      btnChat: "Live AI Chat",
      btnGames: "Fun Mini-Games",
      yuimiTipTitle: "Yuimi's Daily Tip",
      yuimiTip: "Tap or click your character to see playful reactions! Don't forget to check out the traditional Uzbek Doppi and Atlas dress in the Wardrobe!",
      dailyStats: "Your Stats",
      coins: "Coins",
      stars: "Stars",
      activeCharacter: "Active Character",
      currentOutfit: "Outfit",
      statusReady: "Ready to talk",
      tapToReact: "Tap me!",
    },
    studio: {
      title: "Character Studio",
      subtitle: "Customize face shape, hair, eyes, blush, and unique accessories",
      tabBody: "Body & Skin",
      tabFace: "Face & Eyes",
      tabHair: "Hairstyle",
      tabHeadwear: "Headwear",
      tabAccessories: "Accessories",
      tabProfile: "Persona & Voice",
      genderStyle: "Body Proportions",
      girl: "Girl",
      boy: "Boy",
      neutral: "Neutral",
      skinTone: "Skin Tone",
      customColor: "Custom Color",
      headShape: "Head Shape",
      eyesShape: "Eye Shape",
      eyesColor: "Eye Color",
      eyesSize: "Eye Size",
      eyebrows: "Eyebrows",
      mouth: "Mouth Expression",
      blush: "Cheek Blush",
      freckles: "Freckles",
      hairStyle: "Hairstyle",
      hairColor: "Hair Color",
      hairHighlight: "Highlight / Gradient",
      headwear: "Headwear",
      accessories: "Accessories",
      shoes: "Footwear",
      charName: "Character Name",
      personality: "Personality",
      role: "Role",
      voiceSettings: "Voice Settings",
      pitch: "Voice Pitch",
      speed: "Speaking Rate",
      previewVoice: "Test Voice",
      btnRandomize: "Randomize",
      btnReset: "Reset",
      btnUndo: "Undo",
      btnRedo: "Redo",
      btnSave: "Save Character",
      btnPresets: "Ready Presets",
      savedSuccess: "Character saved to your Gallery!",
      emotions: {
        normal: "Normal",
        happy: "Happy",
        sad: "Sad",
        angry: "Angry",
        surprised: "Surprised",
        thinking: "Thinking",
        shy: "Shy",
        sleepy: "Sleepy",
      },
    },
    wardrobe: {
      title: "Magic Wardrobe",
      subtitle: "Mix and match anime outfits, colors, shoes, and items",
      categories: {
        all: "All",
        school: "School",
        fantasy: "Fantasy",
        traditional: "Traditional",
        casual: "Casual",
        sports: "Sport & Combat",
      },
      outfits: {
        yuimi_celestial: "Yuimi Celestial Academy Outfit",
        school_girl: "Classic Schoolgirl Uniform",
        school_boy: "Schoolboy Blazer & Tie",
        casual_hoodie: "Comfy Street Hoodie",
        uzbek_atlas: "Uzbek Traditional Atlas Silk Dress",
        uzbek_chapan: "Gold Embroidered Chapan & Sash",
        ninja_suit: "Shinobi Stealth Ninja Robe",
        fantasy_mage: "Celestial Star Mage Mantle",
        martial_arts_gi: "Martial Arts Gi & Belt",
        princess_gown: "Princess Royal Ballgown",
        prince_regal: "Prince Regal Uniform",
        sportswear: "Athletic Tracksuit",
        cyberpunk: "Cyberpunk Street Jacket",
        kimono: "Japanese Yukata Robe",
        pajamas: "Cozy Kawaii Pajamas",
        winter_coat: "Winter Puffer Coat",
      },
      primaryColor: "Primary Color",
      secondaryColor: "Secondary Color",
      accentColor: "Accent Trim Color",
      shoesTitle: "Shoes & Footwear",
      shoes: {
        sneakers: "Trendy Sneakers",
        mary_janes: "Mary Jane Shoes",
        boots: "Adventure Boots",
        sandals: "Summer Sandals",
        ninja_tabi: "Ninja Tabi Boots",
        traditional_ichig: "Traditional Uzbek Mahsi",
        slippers: "Fluffy Slippers",
      },
      equipSuccess: "Outfit changed!",
    },
    chat: {
      title: "Live Companion Chat",
      subtitle: "Talk with your character! They speak aloud and express real emotions.",
      inputPlaceholder: "Type your message...",
      send: "Send",
      speaking: "Speaking...",
      listening: "Listening... speak into your microphone",
      startMic: "Voice Speech Input",
      stopMic: "Stop Microphone",
      changeScene: "Change Scene",
      clearChat: "Clear History",
      suggestionsTitle: "Conversation Starters:",
      suggestions: [
        "Tell me a wonderful anime bedtime story!",
        "Do you know a funny joke?",
        "What outfit should I wear today?",
        "Can you help me solve a math riddle?",
        "Tell me more about your personality!",
      ],
      scenes: {
        sakura_garden: "Sakura Garden",
        classroom: "Anime Classroom",
        celestial_night: "Celestial Starry Night",
        dojo: "Martial Arts Dojo",
        beach: "Sunny Beach",
        cozy_room: "Cozy Bedroom",
        registan_square: "Registan Square",
      },
      typing: "Character is typing...",
      voiceMuted: "Voice muted",
      voiceActive: "Voice enabled",
    },
    gallery: {
      title: "My Characters Gallery",
      subtitle: "Manage, export, and load your custom characters",
      emptyText: "No characters saved yet. Jump into the Studio to craft your first!",
      btnNew: "New Character",
      cardLoad: "Select",
      cardFavorite: "Favorite",
      cardDuplicate: "Duplicate",
      cardDelete: "Delete",
      cardExportPng: "Export PNG",
      cardExportJson: "Copy JSON Code",
      cardImportJson: "Import Code",
      copyCodeSuccess: "Character code copied to clipboard!",
      loadSuccess: "Character loaded!",
      deleteConfirm: "Are you sure you want to delete this character?",
    },
    games: {
      title: "Mini-Games & Fun",
      subtitle: "Play interactive games with your character, earn stars and coins!",
      tabQuiz: "Anime Quiz",
      tabMemory: "Memory Match",
      tabDressUp: "Fashion Challenge",
      tabPet: "Pet & Interact",
      quiz: {
        title: "Trivia Master Quiz",
        score: "Score",
        questionNum: "Question",
        correct: "Correct! Outstanding!",
        wrong: "Oops! Not quite right!",
        next: "Next Question",
        finish: "Quiz Completed!",
        rewardText: "You earned {stars} stars and {coins} coins!",
      },
      memory: {
        title: "Kawaii Memory Match",
        moves: "Moves",
        pairs: "Pairs Found",
        victory: "Fantastic! You matched all pairs!",
        playAgain: "Play Again",
      },
      dressUp: {
        title: "Fashion Runway Challenge",
        challengeTheme: "Today's Theme:",
        checkStyle: "Rate My Outfit!",
        scoreLabel: "Fashion Score:",
        commentGreat: "Incredible! You look breathtaking!",
        commentGood: "Very stylish combination!",
        commentTry: "Nice attempt! Try adding matching accessories!",
      },
      pet: {
        title: "Pet & Poke Interactions",
        instruction: "Tap on the character's head, cheeks, belly, or hands to see animated reactions!",
        reactions: {
          head: "Thank you for the gentle head pats! So warm and cozy!",
          cheeks: "Eep! Don't pinch my cheeks, I get all flustered!",
          tummy: "Hehehe that tickles! Stop making me giggle!",
          hands: "High five, bestie! Together forever!",
        },
      },
    },
    settings: {
      title: "Settings & Preferences",
      subtitle: "Customize display layout, language, themes, and audio",
      deviceMode: "Device Layout Mode",
      deviceAuto: "Auto (Responsive)",
      devicePc: "Computer (Wide Desktop)",
      devicePhone: "Phone (Mobile Frame)",
      language: "Language",
      theme: "Theme Appearance",
      themeLight: "Light",
      themeDark: "Dark",
      themeAuto: "System",
      accentColor: "Accent Color",
      soundSettings: "Sound & Audio",
      bgmLabel: "Ambient Relaxing Melody (Web Audio)",
      sfxLabel: "Sound Effects (SFX)",
      volumeLabel: "Master Volume",
      animations: "Animation Level",
      animFull: "Full (Smooth)",
      animReduced: "Reduced",
      animOff: "Off",
      textSize: "Font Size",
      textSmall: "Small",
      textNormal: "Normal",
      textLarge: "Large",
      rerunIntro: "Re-run Intro with Yuimi",
      resetAll: "Reset All App Data",
      resetConfirm: "All your saved characters, coins, and achievements will be reset. Proceed?",
      resetSuccess: "Data reset successfully!",
    },
    about: {
      title: "About & Guide",
      subtitle: "Everything you need to know about YumeChibi",
      howToUseTitle: "How to use YumeChibi?",
      steps: {
        step1: "1. Open Character Studio to shape face, hair, eyes, and skin.",
        step2: "2. Head to Wardrobe to equip anime, school, fantasy, or Uzbek traditional garments.",
        step3: "3. Start a Chat to talk with live Gemini-powered AI with emotional lip-sync.",
        step4: "4. Enjoy Mini-Games to earn coins, unlock stars, and interact with your chibi!",
      },
      featuresTitle: "Core Features",
      features: [
        "100% Vector inline SVG system — ultra-crisp at any resolution, no broken images",
        "Dynamic animations: idle breathing, blinking, pupil tracking, and mouth lip-sync",
        "Authentic Uzbek garments: Doppi skullcap with traditional motifs, Atlas silk, and Chapan",
        "Gemini 3.8 Flash AI conversation with emotional facial reactions",
        "Speech synthesis & voice recognition via Web Speech API",
        "Procedural ambient soundtrack & sound effects with Web Audio API",
        "Full support for 5 languages with instant switching",
      ],
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "Are my created characters saved permanently?",
          a: "Yes! All characters and progress are stored safely in your browser's localStorage.",
        },
        {
          q: "Does chat work without an API key?",
          a: "Yes, YumeChibi includes an offline dialog engine so you can always chat even without network.",
        },
        {
          q: "Can I download my character as a picture?",
          a: "Absolutely! Open the Gallery and tap 'Export PNG' to save a high-res image on your favorite scene.",
        },
      ],
      yuimiMessageTitle: "A Message from Yuimi",
      yuimiMessage: "Thank you for creating characters with us! May your imagination bring endless smiles!",
      credits: "YumeChibi • Crafted with joy in AI Studio Build",
    },
    presets: {
      yuimi_girl: { name: "Yuimi (Celestial Sorceress)", desc: "Enchanting guide in celestial academy uniform" },
      yuimi_boy: { name: "Yuimi (Star Adventurer)", desc: "Noble guide in royal star adventurer garb" },
      shirin_uzbek: { name: "Shirin (Atlas Girl)", desc: "Traditional Uzbek girl in silk atlas dress & embroidered doppi" },
      farxod_uzbek: { name: "Farxod (Chapan Boy)", desc: "Traditional Uzbek boy in ornate chapan & doppi" },
      sakura_student: { name: "Sakura (Schoolgirl)", desc: "Cheerful anime student in sailor uniform" },
      ren_student: { name: "Ren (Student Boy)", desc: "Smart schoolboy in modern blazer" },
      hayato_ninja: { name: "Hayato (Shinobi)", desc: "Stealthy shadow clan ninja" },
      lyra_mage: { name: "Lyra (Star Mage)", desc: "Mystic spellcaster wielding cosmic energy" },
      kenji_fighter: { name: "Kenji (Martial Artist)", desc: "Black belt martial artist in traditional gi" },
      princess_aurelia: { name: "Princess Aurelia", desc: "Graceful princess with golden crown and gown" },
      prince_julian: { name: "Prince Julian", desc: "Noble royal prince in gallant uniform" },
      mia_catgirl: { name: "Mia (Neko Girl)", desc: "Playful anime girl with cute cat ears" },
      jin_cyber: { name: "Jin (Cyber Samurai)", desc: "High-tech street warrior of the future" },
      aoi_kimono: { name: "Aoi (Yukata)", desc: "Serene maiden in traditional Japanese floral kimono" },
    },
  },
  tr: {
    appTitle: "YumeChibi",
    appSubtitle: "Kendi anime karakterini tasarla ve sesli canlı sohbet et!",
    nav: {
      home: "Ana Sayfa",
      studio: "Stüdyo",
      wardrobe: "Gardırop",
      chat: "Sohbet",
      gallery: "Karakterlerim",
      games: "Oyunlar",
      settings: "Ayarlar",
      about: "Yardım",
    },
    intro: {
      welcomeTitle: "YumeChibi Dünyasına Hoş Geldiniz!",
      welcomeSubtitle: "Özgün 2D anime karakterinizi yaratın, kıyafetler giydirin ve canlı sesle sohbet edin.",
      chooseLanguage: "Dil Seçiniz",
      chooseGenderTitle: "Rehberinizi Seçiniz",
      chooseGenderSubtitle: "Bu dünyada size kim rehberlik etsin?",
      girlTitle: "Kız (Yuimi)",
      girlDesc: "Büyülü akademi kostümü içindeki sevimli Yuimi size rehberlik edecek.",
      boyTitle: "Erkek (Yuimi)",
      boyDesc: "Yıldızlı samanyolu kostümlü cesur Yuimi yol arkadaşınız olacak.",
      meetYuimi: "Yuimi ile Tanışın!",
      yuimiIntroGirl: "Merhaba arkadaşım! Benim adım Yuimi! Anime dünyasındaki rehberinim. Burada hayalindeki karakteri yaratabilir, okul formaları ya da geleneksel Özbek atlas elbiseleri giydirebilir ve onunla konuşabilirsin! Haydi başlayalım!",
      yuimiIntroBoy: "Selam! Ben Yuimi! Birlikte harika anime karakterleri tasarlayacak ve eğlenceli sohbetler edeceğiz. Hazır mısın? Macera başlıyor!",
      askName: "Adınız nedir?",
      namePlaceholder: "Adınızı girin...",
      letsStart: "Başlayalım!",
      skipIntro: "Tanıtımı Geç",
    },
    home: {
      heroGreeting: "Merhaba, {name}!",
      welcomeBack: "Karakterin seninle konuşmaya hazır!",
      quickActions: "Hızlı İşlemler",
      btnStudio: "Karakter Oluştur",
      btnWardrobe: "Gardırop",
      btnChat: "Canlı Sohbet",
      btnGames: "Mini Oyunlar",
      yuimiTipTitle: "Yuimi'nin Günlük İpucu",
      yuimiTip: "Karakterine tıkla — neşeyle tepki verecektir! Gardırop'taki geleneksel Özbek Doppi başlığını ve Atlas elbisesini mutlaka dene!",
      dailyStats: "Başarıların",
      coins: "Altınlar",
      stars: "Yıldızlar",
      activeCharacter: "Mevcut Karakter",
      currentOutfit: "Kıyafet",
      statusReady: "Sohbete hazır",
      tapToReact: "Bana dokun!",
    },
    studio: {
      title: "Karakter Stüdyosu",
      subtitle: "Yüz şekli, gözler, saç ve benzersiz aksesuarları kişiselleştir",
      tabBody: "Vücut & Ten",
      tabFace: "Yüz & Gözler",
      tabHair: "Saç Modeli",
      tabHeadwear: "Başlık",
      tabAccessories: "Aksesuarlar",
      tabProfile: "Kişilik & Ses",
      genderStyle: "Vücut Tipi",
      girl: "Kız",
      boy: "Erkek",
      neutral: "Evrensel",
      skinTone: "Ten Rengi",
      customColor: "Özel Renk",
      headShape: "Yüz Şekli",
      eyesShape: "Göz Şekli",
      eyesColor: "Göz Rengi",
      eyesSize: "Göz Boyutu",
      eyebrows: "Kaşlar",
      mouth: "Ağız İfadesi",
      blush: "Yanak Allığı",
      freckles: "Çiller",
      hairStyle: "Saç Modeli",
      hairColor: "Saç Rengi",
      hairHighlight: "Röfle / Parlama",
      headwear: "Başlık",
      accessories: "Aksesuarlar",
      shoes: "Ayakkabı",
      charName: "Karakter Adı",
      personality: "Kişilik",
      role: "Rol",
      voiceSettings: "Ses Ayarları",
      pitch: "Ses Tonu",
      speed: "Konuşma Hızı",
      previewVoice: "Sesi Dinle",
      btnRandomize: "Rastgele",
      btnReset: "Sıfırla",
      btnUndo: "Geri Al",
      btnRedo: "Yinele",
      btnSave: "Kaydet",
      btnPresets: "Hazır Şablonlar",
      savedSuccess: "Karakter galeriye kaydedildi!",
      emotions: {
        normal: "Normal",
        happy: "Mutlu",
        sad: "Üzgün",
        angry: "Kızgın",
        surprised: "Şaşkın",
        thinking: "Düşünceli",
        shy: "Utangaç",
        sleepy: "Uykulu",
      },
    },
    wardrobe: {
      title: "Büyülü Gardırop",
      subtitle: "Farklı tarzlardaki anime kıyafetlerini deneyin",
      categories: {
        all: "Tümü",
        school: "Okul",
        fantasy: "Fantastik",
        traditional: "Geleneksel",
        casual: "Günlük",
        sports: "Spor & Dövüş",
      },
      outfits: {
        yuimi_celestial: "Yuimi Samanyolu Akademisi Kıyafeti",
        school_girl: "Okul Forması (Kız)",
        school_boy: "Okul Forması (Erkek)",
        casual_hoodie: "Rahat Kapüşonlu",
        uzbek_atlas: "Özbek Geleneksel Atlas İpek Elbise",
        uzbek_chapan: "Altın İşlemeli Çapan ve Kuşak",
        ninja_suit: "Şinobi Ninja Kıyafeti",
        fantasy_mage: "Yıldız Büyücüsü Pelerini",
        martial_arts_gi: "Dövüş Sanatları Kimonosu",
        princess_gown: "Prenses Balo Elbisesi",
        prince_regal: "Prens Resmi Kostümü",
        sportswear: "Spor Eşofman",
        cyberpunk: "Siberpunk Ceket",
        kimono: "Japon Yukatası",
        pajamas: "Sevimli Pijama",
        winter_coat: "Kışlık Sıcak Palto",
      },
      primaryColor: "Ana Renk",
      secondaryColor: "İkinci Renk",
      accentColor: "Vurgu Rengi",
      shoesTitle: "Ayakkabılar",
      shoes: {
        sneakers: "Spor Ayakkabı",
        mary_janes: "Klasik Ayakkabı",
        boots: "Çizmeler",
        sandals: "Sandalet",
        ninja_tabi: "Ninja Tabi",
        traditional_ichig: "Geleneksel Mesi",
        slippers: "Yumuşak Terlik",
      },
      equipSuccess: "Kıyafet değiştirildi!",
    },
    chat: {
      title: "Canlı Sohbet",
      subtitle: "Karakterinle konuş, sesli yanıt versin ve duygularını göstersin!",
      inputPlaceholder: "Mesajınızı yazın...",
      send: "Gönder",
      speaking: "Konuşuyor...",
      listening: "Dinliyor... mikrofona konuşun",
      startMic: "Sesle Yaz",
      stopMic: "Mikrofonu Durdur",
      changeScene: "Arka Planı Değiştir",
      clearChat: "Geçmişi Temizle",
      suggestionsTitle: "Sohbet Başlatıcılar:",
      suggestions: [
        "Bana güzel bir masal anlatır mısın?",
        "Komik bir fıkra biliyor musun?",
        "Bugün ne giymemi önerirsin?",
        "Bana matematik ödevimde yardım et!",
        "Kendin hakkında biraz bahset!",
      ],
      scenes: {
        sakura_garden: "Sakura Bahçesi",
        classroom: "Anime Sınıfı",
        celestial_night: "Yıldızlı Gece",
        dojo: "Dövüş Dojosu",
        beach: "Güneşli Kumsal",
        cozy_room: "Sıcak Oda",
        registan_square: "Registan Meydanı",
      },
      typing: "Karakter yazıyor...",
      voiceMuted: "Ses kapalı",
      voiceActive: "Ses açık",
    },
    gallery: {
      title: "Karakterlerim",
      subtitle: "Kaydettiğin tüm özel karakterler",
      emptyText: "Henüz kayıtlı karakter yok. Stüdyoya gidip ilk karakterini oluştur!",
      btnNew: "Yeni Karakter",
      cardLoad: "Seç",
      cardFavorite: "Favori",
      cardDuplicate: "Çoğalt",
      cardDelete: "Sil",
      cardExportPng: "PNG İndir",
      cardExportJson: "Kodu Kopyala",
      cardImportJson: "Kodu Yükle",
      copyCodeSuccess: "Karakter kodu panoya kopyalandı!",
      loadSuccess: "Karakter yüklendi!",
      deleteConfirm: "Bu karakteri silmek istediğinizden emin misiniz?",
    },
    games: {
      title: "Mini Oyunlar ve Eğlence",
      subtitle: "Karakterinle oyun oyna, yıldız ve altın kazan!",
      tabQuiz: "Anime Bilgi Yarışması",
      tabMemory: "Hafıza Kartları",
      tabDressUp: "Moda Görevi",
      tabPet: "Sev & Etkileşim",
      quiz: {
        title: "Bilgi Ustası Yarışması",
        score: "Puan",
        questionNum: "Soru",
        correct: "Doğru! Harikasın!",
        wrong: "Maalesef yanlış!",
        next: "Sonraki Soru",
        finish: "Yarışma Bitti!",
        rewardText: "{stars} yıldız ve {coins} altın kazandın!",
      },
      memory: {
        title: "Kawaii Hafıza Oyunu",
        moves: "Hamleler",
        pairs: "Bulunan Çiftler",
        victory: "Tebrikler! Tüm çiftleri buldun!",
        playAgain: "Tekrar Oyna",
      },
      dressUp: {
        title: "Podyum Moda Sınavı",
        challengeTheme: "Günün Teması:",
        checkStyle: "Kombinimi Puanla!",
        scoreLabel: "Moda Puanı:",
        commentGreat: "Harika! Gerçek bir stil ustasısın!",
        commentGood: "Çok güzel bir uyum yakaladın!",
        commentTry: "Fena değil, aksesuarlarla zenginleştirebilirsin!",
      },
      pet: {
        title: "Karakterle Etkileşim",
        instruction: "Karakterin kafasına, yanaklarına, karnına veya ellerine dokunarak sevimli tepkilerini gör!",
        reactions: {
          head: "Başımı okşadığın için teşekkürler! Çok rahatlatıcı!",
          cheeks: "Yanaklarımı sıkma lütfen, utanıyorum!",
          tummy: "Gıdıklanıyorum! Gülmekten karnım ağrıdı!",
          hands: "Çak bir beşlik, canım dostum!",
        },
      },
    },
    settings: {
      title: "Ayarlar",
      subtitle: "Cihaz düzeni, dil, tema ve ses tercihleri",
      deviceMode: "Cihaz Düzen Modu",
      deviceAuto: "Otomatik (Duyarlı)",
      devicePc: "Bilgisayar (Geniş Masaüstü)",
      devicePhone: "Telefon (Mobil Çerçeve)",
      language: "Sistem Dili",
      theme: "Görsel Tema",
      themeLight: "Açık",
      themeDark: "Koyu",
      themeAuto: "Sistem",
      accentColor: "Vurgu Rengi",
      soundSettings: "Ses ve Müzik",
      bgmLabel: "Rahatlatıcı Fon Müziği (Web Audio)",
      sfxLabel: "Tuş Ses Efektleri (SFX)",
      volumeLabel: "Genel Ses Seviyesi",
      animations: "Animasyon Seviyesi",
      animFull: "Tam (Akıcı)",
      animReduced: "Azaltılmış",
      animOff: "Kapalı",
      textSize: "Metin Boyutu",
      textSmall: "Küçük",
      textNormal: "Normal",
      textLarge: "Büyük",
      rerunIntro: "Yuimi Tanıtımını Yeniden Başlat",
      resetAll: "Tüm Verileri Sıfırla",
      resetConfirm: "Tüm kayıtlı karakterler ve altınlar silinecektir. Emin misiniz?",
      resetSuccess: "Tüm veriler sıfırlandı!",
    },
    about: {
      title: "Yardım ve Rehber",
      subtitle: "YumeChibi hakkında bilmeniz gereken her şey",
      howToUseTitle: "Nasıl Kullanılır?",
      steps: {
        step1: "1. Karakter Stüdyosu'na girip yüz, saç ve göz şeklini seçin.",
        step2: "2. Gardırop'tan okul, dövüş veya Özbek geleneksel kıyafetlerini giydirin.",
        step3: "3. Sohbet bölümünde yapay zekayla canlı ve sesli konuşun.",
        step4: "4. Mini oyunlar oynayıp altın ve yıldız toplayın!",
      },
      featuresTitle: "Özellikler",
      features: [
        "100% Vektörel SVG grafikleri — harici resim dosyası gerektirmez, yıldırım hızında",
        "Canlı animasyonlar: nefes alma, göz kırpma, fareyi izleyen gözler, dudak senkronizasyonu",
        "Özbek milli kıyafetleri: Geleneksel nakışlı Doppi, Atlas elbise ve Çapan",
        "Gemini 3.8 Flash tabanlı güvenli, akıllı ve duygusal diyaloglar",
        "Web Speech API ile sesli okuma ve mikrofonla konuşma",
        "Web Audio API ile üretilen dinlendirici melodiler ve ses efektleri",
        "5 dilde eksiksiz arayüz",
      ],
      faqTitle: "Sıkça Sorulan Sorular",
      faqs: [
        {
          q: "Karakterlerim kaybolur mu?",
          a: "Hayır, tüm karakterleriniz tarayıcınızın localStorage hafızasında saklanır.",
        },
        {
          q: "İnternetim yokken sohbet çalışır mı?",
          a: "Evet, çevrimdışı yedek diyalog sistemi sayesinde karakteriniz her zaman cevap verir.",
        },
        {
          q: "Resmini indirebilir miyim?",
          a: "Evet! Galeriden 'PNG İndir' butonuna basarak yüksek çözünürlüklü görsel elde edebilirsiniz.",
        },
      ],
      yuimiMessageTitle: "Yuimi'den Sevgi Dolu Mesaj",
      yuimiMessage: "Yaratıcı dünyamıza katıldığın için teşekkürler! Karakterlerini sevgiyle tasarla ve arkadaşlarınla paylaş!",
      credits: "YumeChibi • AI Studio Build ile sevgiyle geliştirildi",
    },
    presets: {
      yuimi_girl: { name: "Yuimi (Büyücü Kız)", desc: "Samanyolu akademisi kostümlü sevimli rehber kız" },
      yuimi_boy: { name: "Yuimi (Yıldız Gezgini)", desc: "Yıldızlı kraliyet kostümlü nazik rehber delikanlı" },
      shirin_uzbek: { name: "Şirin (Atlas Kız)", desc: "Geleneksel atlas elbiseli ve doppili Özbek kızı" },
      farxod_uzbek: { name: "Farhod (Çapanlı Yiğit)", desc: "Doppi ve zar çapanlı Özbek genci" },
      sakura_student: { name: "Sakura (Öğrenci)", desc: "Denizci yakalı enerjik Japon liseli kız" },
      ren_student: { name: "Ren (Öğrenci)", desc: "Şık blazer ceketli çalışkan öğrenci" },
      hayato_ninja: { name: "Hayato (Şinobi)", desc: "Gölgelerin gizemli ninja ustası" },
      lyra_mage: { name: "Lyra (Yıldız Büyücüsü)", desc: "Kozmik enerjiyi yöneten büyücü" },
      kenji_fighter: { name: "Kenji (Dövüşçü)", desc: "Siyah kuşaklı geleneksel dövüş ustası" },
      princess_aurelia: { name: "Prenses Aurelia", desc: "Altın taçlı zarif saray prensesi" },
      prince_julian: { name: "Prens Julian", desc: "Asil duruşlu kraliyet prensi" },
      mia_catgirl: { name: "Mia (Kedi Kız)", desc: "Sevimli kedi kulaklı neşeli kız" },
      jin_cyber: { name: "Jin (Siber Samuray)", desc: "Geleceğin yüksek teknolojili sokak savaşçısı" },
      aoi_kimono: { name: "Aoi (Yukata)", desc: "Geleneksel Japon kimonosu giymiş sakin kız" },
    },
  },
  ja: {
    appTitle: "ユメチビ (YumeChibi)",
    appSubtitle: "あなただけのアニメちびキャラを作って、声でお話ししよう！",
    nav: {
      home: "ホーム",
      studio: "スタジオ",
      wardrobe: "クローゼット",
      chat: "おしゃべり",
      gallery: "キャラ一覧",
      games: "ミニゲーム",
      settings: "設定",
      about: "ヘルプ",
    },
    intro: {
      welcomeTitle: "YumeChibiの世界へようこそ！",
      welcomeSubtitle: "かわいい2Dちびキャラをデザインして、着せ替えて、音声でリアルタイムにお話ししましょう。",
      chooseLanguage: "言語を選択",
      chooseGenderTitle: "ガイドキャラクターを選んでね",
      chooseGenderSubtitle: "どちらの案内役と一緒に冒険を始めますか？",
      girlTitle: "女の子 (ユイミ)",
      girlDesc: "星の魔法アカデミーの制服を着た優しいユイミちゃんが案内します。",
      boyTitle: "男の子 (ユイミ)",
      boyDesc: "星空のアドベンチャー衣装を着た勇敢なユイミくんが案内します。",
      meetYuimi: "ユイミちゃんに出会おう！",
      yuimiIntroGirl: "こんにちは！私の名前はユイミです！アニメスタジオへようこそ！ここでは、あなた好みの可愛いキャラクターを自由に作ったり、学校の制服やウズベキスタンの伝統衣装に着せ替えたり、お話ししたりできますよ！一緒に始めましょう！",
      yuimiIntroBoy: "やあ！ボクはユイミ！君と一緒に素敵なちびキャラを作って、楽しくおしゃべりできるのを楽しみにしてたよ！さあ、楽しい冒険へ出発しよう！",
      askName: "あなたのお名前は？",
      namePlaceholder: "お名前を入力してね...",
      letsStart: "スタート！",
      skipIntro: "スキップ",
    },
    home: {
      heroGreeting: "こんにちは、{name}さん！",
      welcomeBack: "キャラクターがあなたとお話しするのを待っています！",
      quickActions: "クイックメニュー",
      btnStudio: "キャラ作成",
      btnWardrobe: "お着替え",
      btnChat: "AIチャット",
      btnGames: "ミニゲーム",
      yuimiTipTitle: "ユイミのアドバイス",
      yuimiTip: "キャラクターをタップしてみてね！楽しく反応してくれますよ。クローゼットにある伝統的なウズベキスタンのドッピ帽子やアトラスドレスもぜひ試してみてね！",
      dailyStats: "あなたのスコア",
      coins: "コイン",
      stars: "スター",
      activeCharacter: "現在のキャラ",
      currentOutfit: "衣装",
      statusReady: "準備完了",
      tapToReact: "タップしてね！",
    },
    studio: {
      title: "キャラスタジオ",
      subtitle: "顔の輪郭、目、髪型、アクセサリーを細かくカスタマイズ",
      tabBody: "からだ＆肌",
      tabFace: "顔＆瞳",
      tabHair: "ヘアスタイル",
      tabHeadwear: "帽子・リボン",
      tabAccessories: "アクセサリー",
      tabProfile: "性格＆ボイス",
      genderStyle: "体型スタイル",
      girl: "女の子",
      boy: "男の子",
      neutral: "中性",
      skinTone: "肌の色",
      customColor: "カスタム色",
      headShape: "輪郭の形",
      eyesShape: "目の形",
      eyesColor: "目の色",
      eyesSize: "目の大きさ",
      eyebrows: "まゆげ",
      mouth: "口の形",
      blush: "チーク (ほっぺ)",
      freckles: "そばかす",
      hairStyle: "髪型",
      hairColor: "髪の色",
      hairHighlight: "ハイライト色",
      headwear: "頭の飾り",
      accessories: "アクセサリー",
      shoes: "くつ",
      charName: "名前",
      personality: "性格",
      role: "役割",
      voiceSettings: "ボイス設定",
      pitch: "声の高さ (Pitch)",
      speed: "話す速度 (Speed)",
      previewVoice: "声を試聴する",
      btnRandomize: "ランダム",
      btnReset: "リセット",
      btnUndo: "元に戻す",
      btnRedo: "やり直し",
      btnSave: "保存する",
      btnPresets: "プリセット一覧",
      savedSuccess: "キャラクターをギャラリーに保存しました！",
      emotions: {
        normal: "普通",
        happy: "笑顔",
        sad: "悲しい",
        angry: "怒り",
        surprised: "驚き",
        thinking: "考え中",
        shy: "照れ",
        sleepy: "眠い",
      },
    },
    wardrobe: {
      title: "魔法のクローゼット",
      subtitle: "様々なアニメ衣装や民族衣装に着せ替えてみましょう",
      categories: {
        all: "すべて",
        school: "学生服",
        fantasy: "ファンタジー",
        traditional: "伝統衣装",
        casual: "カジュアル",
        sports: "スポーツ＆格闘",
      },
      outfits: {
        yuimi_celestial: "ユイミ 星の学園ドレス",
        school_girl: "セーラー服 (女子)",
        school_boy: "ブレザー制服 (男子)",
        casual_hoodie: "ゆったりパーカー",
        uzbek_atlas: "ウズベク伝統のアトラス絹ドレス",
        uzbek_chapan: "金の刺繍チャパン羽織り",
        ninja_suit: "忍びの装束",
        fantasy_mage: "星空の魔法使いマント",
        martial_arts_gi: "格闘技の道着",
        princess_gown: "プリンセスドレス",
        prince_regal: "王子の礼服",
        sportswear: "スポーティジャージ",
        cyberpunk: "サイバーパンクジャケット",
        kimono: "和風の浴衣",
        pajamas: "もこもこパジャマ",
        winter_coat: "あったか冬コート",
      },
      primaryColor: "ベースカラー",
      secondaryColor: "サブカラー",
      accentColor: "アクセントカラー",
      shoesTitle: "靴・フットウェア",
      shoes: {
        sneakers: "スニーカー",
        mary_janes: "ローファー靴",
        boots: "ブーツ",
        sandals: "サンダル",
        ninja_tabi: "忍者の地下足袋",
        traditional_ichig: "ウズベク伝統の革靴",
        slippers: "ふんわりスリッパ",
      },
      equipSuccess: "着替えが完了しました！",
    },
    chat: {
      title: "ライブおしゃべり",
      subtitle: "キャラクターと声でお話ししよう！表情や口元も動きます。",
      inputPlaceholder: "メッセージを入力...",
      send: "送信",
      speaking: "お話し中...",
      listening: "音声を聞いています...",
      startMic: "マイクで話す",
      stopMic: "マイク停止",
      changeScene: "背景を変える",
      clearChat: "履歴をクリア",
      suggestionsTitle: "おすすめの話題:",
      suggestions: [
        "素敵なおやすみアニメストーリーを聞かせて！",
        "面白いダジャレや冗談知ってる？",
        "今日着るおすすめの服を教えて！",
        "算数のクイズを出してみて！",
        "あなたの好きなことを教えて！",
      ],
      scenes: {
        sakura_garden: "桜の庭園",
        classroom: "学校の教室",
        celestial_night: "満天の星空",
        dojo: "武道の道場",
        beach: "青い海と砂浜",
        cozy_room: "あったかいマイルーム",
        registan_square: "レギスタン広場",
      },
      typing: "入力中...",
      voiceMuted: "音声ミュート",
      voiceActive: "音声再生中",
    },
    gallery: {
      title: "キャラクター一覧",
      subtitle: "作成したキャラクターの管理と保存",
      emptyText: "保存されたキャラクターがまだありません。スタジオで最初のキャラを作ってみましょう！",
      btnNew: "新規作成",
      cardLoad: "選択する",
      cardFavorite: "お気に入り",
      cardDuplicate: "複製",
      cardDelete: "削除",
      cardExportPng: "PNG画像を保存",
      cardExportJson: "コードをコピー",
      cardImportJson: "コードから復元",
      copyCodeSuccess: "コードをクリップボードにコピーしました！",
      loadSuccess: "キャラクターを読み込みました！",
      deleteConfirm: "本当にこのキャラクターを削除しますか？",
    },
    games: {
      title: "ミニゲーム＆あそび",
      subtitle: "キャラクターと一緒に遊んでスターとコインをゲット！",
      tabQuiz: "アニメクイズ",
      tabMemory: "神経衰弱カード",
      tabDressUp: "ファッション審査",
      tabPet: "ふれあい・なでる",
      quiz: {
        title: "ものしりアニメクイズ",
        score: "スコア",
        questionNum: "問題",
        correct: "大正解！すごいですね！",
        wrong: "ざんねん、不正解でした！",
        next: "次の問題へ",
        finish: "クイズ終了！",
        rewardText: "スター {stars}個 と コイン {coins}枚 を獲得しました！",
      },
      memory: {
        title: "かわいいカードめくり",
        moves: "ターン数",
        pairs: "見つけたペア",
        victory: "おめでとう！すべてのカードが揃いました！",
        playAgain: "もう一度遊ぶ",
      },
      dressUp: {
        title: "ファッションショー審査",
        challengeTheme: "今回のお題：",
        checkStyle: "コーデを判定する！",
        scoreLabel: "ファッショントータル点数：",
        commentGreat: "完璧！とっても素敵なコーディネートです！",
        commentGood: "色合いがとても綺麗にまとまっています！",
        commentTry: "いいね！アクセサリーも変えてみてね！",
      },
      pet: {
        title: "ふれあい・タッチ",
        instruction: "キャラクターの頭、ほっぺ、おなか、手をタッチしてかわいい反応を見てみましょう！",
        reactions: {
          head: "あたまを撫でてくれてありがとう！とっても落ち着きます…！",
          cheeks: "わわっ！ほっぺを引っ張らないで〜！恥ずかしいです！",
          tummy: "くすぐったいよ〜！あはは、笑いが止まりません！",
          hands: "ハイタッチ！これからもずっと仲良しだよ！",
        },
      },
    },
    settings: {
      title: "設定",
      subtitle: "画面レイアウト、言語、テーマ、サウンドの調整",
      deviceMode: "デバイス表示モード",
      deviceAuto: "自動 (レスポンシブ)",
      devicePc: "PC (ワイドデスクトップ)",
      devicePhone: "スマートフォン (スマホ枠シミュレーター)",
      language: "表示言語",
      theme: "カラーテーマ",
      themeLight: "ライト",
      themeDark: "ダーク",
      themeAuto: "システム準拠",
      accentColor: "アクセントカラー",
      soundSettings: "サウンド＆音楽",
      bgmLabel: "アンビエントBGM (Web Audio)",
      sfxLabel: "効果音 (SFX)",
      volumeLabel: "マスター音量",
      animations: "アニメーション演出",
      animFull: "フル (なめらか)",
      animReduced: "ひかえめ",
      animOff: "オフ",
      textSize: "文字の大きさ",
      textSmall: "小さめ",
      textNormal: "標準",
      textLarge: "大きめ",
      rerunIntro: "ユイミの紹介をもう一度見る",
      resetAll: "全データを初期化",
      resetConfirm: "保存されたキャラクターやコインがすべて削除されます。よろしいですか？",
      resetSuccess: "すべてのデータをリセットしました！",
    },
    about: {
      title: "ヘルプ＆ガイド",
      subtitle: "YumeChibiの使い方と魅力",
      howToUseTitle: "使い方ガイド",
      steps: {
        step1: "1. キャラスタジオで顔の形、髪型、瞳を自由にコーディネート。",
        step2: "2. クローゼットでおしゃれな制服やウズベキスタンの伝統衣装に着替え。",
        step3: "3. おしゃべり画面でGemini AIと表情付きのリアルタイム音声会話。",
        step4: "4. ミニゲームでコインを集めて可愛いバッジをアンロック！",
      },
      featuresTitle: "主な特徴",
      features: [
        "100% インライン2D SVG ベクター描画 — 外部画像ファイル不要で軽量・高精細",
        "生きたアニメーション: 呼吸の揺れ、まばたき、視線追従、リップシンク口パク",
        "ウズベキスタンの伝統衣装: 緻密な刺繍のドッピ帽子、アトラス絹、チャパン羽織り",
        "Gemini 3.8 Flashによる感情豊かなAI対話システム",
        "Web Speech APIによる音声合成読み上げ＆マイク入力",
        "Web Audio APIで生成する心地よい環境音楽と効果音",
        "5つの言語に完全対応",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          q: "作ったキャラクターは保存されますか？",
          a: "はい！お使いのブラウザのlocalStorageに自動保存されます。",
        },
        {
          q: "オフラインでもお話しできますか？",
          a: "はい、内蔵の会話エンジンがあるため、ネット接続が切れても会話が楽しめます。",
        },
        {
          q: "画像を保存できますか？",
          a: "ギャラリーの「PNG画像を保存」ボタンから高画質イラストをダウンロードできます。",
        },
      ],
      yuimiMessageTitle: "ユイミからのメッセージ",
      yuimiMessage: "一緒に素敵なキャラクターを作ってくれてありがとう！たくさんの楽しい思い出を作ろうね！",
      credits: "YumeChibi • AI Studio Buildにて真心を込めて制作",
    },
    presets: {
      yuimi_girl: { name: "ユイミ (星の魔法少女)", desc: "星空学園の華やかな制服をまとった案内役の女の子" },
      yuimi_boy: { name: "ユイミ (星の冒険者)", desc: "気品ある星空の礼服を着た優しい案内役の男の子" },
      shirin_uzbek: { name: "シリン (アトラスの少女)", desc: "伝統のアトラス柄ドレスと刺繍ドッピを身につけたウズベクの少女" },
      farxod_uzbek: { name: "ファルホド (チャパンの青年)", desc: "金の刺繍が施された伝統チャパンとドッピを着たウズベクの青年" },
      sakura_student: { name: "サクラ (女子高生)", desc: "明るく元気いっぱいのセーラー服美少女" },
      ren_student: { name: "レン (男子生徒)", desc: "スマートなブレザーを着こなす優等生" },
      hayato_ninja: { name: "ハヤト (忍者)", desc: "影の術を操るミステリアスな忍び" },
      lyra_mage: { name: "ライラ (星空の魔導士)", desc: "天体の力を操るファンタジー魔女" },
      kenji_fighter: { name: "ケンジ (武道家)", desc: "黒帯を締めた正統派の格闘技少年" },
      princess_aurelia: { name: "オーレリア姫", desc: "黄金のティアラと豪奢なドレスを着たお姫様" },
      prince_julian: { name: "ジュリアン王子", desc: "誇り高き王家の礼服を着た王子様" },
      mia_catgirl: { name: "ミア (ネコ耳少女)", desc: "ピョコピョコ動くネコ耳がキュートな女の子" },
      jin_cyber: { name: "ジン (サイバー侍)", desc: "近未来のネオン街を駆けるストリートサムライ" },
      aoi_kimono: { name: "アオイ (浴衣少女)", desc: "大和撫子のような上品な和装の少女" },
    },
  },
};
