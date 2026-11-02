import React, { useState, useEffect } from 'react';
import { PuppyProfile, BarkAnalysisResult } from '../types';
import { BARK_PRESETS } from '../utils/initialData';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Heart,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Radio,
  Play
} from 'lucide-react';

interface BarkTranslatorProps {
  activePuppy: PuppyProfile;
}

export const BarkTranslator: React.FC<BarkTranslatorProps> = ({ activePuppy }) => {
  const [selectedBark, setSelectedBark] = useState<BarkAnalysisResult>(BARK_PRESETS[0]);
  const [isListening, setIsListening] = useState(false);
  const [audioWaveAnimation, setAudioWaveAnimation] = useState<number[]>([20, 45, 80, 50, 30, 90, 60, 40]);

  useEffect(() => {
    let interval: any;
    if (isListening) {
      interval = setInterval(() => {
        setAudioWaveAnimation(
          Array.from({ length: 12 }, () => Math.floor(15 + Math.random() * 85))
        );
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const handleToggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      // Simulate 3 seconds recording then picking a sound
      setTimeout(() => {
        setIsListening(false);
        const randomBark = BARK_PRESETS[Math.floor(Math.random() * BARK_PRESETS.length)];
        setSelectedBark(randomBark);
      }, 3000);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold uppercase tracking-wider mb-1.5">
          <Mic className="w-3.5 h-3.5 text-rose-600" />
          <span>Bioacústica e Emoção Canina</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Tradutor de Latidos & Vocalizações
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-2xl">
          Decodifique a frequência acústica, cadência e linguagem corporal de {activePuppy.name} para responder com carinho e assertividade.
        </p>
      </div>

      {/* Recording Microphone Simulation Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm text-center relative overflow-hidden">
        
        {isListening ? (
          <div className="space-y-5">
            <div className="w-20 h-20 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto animate-pulse shadow-lg shadow-rose-500/30">
              <Radio className="w-10 h-10 animate-spin" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">
                Ouvindo vocalização de {activePuppy.name}...
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Captando harmônicos e cadência sonora em tempo real
              </p>
            </div>

            {/* Audio Wave Bars */}
            <div className="flex items-center justify-center gap-1.5 h-14">
              {audioWaveAnimation.map((height, idx) => (
                <div
                  key={idx}
                  className="w-2.5 bg-rose-500 rounded-full transition-all duration-150"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            <button
              onClick={handleToggleListening}
              className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
            >
              Cancelar Escuta
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={handleToggleListening}
              className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-rose-500/30 transition-transform active:scale-95 group"
            >
              <Mic className="w-8 h-8 group-hover:scale-110 transition-transform" />
            </button>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Toque para Escutar o Filhote
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Aproxime o microfone quando ele latir, choramingar ou uivar
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Preset selector bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Ou selecione uma vocalização comum para decodificar agora:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {BARK_PRESETS.map((bark, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedBark(bark)}
              className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                selectedBark.vocalizationType === bark.vocalizationType
                  ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-300/20 shadow-xs'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="w-7 h-7 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                <Play className="w-3.5 h-3.5 fill-current" />
              </div>
              <div className="truncate">
                <div className="font-extrabold text-xs text-slate-900 truncate">
                  {bark.vocalizationTypePt}
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                  {bark.primaryEmotion}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Decoded Report Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        
        {/* Header of the vocalization */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
                Vocalização Identificada
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Precisão Bioacústica: {selectedBark.confidencePercent}%
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {selectedBark.vocalizationTypePt}
            </h2>
            <p className="text-xs font-bold text-rose-600 mt-0.5">
              Estado Emocional: {selectedBark.primaryEmotion}
            </p>
          </div>

          {/* Acoustic parameters chips */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-center">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Frequência</div>
              <div className="text-xs font-extrabold text-slate-800 capitalize">{selectedBark.acousticFeatures.pitch}</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-center">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Cadência</div>
              <div className="text-xs font-extrabold text-slate-800 capitalize">{selectedBark.acousticFeatures.tempo}</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-center">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Urgência</div>
              <div className="text-xs font-extrabold text-rose-700 capitalize">{selectedBark.acousticFeatures.urgency}</div>
            </div>
          </div>
        </div>

        {/* Translation breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800 uppercase">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>O Que o Filhote Quer Dizer</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              "{selectedBark.interpretation}"
            </p>
          </div>

          <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-900 uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Ação Recomendada para o Tutor</span>
            </div>
            <p className="text-xs text-emerald-950 leading-relaxed font-medium">
              {selectedBark.recommendation}
            </p>
          </div>

        </div>

        {/* Body Language Clues */}
        <div className="space-y-2.5 pt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Sinais Corporais de Apoio (Observe {activePuppy.name} Agora):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {selectedBark.bodyLanguageSigns.map((sign, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 flex items-start gap-2"
              >
                <span className="text-rose-500 font-bold">•</span>
                <span>{sign}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
