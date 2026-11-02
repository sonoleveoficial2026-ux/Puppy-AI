import React, { useState } from 'react';
import { PuppyProfile, FoodLabelAnalysisResult } from '../types';
import { calculateRER, getGrowthMultiplier, getRecommendedMealsCount } from '../utils/wsava';
import {
  Calculator,
  Scale,
  Calendar,
  Flame,
  Droplet,
  Utensils,
  CheckCircle2,
  Info,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WSAVACalculatorProps {
  activePuppy: PuppyProfile;
  activeFood: FoodLabelAnalysisResult;
  onUpdatePuppyWeight: (weightKg: number, expectedAdultKg?: number) => void;
}

export const WSAVACalculator: React.FC<WSAVACalculatorProps> = ({
  activePuppy,
  activeFood,
  onUpdatePuppyWeight
}) => {
  const [weightKg, setWeightKg] = useState<number>(activePuppy.weightKg);
  const [ageWeeks, setAgeWeeks] = useState<number>(activePuppy.ageWeeks);
  const [adultTargetKg, setAdultTargetKg] = useState<number>(
    activePuppy.expectedAdultWeightKg || activePuppy.weightKg * 2
  );
  const [foodDensityKcal100g, setFoodDensityKcal100g] = useState<number>(
    activeFood.energyDensityKcal100g || 390
  );
  const [savedFeedback, setSavedFeedback] = useState(false);

  // Math computations
  const rer = calculateRER(weightKg);
  const multiplier = getGrowthMultiplier(ageWeeks, weightKg, adultTargetKg);
  const mer = Math.round(rer * multiplier);
  const dailyGrams = Math.round((mer / foodDensityKcal100g) * 100);
  const mealsCount = getRecommendedMealsCount(ageWeeks);
  const gramsPerMeal = Math.round(dailyGrams / mealsCount);
  const dailyWaterMl = Math.round(weightKg * 70);

  const handleSaveToProfile = () => {
    onUpdatePuppyWeight(weightKg, adultTargetKg);
    setSavedFeedback(true);
    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    } catch {}
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-1.5">
          <Calculator className="w-3.5 h-3.5 text-blue-600" />
          <span>Fórmulas Clínicas Globais</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Calculadora Nutricional WSAVA Clínica
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-2xl">
          Determinação da Necessidade Energética Basal (RER) e Crescimento (MER) com base nas diretrizes oficiais da World Small Animal Veterinary Association.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Interactive Sliders / Inputs */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span>Parâmetros de Entrada do Filhote</span>
            <span className="text-amber-600 font-bold">{activePuppy.name}</span>
          </div>

          {/* Weight Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-500" />
                <span>Peso Atual do Filhote</span>
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="0.3"
                  max="90"
                  step="0.1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value) || 0.5)}
                  className="w-20 px-2 py-1 border border-slate-200 rounded-lg text-right font-extrabold text-slate-900 text-sm"
                />
                <span className="font-extrabold text-slate-700">kg</span>
              </div>
            </div>
            <input
              type="range"
              min="0.5"
              max="50"
              step="0.1"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full accent-amber-500 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
          </div>

          {/* Age Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>Idade Atual</span>
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="4"
                  max="104"
                  step="1"
                  value={ageWeeks}
                  onChange={(e) => setAgeWeeks(Number(e.target.value) || 4)}
                  className="w-20 px-2 py-1 border border-slate-200 rounded-lg text-right font-extrabold text-slate-900 text-sm"
                />
                <span className="font-extrabold text-slate-700">sem</span>
              </div>
            </div>
            <input
              type="range"
              min="4"
              max="78"
              step="1"
              value={ageWeeks}
              onChange={(e) => setAgeWeeks(Number(e.target.value))}
              className="w-full accent-blue-500 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Desmame (4 sem)</span>
              <span>4 meses (16 sem)</span>
              <span>1 ano (52 sem)</span>
            </div>
          </div>

          {/* Target Adult Weight */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700">
                Peso Adulto Estimado (para calibrar o estirão)
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  max="90"
                  step="0.5"
                  value={adultTargetKg}
                  onChange={(e) => setAdultTargetKg(Number(e.target.value) || 1)}
                  className="w-20 px-2 py-1 border border-slate-200 rounded-lg text-right font-extrabold text-slate-900 text-sm"
                />
                <span className="font-extrabold text-slate-700">kg</span>
              </div>
            </div>
          </div>

          {/* Food Energy Density */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Densidade Calórica da Ração (kcal / 100g)</span>
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="250"
                  max="550"
                  step="5"
                  value={foodDensityKcal100g}
                  onChange={(e) => setFoodDensityKcal100g(Number(e.target.value) || 350)}
                  className="w-20 px-2 py-1 border border-slate-200 rounded-lg text-right font-extrabold text-slate-900 text-sm"
                />
                <span className="font-extrabold text-slate-700">kcal</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Importada do scanner ({activeFood.brandName})
            </p>
          </div>

          <button
            onClick={handleSaveToProfile}
            className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
              savedFeedback
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20 active:scale-98'
            }`}
          >
            {savedFeedback ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Peso e Parâmetros Salvos no Prontuário!</span>
              </>
            ) : (
              <>
                <span>Salvar este Peso no Prontuário de {activePuppy.name}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Results & Math Breakdown */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Resultado Clínico WSAVA
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {weightKg}kg • {ageWeeks}sem
              </span>
            </div>

            <div className="space-y-4">
              
              {/* MER Highlight */}
              <div>
                <div className="text-xs text-slate-400 font-semibold uppercase">
                  MER (Energia Diária de Crescimento)
                </div>
                <div className="text-4xl font-black text-amber-400 tracking-tight mt-0.5">
                  {mer} <span className="text-sm font-bold text-slate-300">kcal / dia</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  RER basal: {rer} kcal × Fator de crescimento {multiplier}
                </p>
              </div>

              {/* Grams Breakdown */}
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">Ração Diária Total</div>
                  <div className="text-2xl font-extrabold text-white">{dailyGrams} gramas</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-semibold uppercase">Fracionamento</div>
                  <div className="text-lg font-bold text-emerald-400">
                    {mealsCount}x de ~{gramsPerMeal}g
                  </div>
                </div>
              </div>

              {/* Water Requirement */}
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">Consumo Hídrico Estimado</div>
                  <div className="text-xl font-extrabold text-blue-400">{dailyWaterMl} ml / dia</div>
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  70 ml/kg
                </div>
              </div>

            </div>
          </div>

          {/* Official Formula Explanations */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/90 space-y-3 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>Entenda as Fórmulas Oficiais WSAVA:</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1 font-mono text-[11px]">
              <div className="text-amber-800 font-bold">RER = 70 × (Peso em kg)^0.75</div>
              <div className="text-slate-500">Energia gasta em repouso absoluto com temperatura amena.</div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1 font-mono text-[11px]">
              <div className="text-amber-800 font-bold">MER = RER × Fator Idade/Maturidade</div>
              <div className="text-slate-500">
                • Filhotes &lt; 4 meses: Fator 3.0<br />
                • Filhotes de 4 a 12 meses: Fator 2.0<br />
                • Acima de 80% do peso adulto: Fator 1.8
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
