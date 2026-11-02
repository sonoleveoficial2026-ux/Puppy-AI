import React, { useState } from 'react';
import { PuppyProfile } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';
import {
  PawPrint,
  Utensils,
  ScanLine,
  Dna,
  Mic,
  Syringe,
  Calculator,
  LayoutDashboard,
  Sparkles,
  Globe,
  Plus,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

interface HeaderProps {
  activePuppy: PuppyProfile;
  puppies: PuppyProfile[];
  onSelectPuppy: (puppy: PuppyProfile) => void;
  onOpenNewPuppyModal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePuppy,
  puppies,
  onSelectPuppy,
  onOpenNewPuppyModal,
  activeTab,
  setActiveTab,
  language,
  onToggleLanguage
}) => {
  const [isPuppyMenuOpen, setIsPuppyMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: 'welcome', label: t.tabs.welcome, icon: Sparkles },
    { id: 'dashboard', label: t.tabs.dashboard, icon: LayoutDashboard },
    { id: 'meal-planner', label: t.tabs.mealPlanner, icon: Utensils },
    { id: 'food-scanner', label: t.tabs.foodScanner, icon: ScanLine },
    { id: 'breed-detector', label: t.tabs.breedDetector, icon: Dna },
    { id: 'bark-translator', label: t.tabs.barkTranslator, icon: Mic },
    { id: 'vaccines', label: t.tabs.vaccines, icon: Syringe },
    { id: 'wsava-calculator', label: t.tabs.wsava, icon: Calculator },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <PawPrint className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">Puppy<span className="text-amber-500">AI</span></span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">WSAVA</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block leading-none">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Puppy Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setIsPuppyMenuOpen(!isPuppyMenuOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 transition-all border border-slate-200 text-left text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            >
              <img
                src={activePuppy.avatarUrl || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=150&q=80'}
                alt={activePuppy.name}
                className="w-6 h-6 rounded-full object-cover border border-white shadow-xs"
              />
              <span className="max-w-[80px] sm:max-w-[120px] truncate">{activePuppy.name}</span>
              <span className="hidden md:inline-block text-[11px] font-normal text-slate-500">
                ({activePuppy.breed})
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isPuppyMenuOpen && (
              <div
                className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                onClick={() => setIsPuppyMenuOpen(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  {language === 'pt' ? 'Filhotes Cadastrados' : 'Registered Puppies'}
                </div>
                {puppies.map((pup) => (
                  <button
                    key={pup.id}
                    onClick={() => onSelectPuppy(pup)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left text-xs hover:bg-amber-50/70 transition-colors ${
                      pup.id === activePuppy.id ? 'bg-amber-50 font-bold text-amber-900 border-l-4 border-amber-500' : 'text-slate-700'
                    }`}
                  >
                    <img
                      src={pup.avatarUrl || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=100&q=80'}
                      alt={pup.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                    <div className="truncate flex-1">
                      <div className="font-semibold text-slate-800">{pup.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{pup.breed} • {pup.ageWeeks} sem • {pup.weightKg}kg</div>
                    </div>
                  </button>
                ))}
                <div className="pt-2 px-2 border-t border-slate-100">
                  <button
                    onClick={() => onOpenNewPuppyModal()}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {language === 'pt' ? 'Cadastrar Novo Filhote' : 'Register New Puppy'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Controls: Highlighted Language Switcher + Mobile Menu Button */}
          <div className="flex items-center gap-2">
            
            {/* Highlighted Bilingual Language Toggle */}
            <div className="bg-slate-100 p-0.5 rounded-xl border border-slate-200 flex items-center shadow-xs">
              <button
                onClick={() => onToggleLanguage('pt')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                  language === 'pt'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Mudar para Português"
              >
                <span>🇧🇷</span>
                <span className="hidden xs:inline">PT</span>
              </button>
              <button
                onClick={() => onToggleLanguage('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                  language === 'en'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to English"
              >
                <span>🇺🇸</span>
                <span className="hidden xs:inline">EN</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1.5 scrollbar-none border-t border-slate-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer / Dropdown Navigation */}
      {isMobileNavOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pb-1">
            {language === 'pt' ? 'Módulos da Aplicação' : 'Application Modules'}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileNavOpen(false);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-amber-500'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
