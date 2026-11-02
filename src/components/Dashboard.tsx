import React from 'react';
import { PuppyProfile, FoodLabelAnalysisResult, VaccineRecord } from '../types';
import { calculateWSAVAPlan, checkCalciumPhosphorusRatio } from '../utils/wsava';
import {
  Flame,
  Scale,
  Droplet,
  Utensils,
  Syringe,
  Sparkles,
  ScanLine,
  Dna,
  Mic,
  Calculator,
  AlertTriangle,
  CheckCircle2,
  Edit3,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface DashboardProps {
  activePuppy: PuppyProfile;
  activeFood: FoodLabelAnalysisResult;
  vaccines: VaccineRecord[];
  onNavigateTab: (tab: string) => void;
  onEditProfile: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  activePuppy,
  activeFood,
  vaccines,
  onNavigateTab,
  onEditProfile
}) => {
  const plan = calculateWSAVAPlan(activePuppy, activeFood.energyDensityKcal100g);
  const caPRatio = checkCalciumPhosphorusRatio(
    activeFood.guaranteedAnalysis.calciumPercent,
    activeFood.guaranteedAnalysis.phosphorusPercent
  );

  const completedVaccines = vaccines.filter((v) => v.status === 'concluida');
  const pendingVaccines = vaccines.filter(
    (v) => v.status === 'agendada' || v.status === 'atrasada'
  );

  return (
    <div className="space-y-6 pb-12">
      
      {/* Puppy Hero Profile Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-400/10 via-orange-400/5 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={activePuppy.avatarUrl || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&q=80'}
              alt={activePuppy.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-amber-100 shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {activePuppy.name}
                </h1>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  activePuppy.gender === 'macho' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                }`}>
                  {activePuppy.gender === 'macho' ? 'Macho ♂' : 'Fêmea ♀'}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-600">
                {activePuppy.breed} • <span className="text-amber-600 font-bold">{activePuppy.ageWeeks} semanas de vida</span>
              </p>
              <p className="text-xs text-slate-400">
                Tutor(a): {activePuppy.tutorName} {activePuppy.microchipId ? `• Chip: ${activePuppy.microchipId}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onEditProfile}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar Cadastro</span>
            </button>
            <button
              onClick={() => onNavigateTab('meal-planner')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-extrabold shadow-md shadow-orange-500/20 transition-all"
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Ver Refeições</span>
            </button>
          </div>
        </div>
      </div>

      {/* Clinical WSAVA 4-Key Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* RER & MER */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Energia WSAVA</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {plan.merKcal} <span className="text-xs font-bold text-slate-400">kcal/dia</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            RER basal: <strong className="text-slate-700">{plan.rerKcal} kcal</strong> (Fator ×{plan.growthMultiplier})
          </p>
        </div>

        {/* Recommended Daily Food Grams */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Gramas / Dia</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {plan.dailyGrams} <span className="text-xs font-bold text-slate-400">g/dia</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {plan.mealsCount}x ao dia (~{plan.gramsPerMeal}g por porção)
          </p>
        </div>

        {/* Daily Hydration Goal */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Meta Hídrica</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Droplet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 tracking-tight">
            {plan.dailyWaterMl} <span className="text-xs font-bold text-slate-400">ml/dia</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Base: 70ml por kg corporal ({activePuppy.weightKg} kg)
          </p>
        </div>

        {/* Vaccine Status */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Vacinação</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Syringe className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tracking-tight">
            {completedVaccines.length} / {vaccines.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {pendingVaccines.length > 0 ? (
              <span className="text-amber-600 font-bold">{pendingVaccines.length} dose(s) a aplicar</span>
            ) : (
              <span className="text-emerald-600 font-bold">Protocolo em dia</span>
            )}
          </p>
        </div>

      </div>

      {/* Main Grid: Active Diet + Vaccine Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Active Diet Overview Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-amber-500" />
              <h2 className="font-extrabold text-slate-900 text-base sm:text-lg">
                Dieta e Ração em Uso
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('food-scanner')}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors"
            >
              <span>Escanear Novo Rótulo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {activeFood.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {activeFood.brandName}
                </h3>
                <p className="text-xs text-slate-500">{activeFood.targetLifeStage}</p>
              </div>
              <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4">
                <span className="text-2xl font-black text-slate-900">{activeFood.scoreOutOf10}</span>
                <span className="text-xs text-slate-400">/10</span>
                <div className="text-[10px] font-bold text-emerald-600">Nota Nutricional</div>
              </div>
            </div>

            {/* Mineral Ca:P Banner */}
            <div className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
              caPRatio.status === 'ideal'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}>
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <div>
                <span className="font-bold">Relação Cálcio : Fósforo ({caPRatio.ratio}:1)</span>
                <p className="text-[11px] opacity-90">{caPRatio.message}</p>
              </div>
            </div>

            {/* Key Nutrient percentages */}
            <div className="grid grid-cols-4 gap-2 text-center pt-1">
              <div className="bg-white p-2 rounded-xl border border-slate-200/70">
                <div className="text-xs text-slate-400 font-semibold">Proteína</div>
                <div className="text-sm font-extrabold text-slate-800">{activeFood.guaranteedAnalysis.crudeProteinPercent}%</div>
              </div>
              <div className="bg-white p-2 rounded-xl border border-slate-200/70">
                <div className="text-xs text-slate-400 font-semibold">Gordura</div>
                <div className="text-sm font-extrabold text-slate-800">{activeFood.guaranteedAnalysis.crudeFatPercent}%</div>
              </div>
              <div className="bg-white p-2 rounded-xl border border-slate-200/70">
                <div className="text-xs text-slate-400 font-semibold">Cálcio</div>
                <div className="text-sm font-extrabold text-slate-800">{activeFood.guaranteedAnalysis.calciumPercent}%</div>
              </div>
              <div className="bg-white p-2 rounded-xl border border-slate-200/70">
                <div className="text-xs text-slate-400 font-semibold">Fósforo</div>
                <div className="text-sm font-extrabold text-slate-800">{activeFood.guaranteedAnalysis.phosphorusPercent}%</div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onNavigateTab('meal-planner')}
              className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors"
            >
              <span>Abrir Planilha de Refeições do Dia</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Vaccines Timeline Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <Syringe className="w-5 h-5 text-emerald-600" />
                <h2 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Passaporte Vacinal
                </h2>
              </div>
              <button
                onClick={() => onNavigateTab('vaccines')}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <span>Ver Carteira Completa</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {vaccines.slice(0, 4).map((vac) => (
                <div
                  key={vac.id}
                  className={`p-3 rounded-2xl border transition-all flex items-start justify-between gap-2 ${
                    vac.status === 'concluida'
                      ? 'bg-emerald-50/60 border-emerald-100 text-slate-800'
                      : vac.status === 'agendada'
                      ? 'bg-amber-50/60 border-amber-200 text-slate-800'
                      : 'bg-slate-50 border-slate-100 text-slate-600'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-900">{vac.name}</span>
                      {vac.isCore && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700">
                          Core
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Alvo: {vac.targetWeek} semanas {vac.dateAdministered ? `• Aplicada em ${vac.dateAdministered}` : ''}
                    </p>
                  </div>

                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                    vac.status === 'concluida'
                      ? 'bg-emerald-100 text-emerald-800'
                      : vac.status === 'agendada'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {vac.status === 'concluida' ? 'Concluída' : vac.status === 'agendada' ? 'Agendada' : 'Futura'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('vaccines')}
            className="w-full py-2.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Gerenciar Doses & Certificados</span>
          </button>
        </div>

      </div>

      {/* Quick Access Tools Feature Grid */}
      <div className="space-y-3">
        <h2 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Módulos de Inteligência Canina Puppy AI</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div
            onClick={() => onNavigateTab('food-scanner')}
            className="group bg-white p-5 rounded-3xl border border-slate-200/90 hover:border-amber-400 hover:shadow-md cursor-pointer transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ScanLine className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-900">Scanner de Rótulo IA</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Auditoria de ingredientes, conservantes e relação Cálcio:Fósforo em segundos.
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('breed-detector')}
            className="group bg-white p-5 rounded-3xl border border-slate-200/90 hover:border-purple-400 hover:shadow-md cursor-pointer transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Dna className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-purple-900">Detector de Raça</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Identificação fenotípica, guia de cuidados, peso adulto e riscos genéticos.
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('bark-translator')}
            className="group bg-white p-5 rounded-3xl border border-slate-200/90 hover:border-rose-400 hover:shadow-md cursor-pointer transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-rose-900">Tradutor de Latidos</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Decodifique choro, euforia, ansiedade de separação e solicitações de brincadeira.
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('wsava-calculator')}
            className="group bg-white p-5 rounded-3xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-900">Calculadora WSAVA</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Fórmulas de RER e MER clínicas para recalibrar a curva de crescimento do seu cão.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
