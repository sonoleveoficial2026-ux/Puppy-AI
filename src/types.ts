export interface PuppyProfile {
  id: string;
  name: string;
  breed: string;
  ageWeeks: number;
  weightKg: number;
  expectedAdultWeightKg?: number;
  gender: 'macho' | 'femea';
  avatarUrl?: string;
  microchipId?: string;
  tutorName: string;
}

export interface FoodLabelAnalysisResult {
  brandName: string;
  category: 'Super Premium' | 'Premium Especial' | 'Premium' | 'Econômica' | 'Alimentação Natural';
  targetLifeStage: string;
  energyDensityKcal100g: number;
  energyDensityKcalKg: number;
  guaranteedAnalysis: {
    crudeProteinPercent: number;
    crudeFatPercent: number;
    crudeFiberPercent: number;
    moisturePercent: number;
    calciumPercent: number;
    phosphorusPercent: number;
    dhaEpa?: string;
    chondroprotectors?: string;
  };
  firstIngredients: Array<{
    name: string;
    quality: 'excelente' | 'boa' | 'neutra' | 'atencao';
    note: string;
  }>;
  preservativesType: string;
  overallVerdict: string;
  strengths: string[];
  cautions: string[];
  scoreOutOf10: number;
}

export interface DailyMealSlot {
  id: string;
  mealNumber: number;
  label: string;
  timeString: string;
  grams: number;
  caloriesKcal: number;
  completed: boolean;
  notes?: string;
  period?: 'manha' | 'tarde' | 'noite' | 'ceia' | 'lanche';
  foodType?: string;
  waterMl?: number;
  daysActive?: string;
}

export interface VaccineRecord {
  id: string;
  name: string;
  description: string;
  targetWeek: number;
  dateAdministered?: string;
  veterinarian?: string;
  batchNumber?: string;
  status: 'concluida' | 'agendada' | 'atrasada' | 'futura';
  isCore: boolean;
}

export interface WSAVANutritionPlan {
  puppyWeightKg: number;
  puppyAgeWeeks: number;
  expectedAdultWeightKg: number;
  growthMultiplier: number;
  rerKcal: number;
  merKcal: number;
  foodDensityKcal100g: number;
  dailyGrams: number;
  dailyWaterMl: number;
  mealsCount: number;
  gramsPerMeal: number;
}

export interface BreedInfo {
  id: string;
  name: string;
  namePt: string;
  group: string;
  origin: string;
  adultWeightRangeKg: [number, number];
  lifeSpanYears: [number, number];
  energyLevel: 'baixa' | 'moderada' | 'alta' | 'muito alta';
  coatCare: 'baixo' | 'moderado' | 'alto';
  trainability: 'facil' | 'moderado' | 'desafiador';
  temperament: string[];
  nutritionNotes: string;
  healthPredispositions: string[];
  sampleImageUrl: string;
}

export interface BarkAnalysisResult {
  vocalizationType: string;
  vocalizationTypePt: string;
  primaryEmotion: string;
  confidencePercent: number;
  acousticFeatures: {
    pitch: 'alto' | 'medio' | 'baixo';
    tempo: 'rapido' | 'moderado' | 'lento';
    urgency: 'baixa' | 'moderada' | 'alta';
  };
  interpretation: string;
  recommendation: string;
  bodyLanguageSigns: string[];
}
