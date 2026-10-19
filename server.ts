import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK on server side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const fallbackReplies: Record<string, string[]> = {
  uz: [
    "Salom! Men siz bilan gaplashayotganimdan judayam xursandman! Bugun yana nimalar yaratamiz? [EMOTION:happy]",
    "Bu judayam ajoyib fikr! Siz bilan vaqt o'tkazish menga juda yoqadi! [EMOTION:happy]",
    "Hmm, bir oz o'ylab ko'raychi... Ha, albatta buni uddalay olamiz! [EMOTION:thinking]",
    "Voy, buni kutmagan edim! Rostdanmi? Judayam qiziqarli! [EMOTION:surprised]",
    "Rahmat sizga, siz eng yaxshi do'stsiz! Siz bilan suhbatlashish kayfiyatimni ko'taradi! [EMOTION:shy]",
    "Keling, yangi kiyimlarni sinab ko'ramiz yoki qiziqarli o'yin o'ynaymiz! [EMOTION:happy]"
  ],
  en: [
    "Hello! I am so happy to chat with you today! What should we create next? [EMOTION:happy]",
    "That sounds wonderful! I always enjoy spending time with you! [EMOTION:happy]",
    "Hmm, let me ponder that for a moment... Yes, together we can do anything! [EMOTION:thinking]",
    "Wow, I didn't expect that! That is truly amazing! [EMOTION:surprised]",
    "Thank you so much! Talking with you always brightens up my day! [EMOTION:shy]",
    "Let's try on a new outfit in the Wardrobe or play a mini-game together! [EMOTION:happy]"
  ],
  ru: [
    "Привет! Я так рада пообщаться с тобой! Что мы создадим сегодня? [EMOTION:happy]",
    "Это звучит здорово! Мне так приятно проводить время вместе с тобой! [EMOTION:happy]",
    "Хмм, дай-ка подумать секундочку... Да, мы обязательно со всем справимся! [EMOTION:thinking]",
    "Ого, вот это неожиданно! Очень интересно! [EMOTION:surprised]",
    "Спасибо огромное, ты замечательный друг! Ты поднимаешь мне настроение! [EMOTION:shy]",
    "Давай примерим новый наряд в Гардеробе или сыграем в мини-игру! [EMOTION:happy]"
  ],
  tr: [
    "Merhaba! Seninle konuştuğum için çok mutluyum! Bugün ne yapalım? [EMOTION:happy]",
    "Bu harika bir fikir! Seninle vakit geçirmek bana çok iyi geliyor! [EMOTION:happy]",
    "Hmm, bir saniye düşüneyim... Evet, bunu birlikte başarabiliriz! [EMOTION:thinking]",
    "Vay canına, bunu hiç beklemiyordum! Gerçekten çok heyecan verici! [EMOTION:surprised]",
    "Çok teşekkür ederim! Seninle konuşmak günümü aydınlatıyor! [EMOTION:shy]",
    "Hadi Gardırop'ta yeni bir kıyafet deneyelim veya mini oyun oynayalım! [EMOTION:happy]"
  ],
  ja: [
    "こんにちは！お話しできてとっても嬉しいです！今日は何を作ろうかな？ [EMOTION:happy]",
    "すてきですね！あなたとお話しする時間が一番大好きです！ [EMOTION:happy]",
    "うーん、ちょっと考えてみますね… うん、きっと上手くいきますよ！ [EMOTION:thinking]",
    "わぁ、びっくりしました！そんなこともあるんですね！ [EMOTION:surprised]",
    "ありがとうございます、えへへ… なんだか照れちゃいます！ [EMOTION:shy]",
    "ワードローブで新しいお洋服に着替えたり、ミニゲームで遊びませんか？ [EMOTION:happy]"
  ]
};

const languageNames: Record<string, string> = {
  uz: "Uzbek (O'zbekcha)",
  en: "English",
  ru: "Russian (Русский)",
  tr: "Turkish (Türkçe)",
  ja: "Japanese (日本語)"
};

// POST /api/chat
app.post('/api/chat', async (req, res) => {
  const { message, character, language = 'uz', history = [], userName = 'Friend' } = req.body;

  const langCode = (['uz', 'en', 'ru', 'tr', 'ja'].includes(language) ? language : 'uz') as keyof typeof fallbackReplies;
  const targetLangName = languageNames[langCode] || "Uzbek";

  const charName = character?.name || "Yuimi";
  const charGender = character?.gender || "girl";
  const charPersonality = character?.personality || "cheerful";
  const charRole = character?.role || "friend";

  // If AI instance is not ready, return cute friendly fallback
  if (!ai) {
    const list = fallbackReplies[langCode] || fallbackReplies.uz;
    const fallbackText = list[Math.floor(Math.random() * list.length)];
    const emotionMatch = fallbackText.match(/\[EMOTION:(happy|sad|angry|surprised|thinking|shy|sleepy)\]/i);
    const emotion = emotionMatch ? emotionMatch[1].toLowerCase() : 'happy';
    const cleanText = fallbackText.replace(/\[EMOTION:[^\]]+\]/gi, '').trim();

    return res.json({
      reply: cleanText,
      emotion,
      isFallback: true
    });
  }

  try {
    const systemInstruction = `You are roleplaying as ${charName}, an adorable anime/chibi character (${charGender}).
Personality: ${charPersonality}.
Role: ${charRole}.
User's name: ${userName}.
Language you MUST reply in: ${targetLangName}.

Rules:
1. Stay deeply in character at all times. Be cute, warm, expressive, and friendly.
2. Reply strictly in ${targetLangName}.
3. Keep your reply concise: 1 to 3 natural conversational sentences (since it will be spoken aloud via Text-to-Speech).
4. Strictly kid-safe, polite, uplifting, and cheerful. Refuse any unsafe or inappropriate topics gently and steer back to fun anime topics, clothes, games, or creativity.
5. At the very end of your response, add an emotion tag to represent your face: [EMOTION:happy], [EMOTION:sad], [EMOTION:angry], [EMOTION:surprised], [EMOTION:thinking], [EMOTION:shy], or [EMOTION:sleepy]. Do not omit this tag.`;

    // Construct prompt with history context
    let promptText = `User (${userName}): ${message}`;
    if (Array.isArray(history) && history.length > 0) {
      const recent = history.slice(-4).map((h: { sender: string; text: string }) => `${h.sender}: ${h.text}`).join('\n');
      promptText = `Conversation history:\n${recent}\n\nUser (${userName}): ${message}`;
    }

    const timeoutPromise = new Promise<{ text: string }>((_, reject) =>
      setTimeout(() => reject(new Error('Gemini timeout')), 7500)
    );

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    }).then((res) => ({ text: res.text || '' }));

    const response = await Promise.race([generatePromise, timeoutPromise]);

    const rawText = response.text || "";
    const emotionMatch = rawText.match(/\[EMOTION:(happy|sad|angry|surprised|thinking|shy|sleepy)\]/i);
    const emotion = emotionMatch ? emotionMatch[1].toLowerCase() : 'happy';
    const cleanText = rawText.replace(/\[EMOTION:[^\]]+\]/gi, '').trim();

    return res.json({
      reply: cleanText || (fallbackReplies[langCode][0].replace(/\[EMOTION:[^\]]+\]/gi, '').trim()),
      emotion,
      isFallback: false
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    const list = fallbackReplies[langCode] || fallbackReplies.uz;
    const fallbackText = list[Math.floor(Math.random() * list.length)];
    const emotionMatch = fallbackText.match(/\[EMOTION:(happy|sad|angry|surprised|thinking|shy|sleepy)\]/i);
    const emotion = emotionMatch ? emotionMatch[1].toLowerCase() : 'happy';
    const cleanText = fallbackText.replace(/\[EMOTION:[^\]]+\]/gi, '').trim();

    return res.json({
      reply: cleanText,
      emotion,
      isFallback: true
    });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`YumeChibi server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
