import React from 'react';
import { UserSettings } from '../../types/character';
import { translations } from '../../i18n/translations';
import { YuimiGuide } from '../character/YuimiGuide';
import { HelpCircle, Sparkles, CheckCircle2, ChevronDown } from 'lucide-react';

interface AboutPageProps {
  settings: UserSettings;
}

export const AboutPage: React.FC<AboutPageProps> = ({ settings }) => {
  const t = translations[settings.language] || translations.uz;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* ── HEADER TITLE ── */}
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 rounded-3xl border border-purple-100 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-7 h-7 text-purple-600 dark:text-purple-400" />
          <span>{t.about.title}</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t.about.subtitle}
        </p>
      </div>

      {/* ── YUIMI'S MESSAGE CARD ── */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-100/80 via-pink-100/80 to-amber-50/80 dark:from-slate-900/90 dark:via-purple-950/40 dark:to-slate-900/90 border border-purple-200/60 dark:border-purple-800/40 shadow-md">
        <YuimiGuide
          gender={settings.guideGender || 'girl'}
          language={settings.language}
          dialogueText={t.about.yuimiMessage}
          compact={true}
        />
      </div>

      {/* ── HOW TO USE (4 STEPS) ── */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-purple-100 dark:border-slate-800 shadow-md space-y-4">
        <h3 className="font-extrabold text-lg text-slate-800 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>{t.about.howToUseTitle}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-slate-800/50 border border-purple-100 dark:border-slate-700/60">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {t.about.steps.step1}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-pink-50/70 dark:bg-slate-800/50 border border-pink-100 dark:border-slate-700/60">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {t.about.steps.step2}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-slate-800/50 border border-amber-100 dark:border-slate-700/60">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {t.about.steps.step3}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-slate-800/50 border border-emerald-100 dark:border-slate-700/60">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {t.about.steps.step4}
            </p>
          </div>
        </div>
      </div>

      {/* ── CORE FEATURES LIST ── */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-purple-100 dark:border-slate-800 shadow-md space-y-4">
        <h3 className="font-extrabold text-lg text-slate-800 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span>{t.about.featuresTitle}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {t.about.features.map((feature, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-slate-800/40 border border-purple-100 dark:border-slate-700/50 flex items-start gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0" />
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ ACCORDION ── */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-purple-100 dark:border-slate-800 shadow-md space-y-4">
        <h3 className="font-extrabold text-lg text-slate-800 dark:text-white">
          {t.about.faqTitle}
        </h3>

        <div className="space-y-3">
          {t.about.faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group p-4 rounded-2xl bg-purple-50/50 dark:bg-slate-800/40 border border-purple-100 dark:border-slate-700/50 cursor-pointer"
            >
              <summary className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center justify-between list-none">
                <span>{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-purple-500 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed pt-2 border-t border-purple-100 dark:border-slate-700/40">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* ── CREDITS ── */}
      <div className="text-center text-xs text-slate-400 dark:text-slate-500 pt-4">
        {t.about.credits}
      </div>
    </div>
  );
};
