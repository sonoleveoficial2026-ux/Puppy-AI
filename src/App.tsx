import React, { useState, useEffect } from 'react';
import { PuppyProfile, FoodLabelAnalysisResult, VaccineRecord } from './types';
import { SAMPLE_PUPPIES, PRESET_FOODS, INITIAL_VACCINES } from './utils/initialData';
import { Language, TRANSLATIONS } from './utils/translations';
import { Header } from './components/Header';
import { SmartQuickActions } from './components/SmartQuickActions';
import { PuppyCopilot } from './components/PuppyCopilot';
import { WelcomeOnboarding } from './components/WelcomeOnboarding';
import { Dashboard } from './components/Dashboard';
import { FoodLabelScanner } from './components/FoodLabelScanner';
import { BreedDetector } from './components/BreedDetector';
import { MealPlanner } from './components/MealPlanner';
import { BarkTranslator } from './components/BarkTranslator';
import { VaccinePassport } from './components/VaccinePassport';
import { WSAVACalculator } from './components/WSAVACalculator';
import { PuppyModal } from './components/PuppyModal';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('puppyai_language');
      return (saved === 'en' || saved === 'pt') ? saved : 'pt';
    } catch {
      return 'pt';
    }
  });

  const handleToggleLanguage = (newLang: Language) => {
    setLanguage(newLang);
    try {
      localStorage.setItem('puppyai_language', newLang);
    } catch {}
  };

  const [puppies, setPuppies] = useState<PuppyProfile[]>(() => {
    try {
      const saved = localStorage.getItem('puppyai_profiles');
      return saved ? JSON.parse(saved) : SAMPLE_PUPPIES;
    } catch {
      return SAMPLE_PUPPIES;
    }
  });

  const [activePuppyId, setActivePuppyId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('puppyai_active_id');
      return saved || puppies[0]?.id || SAMPLE_PUPPIES[0].id;
    } catch {
      return SAMPLE_PUPPIES[0].id;
    }
  });

  const [activeFood, setActiveFood] = useState<FoodLabelAnalysisResult>(() => {
    try {
      const saved = localStorage.getItem('puppyai_active_food');
      return saved ? JSON.parse(saved) : PRESET_FOODS[0];
    } catch {
      return PRESET_FOODS[0];
    }
  });

  const [vaccines, setVaccines] = useState<VaccineRecord[]>(() => {
    try {
      const saved = localStorage.getItem('puppyai_vaccines');
      return saved ? JSON.parse(saved) : INITIAL_VACCINES;
    } catch {
      return INITIAL_VACCINES;
    }
  });

  const [activeTab, setActiveTab] = useState<string>('welcome');
  const [isPuppyModalOpen, setIsPuppyModalOpen] = useState(false);
  const [editingPuppy, setEditingPuppy] = useState<PuppyProfile | null>(null);

  useEffect(() => {
    localStorage.setItem('puppyai_profiles', JSON.stringify(puppies));
  }, [puppies]);

  useEffect(() => {
    localStorage.setItem('puppyai_active_id', activePuppyId);
  }, [activePuppyId]);

  useEffect(() => {
    localStorage.setItem('puppyai_active_food', JSON.stringify(activeFood));
  }, [activeFood]);

  useEffect(() => {
    localStorage.setItem('puppyai_vaccines', JSON.stringify(vaccines));
  }, [vaccines]);

  const activePuppy =
    puppies.find((p) => p.id === activePuppyId) || puppies[0] || SAMPLE_PUPPIES[0];

  const handleSelectPuppy = (puppy: PuppyProfile) => setActivePuppyId(puppy.id);

  const handleSavePuppy = (savedPup: PuppyProfile) => {
    setPuppies((prev) => {
      const exists = prev.some((p) => p.id === savedPup.id);
      if (exists) return prev.map((p) => (p.id === savedPup.id ? savedPup : p));
      return [savedPup, ...prev];
    });
    setActivePuppyId(savedPup.id);
    setEditingPuppy(null);
  };

  const handleOnboardingComplete = (pup: PuppyProfile) => {
    handleSavePuppy(pup);
    setActiveTab('dashboard');
  };

  const handleUpdatePuppy = (updated: PuppyProfile) => {
    setPuppies((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleUpdatePuppyWeight = (weightKg: number, expectedAdultKg?: number) => {
    handleUpdatePuppy({
      ...activePuppy,
      weightKg,
      expectedAdultWeightKg: expectedAdultKg ?? activePuppy.expectedAdultWeightKg,
    });
  };

  const handleApplyFoodToPuppyPlan = (food: FoodLabelAnalysisResult) => {
    setActiveFood(food);
    setActiveTab('meal-planner');
  };

  const handleUpdateVaccine = (updated: VaccineRecord) => {
    setVaccines((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
  };

  const handleAddVaccine = (newVac: VaccineRecord) => {
    setVaccines((prev) => [...prev, newVac]);
  };

  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col text-slate-800">
      <Header
        activePuppy={activePuppy}
        puppies={puppies}
        onSelectPuppy={handleSelectPuppy}
        onOpenNewPuppyModal={() => setActiveTab('welcome')}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-2.5 sm:px-6 lg:px-8 py-3 sm:py-5">
        {activeTab !== 'welcome' && (
          <SmartQuickActions
            activePuppy={activePuppy}
            activeFood={activeFood}
            vaccines={vaccines}
            onNavigateTab={setActiveTab}
            onQuickAddWater={() => {}}
            onQuickMarkMeal={() => setActiveTab('meal-planner')}
            language={language}
          />
        )}

        {activeTab === 'welcome' && (
          <WelcomeOnboarding
            onComplete={handleOnboardingComplete}
            onSkip={() => setActiveTab('dashboard')}
            existingPuppy={activePuppy}
            language={language}
            onToggleLanguage={handleToggleLanguage}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            activePuppy={activePuppy}
            activeFood={activeFood}
            vaccines={vaccines}
            onNavigateTab={setActiveTab}
            onEditProfile={() => {
              setEditingPuppy(activePuppy);
              setIsPuppyModalOpen(true);
            }}
          />
        )}

        {activeTab === 'food-scanner' && (
          <FoodLabelScanner
            activePuppy={activePuppy}
            currentFood={activeFood}
            onApplyFoodToPuppyPlan={handleApplyFoodToPuppyPlan}
          />
        )}

        {activeTab === 'breed-detector' && (
          <BreedDetector
            activePuppy={activePuppy}
            onUpdatePuppy={handleUpdatePuppy}
          />
        )}

        {activeTab === 'meal-planner' && (
          <MealPlanner
            activePuppy={activePuppy}
            activeFood={activeFood}
            language={language}
            onNavigateToFoodScanner={() => setActiveTab('food-scanner')}
            onNavigateToWSAVACalculator={() => setActiveTab('wsava-calculator')}
          />
        )}

        {activeTab === 'bark-translator' && (
          <BarkTranslator activePuppy={activePuppy} />
        )}

        {activeTab === 'vaccines' && (
          <VaccinePassport
            activePuppy={activePuppy}
            vaccines={vaccines}
            onUpdateVaccine={handleUpdateVaccine}
            onAddVaccine={handleAddVaccine}
          />
        )}

        {activeTab === 'wsava-calculator' && (
          <WSAVACalculator
            activePuppy={activePuppy}
            activeFood={activeFood}
            onUpdatePuppyWeight={handleUpdatePuppyWeight}
          />
        )}
      </main>

      <PuppyCopilot
        activePuppy={activePuppy}
        activeFood={activeFood}
        onNavigateTab={setActiveTab}
        language={language}
      />

      <PuppyModal
        isOpen={isPuppyModalOpen}
        onClose={() => {
          setIsPuppyModalOpen(false);
          setEditingPuppy(null);
        }}
        onSave={handleSavePuppy}
        editingPuppy={editingPuppy}
      />

      <footer className="bg-white border-t border-slate-200/80 py-8 mt-12 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-base">🐾</span>
            <span className="font-extrabold text-slate-900">Puppy AI</span>
            <span>—</span>
            <span>{language === 'en' ? 'Agile Clinical Nutrition & Canine Care' : 'Inteligência Nutricional & Clínica Canina Ágil'}</span>
          </div>
          <p className="max-w-2xl mx-auto text-[11px] text-slate-400 font-medium leading-relaxed">
            {t.footerDisclaimer}
          </p>
        </div>
      </footer>
    </div>
  );
}
