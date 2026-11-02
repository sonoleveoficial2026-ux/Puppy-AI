import React, { useState, useEffect } from 'react';
import { PuppyProfile, FoodLabelAnalysisResult, DailyMealSlot } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';
import { calculateWSAVAPlan } from '../utils/wsava';
import {
  Utensils,
  Download,
  Printer,
  CheckCircle2,
  Clock,
  Plus,
  RotateCcw,
  Sun,
  Sunset,
  Moon,
  Sparkles,
  Droplet,
  Info,
  ChevronRight,
  Flame,
  FileSpreadsheet
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MealPlannerProps {
  activePuppy: PuppyProfile;
  activeFood: FoodLabelAnalysisResult;
  language: Language;
  onNavigateToFoodScanner: () => void;
  onNavigateToWSAVACalculator: () => void;
}

export const MealPlanner: React.FC<MealPlannerProps> = ({
  activePuppy,
  activeFood,
  language,
  onNavigateToFoodScanner,
  onNavigateToWSAVACalculator
}) => {
  const t = TRANSLATIONS[language];
  const plan = calculateWSAVAPlan(activePuppy, activeFood.energyDensityKcal100g);

  // Generate initial meal slots based on WSAVA recommended count
  const createDefaultSlots = (): DailyMealSlot[] => {
    const totalGrams = plan.dailyGrams;
    const totalKcal = plan.merKcal;
    const count = plan.mealsCount;

    if (count === 4) {
      const gPer = Math.round(totalGrams / 4);
      const kPer = Math.round(totalKcal / 4);
      return [
        { id: '1', mealNumber: 1, label: language === 'pt' ? 'Café da Manhã (Desjejum)' : 'Breakfast (Morning)', timeString: '07:30', grams: gPer, caloriesKcal: kPer, completed: false, period: 'manha', notes: '' },
        { id: '2', mealNumber: 2, label: language === 'pt' ? 'Almoço (Meio-dia)' : 'Lunch (Midday)', timeString: '12:00', grams: gPer, caloriesKcal: kPer, completed: false, period: 'tarde', notes: '' },
        { id: '3', mealNumber: 3, label: language === 'pt' ? 'Lanche da Tarde' : 'Afternoon Meal', timeString: '16:30', grams: gPer, caloriesKcal: kPer, completed: false, period: 'tarde', notes: '' },
        { id: '4', mealNumber: 4, label: language === 'pt' ? 'Jantar da Noite' : 'Dinner (Night)', timeString: '20:30', grams: gPer, caloriesKcal: kPer, completed: false, period: 'noite', notes: '' },
      ];
    } else if (count === 3) {
      const gPer = Math.round(totalGrams / 3);
      const kPer = Math.round(totalKcal / 3);
      return [
        { id: '1', mealNumber: 1, label: language === 'pt' ? 'Manhã (Café da Manhã)' : 'Morning Meal', timeString: '08:00', grams: gPer, caloriesKcal: kPer, completed: false, period: 'manha', notes: '' },
        { id: '2', mealNumber: 2, label: language === 'pt' ? 'Tarde (Almoço)' : 'Afternoon Meal', timeString: '13:30', grams: gPer, caloriesKcal: kPer, completed: false, period: 'tarde', notes: '' },
        { id: '3', mealNumber: 3, label: language === 'pt' ? 'Noite (Jantar)' : 'Night Meal (Dinner)', timeString: '19:30', grams: gPer, caloriesKcal: kPer, completed: false, period: 'noite', notes: '' },
      ];
    } else {
      const gPer = Math.round(totalGrams / 2);
      const kPer = Math.round(totalKcal / 2);
      return [
        { id: '1', mealNumber: 1, label: language === 'pt' ? 'Manhã' : 'Morning Meal', timeString: '08:30', grams: gPer, caloriesKcal: kPer, completed: false, period: 'manha', notes: '' },
        { id: '2', mealNumber: 2, label: language === 'pt' ? 'Noite' : 'Night Meal', timeString: '19:30', grams: gPer, caloriesKcal: kPer, completed: false, period: 'noite', notes: '' },
      ];
    }
  };

  const [mealSlots, setMealSlots] = useState<DailyMealSlot[]>(() => {
    try {
      const saved = localStorage.getItem(`puppyai_meals_${activePuppy.id}`);
      return saved ? JSON.parse(saved) : createDefaultSlots();
    } catch {
      return createDefaultSlots();
    }
  });

  useEffect(() => {
    localStorage.setItem(`puppyai_meals_${activePuppy.id}`, JSON.stringify(mealSlots));
  }, [mealSlots, activePuppy.id]);

  // Recalculate if puppy or food changes
  const handleRecalculateWithWSAVA = () => {
    setMealSlots(createDefaultSlots());
  };

  const handleToggleMeal = (id: string) => {
    setMealSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === id) {
          const nextCompleted = !slot.completed;
          if (nextCompleted) {
            try {
              confetti({ particleCount: 40, spread: 45, origin: { y: 0.7 } });
            } catch {}
          }
          return { ...slot, completed: nextCompleted };
        }
        return slot;
      })
    );
  };

  const handleGramsChange = (id: string, grams: number) => {
    const kcalPerGram = activeFood.energyDensityKcal100g / 100;
    setMealSlots((prev) =>
      prev.map((slot) =>
        slot.id === id
          ? {
              ...slot,
              grams,
              caloriesKcal: Math.round(grams * kcalPerGram),
            }
          : slot
      )
    );
  };

  const handleNotesChange = (id: string, notes: string) => {
    setMealSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, notes } : slot))
    );
  };

  const handleTimeChange = (id: string, timeString: string) => {
    setMealSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, timeString } : slot))
    );
  };

  const handleResetDay = () => {
    setMealSlots((prev) => prev.map((slot) => ({ ...slot, completed: false })));
  };

  // Export to CSV Function
  const handleExportCSV = () => {
    const headers = [
      'Refeição',
      'Período',
      'Horário',
      'Porção (gramas)',
      'Calorias (kcal)',
      'Status',
      'Anotações do Tutor'
    ];

    const rows = mealSlots.map((slot) => [
      `"${slot.label}"`,
      `"${slot.period || 'Geral'}"`,
      `"${slot.timeString}"`,
      slot.grams,
      slot.caloriesKcal,
      slot.completed ? '"Oferecida"' : '"Pendente"',
      `"${(slot.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [
        `# Puppy AI - Planilha de Refeições Diárias`,
        `# Filhote: ${activePuppy.name} (${activePuppy.breed}) - Peso: ${activePuppy.weightKg}kg - Idade: ${activePuppy.ageWeeks} semanas`,
        `# Ração: ${activeFood.brandName} (${activeFood.energyDensityKcal100g} kcal/100g)`,
        `# Meta Diária MER WSAVA: ${plan.merKcal} kcal (${plan.dailyGrams}g/dia)`,
        headers.join(','),
        ...rows.map((r) => r.join(','))
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Plano_Refeicoes_${activePuppy.name.replace(/\s+/g, '_')}_WSAVA.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Fridge Sheet
  const handlePrintFridgeSheet = () => {
    window.print();
  };

  const completedMealsCount = mealSlots.filter((m) => m.completed).length;
  const currentTotalKcal = mealSlots.reduce((acc, m) => acc + m.caloriesKcal, 0);
  const currentTotalGrams = mealSlots.reduce((acc, m) => acc + m.grams, 0);

  // Group meals into Manhã, Tarde, Noite
  const morningMeals = mealSlots.filter((m) => m.period === 'manha');
  const afternoonMeals = mealSlots.filter((m) => m.period === 'tarde');
  const nightMeals = mealSlots.filter((m) => m.period === 'noite' || m.period === 'ceia' || !m.period);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-1.5">
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.mealPlanner.title}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'pt' ? `Distribuição de Refeições: ${activePuppy.name}` : `Meal Spreadsheet: ${activePuppy.name}`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t.mealPlanner.subtitle}
          </p>
        </div>

        {/* Buttons: Export CSV + Print Fridge Sheet */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-all active:scale-95"
            title="Baixar arquivo compatível com Excel e Google Planilhas"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>{t.mealPlanner.exportCsv}</span>
          </button>

          <button
            onClick={handlePrintFridgeSheet}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-extrabold shadow-md shadow-orange-500/20 transition-all active:scale-95"
            title="Imprimir folha pronta para afixar na geladeira com ímã"
          >
            <Printer className="w-4 h-4" />
            <span>{t.mealPlanner.printFridge}</span>
          </button>
        </div>
      </div>

      {/* Progress & Target Summary Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              {completedMealsCount}/{mealSlots.length}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Progresso do Dia</div>
              <div className="text-sm font-extrabold text-slate-900">
                {completedMealsCount} de {mealSlots.length} {t.mealPlanner.completedCount}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div>
              <span className="text-slate-400">Total Planejado: </span>
              <strong className="text-slate-900">{currentTotalGrams}g</strong> ({currentTotalKcal} kcal)
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div>
              <span className="text-slate-400">Alvo MER: </span>
              <strong className="text-amber-600">{plan.merKcal} kcal</strong> ({plan.dailyGrams}g)
            </div>
            <button
              onClick={handleResetDay}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title={t.mealPlanner.resetDay}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
            style={{
              width: `${(completedMealsCount / (mealSlots.length || 1)) * 100}%`,
            }}
          />
        </div>

        {/* Auto Re-balance reminder */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-500" />
            <span>
              {language === 'pt'
                ? `Fórmula ajustada para ${activePuppy.ageWeeks} semanas: fracionamento em ${plan.mealsCount} refeições diárias.`
                : `WSAVA schedule tuned for ${activePuppy.ageWeeks} weeks: fractionated into ${plan.mealsCount} daily meals.`}
            </span>
          </div>
          <button
            onClick={handleRecalculateWithWSAVA}
            className="text-[11px] font-bold text-amber-600 hover:text-amber-700 underline"
          >
            {language === 'pt' ? 'Recalcular padrão WSAVA' : 'Reset to WSAVA standard'}
          </button>
        </div>
      </div>

      {/* PRINT-ONLY FRIDGE SHEET TEMPLATE */}
      <div className="hidden print:block bg-white p-8 text-black space-y-6 border-4 border-slate-900 rounded-3xl">
        <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">
              🐾 PUPPY AI — FOLHA DE GELADEIRA
            </h1>
            <p className="text-sm font-bold text-slate-700">
              Rotina Alimentar & Cuidados Clínicos Diários
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black">{activePuppy.name}</div>
            <div className="text-xs font-semibold">{activePuppy.breed} • {activePuppy.ageWeeks} semanas • {activePuppy.weightKg} kg</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 border border-slate-300 p-4 rounded-xl text-center">
          <div>
            <div className="text-xs uppercase font-bold text-slate-500">Ração Diária Total</div>
            <div className="text-2xl font-black text-slate-900">{plan.dailyGrams} gramas</div>
          </div>
          <div>
            <div className="text-xs uppercase font-bold text-slate-500">Energia WSAVA (MER)</div>
            <div className="text-2xl font-black text-slate-900">{plan.merKcal} kcal</div>
          </div>
          <div>
            <div className="text-xs uppercase font-bold text-slate-500">Meta de Água Limpa</div>
            <div className="text-2xl font-black text-slate-900">{plan.dailyWaterMl} ml</div>
          </div>
        </div>

        <table className="w-full border-collapse border border-slate-400 text-sm">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-400">
              <th className="border border-slate-300 p-2 text-left">Período</th>
              <th className="border border-slate-300 p-2 text-left">Horário Previsto</th>
              <th className="border border-slate-300 p-2 text-center">Porção (g)</th>
              <th className="border border-slate-300 p-2 text-center">Calorias</th>
              <th className="border border-slate-300 p-2 text-center">Visto / Check [ ✔ ]</th>
            </tr>
          </thead>
          <tbody>
            {mealSlots.map((slot) => (
              <tr key={slot.id} className="border-b border-slate-300">
                <td className="border border-slate-300 p-3 font-bold">{slot.label}</td>
                <td className="border border-slate-300 p-3">{slot.timeString}</td>
                <td className="border border-slate-300 p-3 text-center font-extrabold">{slot.grams}g</td>
                <td className="border border-slate-300 p-3 text-center">{slot.caloriesKcal} kcal</td>
                <td className="border border-slate-300 p-3 text-center">
                  <div className="w-6 h-6 border-2 border-slate-800 rounded-sm mx-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border border-slate-300 p-4 rounded-xl space-y-2 text-xs">
          <div className="font-bold uppercase text-slate-800">Instruções para a Geladeira:</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Pesar as porções em balança culinária digital para precisão clínica.</li>
            <li>Trocar a água do bebedouro no mínimo 3 vezes ao dia (manhã, tarde e noite).</li>
            <li>Nunca oferecer chocolate, cebola, alho, uvas, passas ou xilitol.</li>
            <li>Contato do Tutor: <strong>{activePuppy.tutorName}</strong> | Emergência Veterinária: ___________________</li>
          </ul>
        </div>
      </div>

      {/* INTERACTIVE SPREADSHEET BY TIME PERIODS (MANHÃ / TARDE / NOITE) */}
      <div className="space-y-6 no-print">
        
        {/* SECTION: MANHÃ (Morning) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-900 text-base">
                  {t.mealPlanner.morning}
                </h2>
                <p className="text-xs text-slate-400">
                  {language === 'pt' ? 'Ativação metabólica e primeira carga energética do dia' : 'Morning metabolic boost and primary energy intake'}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
              {morningMeals.reduce((acc, m) => acc + m.grams, 0)}g • {morningMeals.reduce((acc, m) => acc + m.caloriesKcal, 0)} kcal
            </span>
          </div>

          <div className="space-y-3">
            {morningMeals.length === 0 ? (
              <p className="text-xs text-slate-400 py-2">Sem refeição programada para a manhã.</p>
            ) : (
              morningMeals.map((slot) => (
                <MealSlotRow
                  key={slot.id}
                  slot={slot}
                  onToggle={() => handleToggleMeal(slot.id)}
                  onGramsChange={(g) => handleGramsChange(slot.id, g)}
                  onTimeChange={(t) => handleTimeChange(slot.id, t)}
                  onNotesChange={(n) => handleNotesChange(slot.id, n)}
                  t={t}
                />
              ))
            )}
          </div>
        </div>

        {/* SECTION: TARDE (Afternoon) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-orange-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
                <Sunset className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-900 text-base">
                  {t.mealPlanner.afternoon}
                </h2>
                <p className="text-xs text-slate-400">
                  {language === 'pt' ? 'Sustentação glicêmica entre brincadeiras e cochilos' : 'Glycemic maintenance for play and growth'}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-orange-700 bg-orange-50 px-3 py-1 rounded-full">
              {afternoonMeals.reduce((acc, m) => acc + m.grams, 0)}g • {afternoonMeals.reduce((acc, m) => acc + m.caloriesKcal, 0)} kcal
            </span>
          </div>

          <div className="space-y-3">
            {afternoonMeals.length === 0 ? (
              <p className="text-xs text-slate-400 py-2">Sem refeição intermediária programada.</p>
            ) : (
              afternoonMeals.map((slot) => (
                <MealSlotRow
                  key={slot.id}
                  slot={slot}
                  onToggle={() => handleToggleMeal(slot.id)}
                  onGramsChange={(g) => handleGramsChange(slot.id, g)}
                  onTimeChange={(t) => handleTimeChange(slot.id, t)}
                  onNotesChange={(n) => handleNotesChange(slot.id, n)}
                  t={t}
                />
              ))
            )}
          </div>
        </div>

        {/* SECTION: NOITE (Night) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-900 text-base">
                  {t.mealPlanner.night}
                </h2>
                <p className="text-xs text-slate-400">
                  {language === 'pt' ? 'Digestão tranquila para uma noite serena sem hipoglicemia' : 'Peaceful digestion for a sound night sleep'}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
              {nightMeals.reduce((acc, m) => acc + m.grams, 0)}g • {nightMeals.reduce((acc, m) => acc + m.caloriesKcal, 0)} kcal
            </span>
          </div>

          <div className="space-y-3">
            {nightMeals.map((slot) => (
              <MealSlotRow
                key={slot.id}
                slot={slot}
                onToggle={() => handleToggleMeal(slot.id)}
                onGramsChange={(g) => handleGramsChange(slot.id, g)}
                onTimeChange={(t) => handleTimeChange(slot.id, t)}
                onNotesChange={(n) => handleNotesChange(slot.id, n)}
                t={t}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Clinical Guidance Footnote */}
      <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900 no-print">
        <div className="space-y-0.5">
          <strong className="font-bold">Regra de Ouro WSAVA:</strong>
          <p className="text-amber-800">
            A densidade energética atual é de <strong>{activeFood.energyDensityKcal100g} kcal por 100g</strong>. Se trocar a marca da ração, atualize no Scanner de Rótulo para calibrar as gramas automaticamente.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onNavigateToFoodScanner}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-colors"
          >
            Scanner de Rótulo
          </button>
          <button
            onClick={onNavigateToWSAVACalculator}
            className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 font-bold transition-colors"
          >
            Calculadora WSAVA
          </button>
        </div>
      </div>

    </div>
  );
};

interface MealSlotRowProps {
  slot: DailyMealSlot;
  onToggle: () => void;
  onGramsChange: (grams: number) => void;
  onTimeChange: (time: string) => void;
  onNotesChange: (notes: string) => void;
  t: any;
}

const MealSlotRow: React.FC<MealSlotRowProps> = ({
  slot,
  onToggle,
  onGramsChange,
  onTimeChange,
  onNotesChange,
  t
}) => {
  return (
    <div
      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        slot.completed
          ? 'bg-emerald-50/60 border-emerald-200 shadow-xs'
          : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="flex items-start sm:items-center gap-3">
        <button
          onClick={onToggle}
          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all ${
            slot.completed
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'border-2 border-slate-300 hover:border-amber-500 bg-white'
          }`}
          title={slot.completed ? t.mealPlanner.done : t.mealPlanner.markDone}
        >
          {slot.completed && <CheckCircle2 className="w-4 h-4" />}
        </button>

        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${slot.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
              {slot.label}
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200">
              <Clock className="w-3 h-3" />
              <input
                type="time"
                value={slot.timeString}
                onChange={(e) => onTimeChange(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-700 outline-none w-16"
              />
            </div>
          </div>

          <input
            type="text"
            value={slot.notes || ''}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder={t.mealPlanner.notesPlaceholder}
            className="text-xs text-slate-500 bg-transparent placeholder:text-slate-400 border-none p-0 focus:ring-0 w-full sm:w-80 truncate"
          />
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center">
        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          <input
            type="number"
            min="5"
            max="600"
            step="1"
            value={slot.grams}
            onChange={(e) => onGramsChange(Number(e.target.value) || 0)}
            className="w-14 text-center font-extrabold text-sm text-slate-900 bg-transparent outline-none"
          />
          <span className="text-xs font-semibold text-slate-400">g</span>
        </div>

        <div className="text-right min-w-[70px]">
          <span className="text-xs font-extrabold text-slate-800">{slot.caloriesKcal}</span>
          <span className="text-[10px] text-slate-400 block -mt-1">kcal</span>
        </div>

        <button
          onClick={onToggle}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            slot.completed
              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
              : 'bg-amber-500 text-white hover:bg-amber-600 shadow-xs'
          }`}
        >
          {slot.completed ? t.mealPlanner.done : t.mealPlanner.markDone}
        </button>
      </div>
    </div>
  );
};
