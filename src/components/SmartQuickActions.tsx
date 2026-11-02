import React, { useState } from 'react';
import { PuppyProfile, FoodLabelAnalysisResult, VaccineRecord } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';
import { Droplet, Utensils, AlertTriangle, CheckCircle2, ChevronRight, Flame } from 'lucide-react';
import { calculateWSAVAPlan, checkCalciumPhosphorusRatio } from '../utils/wsava';

interface SmartQuickActionsProps {
  activePuppy: PuppyProfile;
  activeFood: FoodLabelAnalysisResult;
  vaccines: VaccineRecord[];
  onNavigateTab: (tab: string) => void;
  onQuickAddWater: () => void;
  onQuickMarkMeal: () => void;
  language: Language;
}

export const SmartQuickActions: React.FC<SmartQuickActionsProps> = ({
  activePuppy,
  activeFood,
  vaccines,
  onNavigateTab,
  language
}) => {
  const [loggedWaterMl, setLoggedWaterMl] = useState(250);
  const [waterCelebration, setWaterCelebration] = useState(false);

  const t = TRANSLATIONS[language];
  const plan = calculateWSAVAPlan(activePuppy, activeFood.energyDensityKcal100g);
  const caPRatio = checkCalciumPhosphorusRatio(
    activeFood.guaranteedAnalysis.calciumPercent,
    activeFood.guaranteedAnalysis.phosphorusPercent
  );

  const pendingVaccines = vaccines.filter(
    (v) => v.status === 'agendada' || v.status === 'atrasada'
  );
  const nextVaccine = pendingVaccines[0];

  const handleAddWater = () => {
    setLoggedWaterMl((prev) => prev + 100);
    setWaterCelebration(true);
    setTimeout(() => setWaterCelebration(false), 1500);
  };

  return (
    <div className="mb-4 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-slate-50 border border-amber-200/60 rounded-2xl p-3 sm:p-4 shadow-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        
        {/* Puppy summary badge */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={activePuppy.avatarUrl || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=150&q=80'}
              alt={activePuppy.name}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-amber-400/40 shadow-xs"
            />
            <span className={`absolute -bottom-1 -right-1 text-[11px] px-1 py-0.2 rounded-full font-bold ${
              activePuppy.gender === 'macho' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
            }`}>
              {activePuppy.gender === 'macho' ? '♂' : '♀'}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 leading-tight">
                {activePuppy.name}
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {activePuppy.ageWeeks} {language === 'pt' ? 'semanas' : 'weeks'}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {activePuppy.weightKg} kg
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {activePuppy.breed} • {language === 'pt' ? 'Tutor(a):' : 'Tutor:'} {activePuppy.tutorName}
            </p>
          </div>
        </div>

        {/* Quick Action Chips */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          
          {/* Quick Water Tracker */}
          <button
            onClick={handleAddWater}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-xs font-bold ${
              waterCelebration
                ? 'bg-blue-500 text-white border-blue-600 scale-105'
                : 'bg-white hover:bg-blue-50/70 border-blue-200 text-blue-700'
            }`}
            title="Clique para adicionar +100ml de água"
          >
            <Droplet className={`w-3.5 h-3.5 ${waterCelebration ? 'animate-bounce text-white' : 'text-blue-500'}`} />
            <span>
              {loggedWaterMl} / {plan.dailyWaterMl} ml
            </span>
            <span className="text-[10px] bg-blue-100 text-blue-800 px-1 rounded-sm">+100</span>
          </button>

          {/* Quick Meal Plan Shortcut */}
          <button
            onClick={() => onNavigateTab('meal-planner')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>{plan.merKcal} kcal</span>
            <span className="text-[11px] text-slate-400">({plan.dailyGrams}g)</span>
          </button>

          {/* Vaccine Alert Chip */}
          {nextVaccine ? (
            <button
              onClick={() => onNavigateTab('vaccines')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
                nextVaccine.status === 'atrasada'
                  ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                  : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="max-w-[130px] truncate">{nextVaccine.name}</span>
              <ChevronRight className="w-3 h-3 opacity-60" />
            </button>
          ) : (
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.quickActions.vaccineOk}</span>
            </div>
          )}

          {/* Ca:P Ratio Status Chip */}
          <button
            onClick={() => onNavigateTab('food-scanner')}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-600"
            title={caPRatio.message}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Ca:P {caPRatio.ratio}:1</span>
          </button>
        </div>

      </div>
    </div>
  );
};
