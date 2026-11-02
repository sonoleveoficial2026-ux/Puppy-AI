import React, { useState } from 'react';
import { PuppyProfile, FoodLabelAnalysisResult } from '../types';
import { PRESET_FOODS } from '../utils/initialData';
import { checkCalciumPhosphorusRatio } from '../utils/wsava';
import {
  ScanLine,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  Camera,
  FileText,
  Flame,
  Award,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FoodLabelScannerProps {
  activePuppy: PuppyProfile;
  currentFood: FoodLabelAnalysisResult;
  onApplyFoodToPuppyPlan: (food: FoodLabelAnalysisResult) => void;
}

export const FoodLabelScanner: React.FC<FoodLabelScannerProps> = ({
  activePuppy,
  currentFood,
  onApplyFoodToPuppyPlan
}) => {
  const [analyzedFood, setAnalyzedFood] = useState<FoodLabelAnalysisResult>(currentFood);
  const [isScanning, setIsScanning] = useState(false);
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [appliedFeedback, setAppliedFeedback] = useState(false);

  const caPRatio = checkCalciumPhosphorusRatio(
    analyzedFood.guaranteedAnalysis.calciumPercent,
    analyzedFood.guaranteedAnalysis.phosphorusPercent
  );

  const handleSelectPreset = (food: FoodLabelAnalysisResult, idx: number) => {
    setActivePresetIndex(idx);
    setIsScanning(true);
    setImagePreview(null);
    setTimeout(() => {
      setAnalyzedFood(food);
      setIsScanning(false);
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      setIsScanning(true);
      setTimeout(() => {
        // AI simulated smart label breakdown
        setAnalyzedFood({
          brandName: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Ração Escaneada via IA',
          category: 'Super Premium',
          targetLifeStage: `Filhotes em Crescimento (${activePuppy.breed})`,
          energyDensityKcal100g: 398,
          energyDensityKcalKg: 3980,
          guaranteedAnalysis: {
            crudeProteinPercent: 31.0,
            crudeFatPercent: 17.5,
            crudeFiberPercent: 2.8,
            moisturePercent: 9.0,
            calciumPercent: 1.25,
            phosphorusPercent: 1.0,
            dhaEpa: '0.18% DHA (Desenvolvimento cerebral e retina)',
            chondroprotectors: 'Glucosamina (550mg/kg) + Condroitina (120mg/kg)'
          },
          firstIngredients: [
            { name: 'Carne mecanicamente separada de frango', quality: 'excelente', note: 'Proteína fresca de alto valor biológico' },
            { name: 'Farinha de vísceras com baixo teor de cinzas', quality: 'excelente', note: 'Fonte concentrada de aminoácidos sulfurados' },
            { name: 'Quirera de arroz integral', quality: 'boa', note: 'Carboidrato de digestibilidade superior' },
            { name: 'Óleo de peixe purificado', quality: 'excelente', note: 'EPA/DHA anti-inflamatório e neuroprotetor' },
            { name: 'Polpa desidratada de beterraba', quality: 'boa', note: 'Fibra moderadamente fermentável para fezes firmes' }
          ],
          preservativesType: '100% Tocoferóis mistos naturais e extrato de alecrim',
          overallVerdict: 'Rótulo com excelente proporção de aminoácidos nobres, minerais estritamente compatíveis com as diretrizes WSAVA/FEDIAF para filhotes.',
          strengths: [
            'Relação Cálcio:Fósforo impecável (1.25:1)',
            'Sem BHA e BHT sintéticos',
            'Enriquecido com DHA para filhotes inteligentes',
            'Excelente densidade calórica (398 kcal/100g)'
          ],
          cautions: [
            'Requer dosagem precisa para evitar sobrepeso durante estirões de crescimento'
          ],
          scoreOutOf10: 9.6
        });
        setIsScanning(false);
      }, 1200);
    };
    reader.readAsDataURL(file);
  };

  const handleApply = () => {
    onApplyFoodToPuppyPlan(analyzedFood);
    setAppliedFeedback(true);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {}
    setTimeout(() => setAppliedFeedback(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-1.5">
          <ScanLine className="w-3.5 h-3.5 text-amber-600" />
          <span>Auditoria Nutricional com IA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Scanner de Rótulo de Ração (AI Food Label)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-2xl">
          Analise a tabela de garantia, relação Cálcio:Fósforo e primeiros ingredientes segundo os critérios da WSAVA e FEDIAF.
        </p>
      </div>

      {/* Input Options: Preset Selector & Photo Upload */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Presets Column */}
        <div className="md:col-span-7 bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Modelos de Rótulos Clínicos Disponíveis:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {PRESET_FOODS.map((food, idx) => (
              <button
                key={food.brandName}
                onClick={() => handleSelectPreset(food, idx)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  activePresetIndex === idx && !imagePreview
                    ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/20'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-amber-800">
                  {food.category}
                </span>
                <div className="font-extrabold text-xs text-slate-900 mt-1.5 line-clamp-2">
                  {food.brandName}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Nota {food.scoreOutOf10}/10
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Upload Column */}
        <div className="md:col-span-5 bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-center items-center text-center">
          <label className="w-full h-full border-2 border-dashed border-slate-300 hover:border-amber-400 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-amber-50/30">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              className="hidden"
            />
            {imagePreview ? (
              <div className="relative w-full h-24 overflow-hidden rounded-xl">
                <img
                  src={imagePreview}
                  alt="Rótulo carregado"
                  className="w-full h-full object-cover"
                />
                <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold">
                  Clique para trocar foto
                </span>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2">
                  <Camera className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-800">
                  Fotografar ou Enviar Imagem do Rótulo
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Foque na tabela de garantia e lista de ingredientes
                </p>
              </>
            )}
          </label>
        </div>

      </div>

      {/* Analysis Result Card */}
      {isScanning ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm space-y-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <h3 className="font-extrabold text-slate-800 text-base">
            Processando Níveis de Garantia & Relação Ca:P via IA...
          </h3>
          <p className="text-xs text-slate-400">
            Auditando digestibilidade de proteínas, fonte de conservantes e limites FEDIAF.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          
          {/* Header of analyzed food */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                  {analyzedFood.category}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {analyzedFood.energyDensityKcal100g} kcal/100g ({analyzedFood.energyDensityKcalKg} kcal/kg)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                {analyzedFood.brandName}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {analyzedFood.targetLifeStage}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-3xl font-black text-slate-900 leading-none">
                  {analyzedFood.scoreOutOf10}
                  <span className="text-xs font-bold text-slate-400">/10</span>
                </div>
                <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mt-1">
                  Nota Clínica
                </div>
              </div>

              <button
                onClick={handleApply}
                className={`px-4 py-3 rounded-2xl font-extrabold text-xs shadow-md transition-all flex items-center gap-2 ${
                  appliedFeedback
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-orange-500/20 active:scale-95'
                }`}
              >
                {appliedFeedback ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Ração Aplicada!</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-4 h-4" />
                    <span>Aplicar ao Plano de {activePuppy.name}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* CRITICAL WSAVA HIGHLIGHT: CALCIUM : PHOSPHORUS RATIO */}
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            caPRatio.status === 'ideal'
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
              : caPRatio.status === 'alerta'
              ? 'bg-amber-50/80 border-amber-200 text-amber-900'
              : 'bg-red-50/80 border-red-200 text-red-900'
          }`}>
            <div className="flex items-start sm:items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                caPRatio.status === 'ideal' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
              }`}>
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-sm flex items-center gap-2">
                  <span>Relação Cálcio : Fósforo — {caPRatio.ratio} : 1</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-black ${
                    caPRatio.status === 'ideal' ? 'bg-emerald-200 text-emerald-950' : 'bg-amber-200 text-amber-950'
                  }`}>
                    {caPRatio.status === 'ideal' ? 'Padrão Ouro WSAVA' : 'Atenção'}
                  </span>
                </div>
                <p className="text-xs opacity-90 mt-0.5">{caPRatio.message}</p>
              </div>
            </div>
            <div className="text-right text-xs shrink-0 font-medium">
              <div>Cálcio: <strong>{analyzedFood.guaranteedAnalysis.calciumPercent}%</strong></div>
              <div>Fósforo: <strong>{analyzedFood.guaranteedAnalysis.phosphorusPercent}%</strong></div>
            </div>
          </div>

          {/* Guaranteed Analysis Breakdown Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Níveis de Garantia Centesimal (Matéria Natural)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-center">
                <div className="text-[11px] font-semibold text-slate-400">Proteína Bruta</div>
                <div className="text-lg font-black text-slate-800">{analyzedFood.guaranteedAnalysis.crudeProteinPercent}%</div>
                <div className="text-[10px] text-emerald-600 font-bold">Mínimo</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-center">
                <div className="text-[11px] font-semibold text-slate-400">Gordura / Extrato</div>
                <div className="text-lg font-black text-slate-800">{analyzedFood.guaranteedAnalysis.crudeFatPercent}%</div>
                <div className="text-[10px] text-emerald-600 font-bold">Mínimo</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-center">
                <div className="text-[11px] font-semibold text-slate-400">Matéria Fibrosa</div>
                <div className="text-lg font-black text-slate-800">{analyzedFood.guaranteedAnalysis.crudeFiberPercent}%</div>
                <div className="text-[10px] text-slate-400 font-bold">Máximo</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-center">
                <div className="text-[11px] font-semibold text-slate-400">Umidade</div>
                <div className="text-lg font-black text-slate-800">{analyzedFood.guaranteedAnalysis.moisturePercent}%</div>
                <div className="text-[10px] text-slate-400 font-bold">Máximo</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-center">
                <div className="text-[11px] font-semibold text-slate-400">DHA & Ômega 3</div>
                <div className="text-xs font-black text-amber-700 mt-1 line-clamp-1">
                  {analyzedFood.guaranteedAnalysis.dhaEpa ? 'Presente' : 'Não const.'}
                </div>
                <div className="text-[10px] text-slate-400">Neuroprotetor</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-center">
                <div className="text-[11px] font-semibold text-slate-400">Condroprotetores</div>
                <div className="text-xs font-black text-amber-700 mt-1 line-clamp-1">
                  {analyzedFood.guaranteedAnalysis.chondroprotectors ? 'Sim' : 'Ausente'}
                </div>
                <div className="text-[10px] text-slate-400">Articulações</div>
              </div>

            </div>
          </div>

          {/* First Ingredients Audit */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Auditoria dos Primeiros Ingredientes (Por Ordem Decrescente de Peso)
            </h3>
            <div className="space-y-2">
              {analyzedFood.firstIngredients.map((item, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                      {i + 1}
                    </span>
                    <div>
                      <span className="font-bold text-slate-900">{item.name}</span>
                      <p className="text-[11px] text-slate-500">{item.note}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                    item.quality === 'excelente'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.quality === 'boa'
                      ? 'bg-blue-100 text-blue-800'
                      : item.quality === 'neutra'
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.quality}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Preservatives & Verdict */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
              <div className="text-xs font-bold uppercase text-slate-500">Conservação & Antioxidantes</div>
              <div className="text-xs font-semibold text-slate-800">{analyzedFood.preservativesType}</div>
              
              <div className="pt-2 border-t border-slate-200/60">
                <div className="text-xs font-bold uppercase text-emerald-700 mb-1">Pontos Fortes:</div>
                <ul className="space-y-1">
                  {analyzedFood.strengths.map((str, sIdx) => (
                    <li key={sIdx} className="text-xs text-slate-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
              <div className="text-xs font-bold uppercase text-slate-500">Veredito Clínico da IA</div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {analyzedFood.overallVerdict}
              </p>

              <div className="pt-2 border-t border-slate-200/60">
                <div className="text-xs font-bold uppercase text-amber-700 mb-1">Cuidados / Observações:</div>
                <ul className="space-y-1">
                  {analyzedFood.cautions.map((cau, cIdx) => (
                    <li key={cIdx} className="text-xs text-slate-600 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{cau}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
