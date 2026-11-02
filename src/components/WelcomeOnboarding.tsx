import React, { useState } from 'react';
import { PuppyProfile } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';
import { SAMPLE_PUPPIES } from '../utils/initialData';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  PawPrint,
  Heart,
  Scale,
  Calendar,
  User,
  ShieldCheck,
  ArrowRight,
  Dog,
  Check
} from 'lucide-react';

interface WelcomeOnboardingProps {
  onComplete: (puppy: PuppyProfile) => void;
  onSkip: () => void;
  existingPuppy?: PuppyProfile;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
}

export const WelcomeOnboarding: React.FC<WelcomeOnboardingProps> = ({
  onComplete,
  onSkip,
  existingPuppy,
  language,
  onToggleLanguage
}) => {
  const t = TRANSLATIONS[language];

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [ageWeeks, setAgeWeeks] = useState<number | ''>(10);
  const [weightKg, setWeightKg] = useState<number | ''>(4.5);
  const [expectedAdultWeightKg, setExpectedAdultWeightKg] = useState<number | ''>('');
  const [gender, setGender] = useState<'macho' | 'femea'>('macho');
  const [tutorName, setTutorName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(
    'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}

    const newPuppy: PuppyProfile = {
      id: 'pup-' + Date.now(),
      name: name.trim(),
      breed: breed.trim() || (language === 'pt' ? 'SRD (Vira-Lata)' : 'Mixed Breed'),
      ageWeeks: Number(ageWeeks) || 8,
      weightKg: Number(weightKg) || 3.0,
      expectedAdultWeightKg: expectedAdultWeightKg ? Number(expectedAdultWeightKg) : undefined,
      gender,
      avatarUrl,
      tutorName: tutorName.trim() || (language === 'pt' ? 'Tutor Responsável' : 'Guardian'),
      microchipId: 'BR-' + Math.floor(100000000 + Math.random() * 900000000)
    };

    onComplete(newPuppy);
  };

  const handleSelectPreset = (pup: PuppyProfile) => {
    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch {}
    onComplete(pup);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8">
      
      {/* Hero Welcome Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{t.onboarding.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          {t.onboarding.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t.onboarding.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Registration Form Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-200/90">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <PawPrint className="w-5 h-5 text-amber-500" />
              <h2 className="font-extrabold text-slate-800 text-lg">
                {language === 'pt' ? 'Ficha de Admissão do Filhote' : 'Puppy Intake Form'}
              </h2>
            </div>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
              {language === 'pt' ? 'Rápido & Científico' : 'Fast & Scientific'}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Puppy Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.onboarding.puppyName} *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'pt' ? 'Ex: Thor, Mel, Cookie, Pipoca...' : 'e.g., Milo, Bella, Charlie...'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 font-semibold text-slate-800 placeholder:text-slate-400 text-sm transition-all"
                />
              </div>
            </div>

            {/* Breed & Gender row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.onboarding.breed}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    placeholder={t.onboarding.breedPlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 font-semibold text-slate-800 placeholder:text-slate-400 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.onboarding.gender}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender('macho')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      gender === 'macho'
                        ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>♂</span>
                    <span>{t.onboarding.male}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('femea')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      gender === 'femea'
                        ? 'bg-pink-50 border-pink-400 text-pink-700 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>♀</span>
                    <span>{t.onboarding.female}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Age & Weight row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.onboarding.ageWeeks} *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="number"
                    min="4"
                    max="104"
                    step="1"
                    required
                    value={ageWeeks}
                    onChange={(e) => setAgeWeeks(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 font-bold text-slate-800 text-sm transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">{t.onboarding.ageHelper}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.onboarding.currentWeight} *
                </label>
                <div className="relative">
                  <Scale className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="number"
                    min="0.3"
                    max="90"
                    step="0.1"
                    required
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 font-bold text-slate-800 text-sm transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">{language === 'pt' ? 'Precisão decimal em kg' : 'Decimal precision in kg'}</p>
              </div>
            </div>

            {/* Expected Adult Weight & Tutor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.onboarding.expectedWeight}
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  step="0.5"
                  value={expectedAdultWeightKg}
                  onChange={(e) => setExpectedAdultWeightKg(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Ex: 28"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 font-semibold text-slate-800 text-sm transition-all"
                />
                <p className="text-[11px] text-slate-400 mt-1">{t.onboarding.expectedWeightHelper}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.onboarding.tutorName}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={tutorName}
                    onChange={(e) => setTutorName(e.target.value)}
                    placeholder={language === 'pt' ? 'Seu nome' : 'Your name'}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 font-semibold text-slate-800 text-sm transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span>{t.onboarding.submitBtn}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Demo Profiles & Clinical Highlights */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Demo Selector */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/90">
            <h3 className="text-sm font-extrabold text-slate-800 mb-1 flex items-center gap-2">
              <Dog className="w-4 h-4 text-amber-500" />
              <span>{t.onboarding.orSelectExisting}</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {language === 'pt'
                ? 'Se preferir explorar a aplicação imediatamente com dados clínicos pré-calculados:'
                : 'Or immediately explore the app with ready-to-use clinical dog profiles:'}
            </p>

            <div className="space-y-2.5">
              {SAMPLE_PUPPIES.map((pup) => (
                <div
                  key={pup.id}
                  onClick={() => handleSelectPreset(pup)}
                  className="group flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/50 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={pup.avatarUrl}
                      alt={pup.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 group-hover:ring-amber-300 transition-all"
                    />
                    <div>
                      <div className="font-bold text-slate-800 text-sm group-hover:text-amber-900 flex items-center gap-1.5">
                        {pup.name}
                        <span className="text-xs text-slate-400 font-normal">
                          ({pup.gender === 'macho' ? '♂' : '♀'})
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {pup.breed} • {pup.ageWeeks} sem • {pup.weightKg} kg
                      </div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center text-slate-500 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>

            {existingPuppy && (
              <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={onSkip}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 underline transition-colors"
                >
                  {language === 'pt' ? 'Continuar com perfil atual sem cadastrar outro' : 'Continue with current active puppy'}
                </button>
              </div>
            )}
          </div>

          {/* WSAVA Guarantee Card */}
          <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-50 rounded-3xl p-6 border border-amber-200/70">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  {language === 'pt' ? 'Padrão Nutricional WSAVA & FEDIAF' : 'WSAVA & FEDIAF Nutritional Standard'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'pt'
                    ? 'Todos os cálculos de RER, MER, fracionamento de refeições e relação Cálcio:Fósforo são parametrizados pelas diretrizes da World Small Animal Veterinary Association.'
                    : 'All RER, MER calculations, meal fractionation, and Calcium:Phosphorus ratios follow official World Small Animal Veterinary Association guidelines.'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
