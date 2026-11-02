import React, { useState } from 'react';
import { PuppyProfile, FoodLabelAnalysisResult } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ShieldAlert,
  ChevronDown,
  Minimize2
} from 'lucide-react';

interface PuppyCopilotProps {
  activePuppy: PuppyProfile;
  activeFood: FoodLabelAnalysisResult;
  onNavigateTab: (tab: string) => void;
  language: Language;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export const PuppyCopilot: React.FC<PuppyCopilotProps> = ({
  activePuppy,
  activeFood,
  onNavigateTab,
  language
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'm-1',
      sender: 'assistant',
      text:
        language === 'pt'
          ? `Olá! Sou o Puppy AI Copilot 🐾. Como posso ajudar com a nutrição WSAVA, rotina de alimentação ou cuidados de ${activePuppy.name}?`
          : `Hello! I'm your Puppy AI Copilot 🐾. How can I help you with ${activePuppy.name}'s WSAVA nutrition, meal routines, or care?`,
      time: 'Agora'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const t = TRANSLATIONS[language];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      if (lower.includes('água') || lower.includes('agua') || lower.includes('water')) {
        const ml = Math.round(activePuppy.weightKg * 70);
        reply =
          language === 'pt'
            ? `Pelas diretrizes clínicas da WSAVA, filhotes saudáveis necessitam de cerca de 70ml de água fresca por kg de peso corporal ao dia. Para ${activePuppy.name} (${activePuppy.weightKg}kg), a meta estimada é de aproximadamente ${ml}ml por dia, distribuída em tigelas limpas de inox ou cerâmica.`
            : `According to WSAVA clinical standards, healthy puppies need approximately 70ml of fresh water per kg of body weight daily. For ${activePuppy.name} (${activePuppy.weightKg}kg), that is roughly ${ml}ml/day in fresh, clean bowls.`;
      } else if (lower.includes('comer rápido') || lower.includes('rápido') || lower.includes('fast')) {
        reply =
          language === 'pt'
            ? `Comer vorazmente pode causar aerofagia, vômitos e gases em filhotes. Recomendo: 1) Utilizar comedouros lentos (slow feeders) tipo labirinto; 2) Fracionar a porção em tapetes de fuçar (snuffle mats); 3) Umedecer levemente os croquetes com água morna.`
            : `Eating too fast can cause aerophagia, vomiting, and bloating. Recommendations: 1) Use maze slow-feeder bowls; 2) Spread the kibble on snuffle mats; 3) Rehydrate the kibble lightly with warm water.`;
      } else if (lower.includes('tóxico') || lower.includes('toxico') || lower.includes('veneno') || lower.includes('toxic')) {
        reply =
          language === 'pt'
            ? `⚠️ Alimentos estritamente proibidos para filhotes: Chocolate, Cafeína, Cebola e Alho (causam anemia hemolítica), Uvas e Passas (insuficiência renal aguda), Xilitol (adoçante com risco de hipoglicemia fulminante), Macadâmia e Abacate. Em caso de ingestão acidental, procure um hospital veterinário imediatamente!`
            : `⚠️ Strictly prohibited foods for dogs: Chocolate, Caffeine, Onions & Garlic, Grapes & Raisins (acute kidney failure), Xylitol (artificial sweetener causing severe hypoglycemia), Macadamia nuts, and Avocado. If ingested, consult an emergency vet immediately!`;
      } else if (lower.includes('xixi') || lower.includes('potty') || lower.includes('banheiro')) {
        reply =
          language === 'pt'
            ? `Filhotes de ${activePuppy.ageWeeks} semanas têm pouca capacidade vesical. Leve ${activePuppy.name} ao tapete higiênico sempre: 1) Logo ao acordar; 2) 15 a 20 minutos após cada refeição; 3) Imediatamente após brincadeiras intensas. Recompense com festa e um grãozinho de ração quando acertar!`
            : `At ${activePuppy.ageWeeks} weeks old, bladder control is still developing. Take ${activePuppy.name} to the pee pad: 1) Right upon waking up; 2) 15-20 min after meals; 3) Right after active play. Always praise and reward with a kibble piece when successful!`;
      } else {
        reply =
          language === 'pt'
            ? `Com base no prontuário de ${activePuppy.name} (${activePuppy.breed}, ${activePuppy.ageWeeks} semanas, ${activePuppy.weightKg}kg) e na dieta atual (${activeFood.brandName}), o plano de alimentação prevê ${(activePuppy.weightKg * 70).toFixed(0)}ml de água e distribuição em refeições regulares. Se notar fezes amolecidas, vômito ou apatia, consulte seu veterinário!`
            : `Based on ${activePuppy.name}'s chart (${activePuppy.breed}, ${activePuppy.ageWeeks} weeks, ${activePuppy.weightKg}kg) and current diet (${activeFood.brandName}), daily hydration is ${(activePuppy.weightKg * 70).toFixed(0)}ml. Always follow WSAVA guidelines and reach out to your vet for sudden behavioral or digestive changes!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-' + Date.now(),
          sender: 'assistant',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 no-print copilot-widget">
      
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span>Puppy AI Copilot</span>
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
        </button>
      ) : (
        <div className="bg-white rounded-3xl w-[90vw] sm:w-[380px] h-[520px] max-h-[85vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Copilot Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm leading-tight">Puppy AI Copilot</h3>
                <p className="text-[10px] text-amber-100 font-medium">
                  {activePuppy.name} • {activePuppy.breed}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-amber-500 text-white font-medium rounded-br-xs'
                      : 'bg-slate-100 text-slate-800 rounded-bl-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className={`text-[9px] mt-1 block opacity-60 ${m.sender === 'user' ? 'text-right text-white' : 'text-slate-400'}`}>
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-slate-400 text-xs pl-8">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Quick suggestions pills */}
          <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none shrink-0">
            {t.copilot.quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[10px] font-semibold bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-700 px-2.5 py-1 rounded-full shrink-0 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.copilot.askPlaceholder}
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
