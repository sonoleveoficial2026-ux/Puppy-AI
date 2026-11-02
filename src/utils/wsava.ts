import { PuppyProfile, WSAVANutritionPlan } from '../types';

export function calculateRER(weightKg: number): number {
  if (weightKg <= 0) return 0;
  return Math.round(70 * Math.pow(weightKg, 0.75));
}

export function getGrowthMultiplier(ageWeeks: number, weightKg: number, expectedAdultWeightKg?: number): number {
  if (expectedAdultWeightKg && weightKg >= expectedAdultWeightKg * 0.8) {
    return 1.8;
  }
  if (ageWeeks < 16) {
    return 3.0; // Filhotes < 4 meses
  } else if (ageWeeks < 52) {
    return 2.0; // Filhotes de 4 a 12 meses
  } else {
    return 1.8;
  }
}

export function getRecommendedMealsCount(ageWeeks: number): number {
  if (ageWeeks < 12) return 4;
  if (ageWeeks <= 26) return 3;
  return 2;
}

export function calculateWSAVAPlan(
  profile: PuppyProfile,
  foodDensityKcal100g: number = 390
): WSAVANutritionPlan {
  const rer = calculateRER(profile.weightKg);
  const multiplier = getGrowthMultiplier(
    profile.ageWeeks,
    profile.weightKg,
    profile.expectedAdultWeightKg
  );
  const mer = Math.round(rer * multiplier);
  const dailyGrams = Math.round((mer / foodDensityKcal100g) * 100);
  const dailyWaterMl = Math.round(profile.weightKg * 70);
  const mealsCount = getRecommendedMealsCount(profile.ageWeeks);
  const gramsPerMeal = Math.round(dailyGrams / mealsCount);

  return {
    puppyWeightKg: profile.weightKg,
    puppyAgeWeeks: profile.ageWeeks,
    expectedAdultWeightKg: profile.expectedAdultWeightKg || profile.weightKg * 2,
    growthMultiplier: multiplier,
    rerKcal: rer,
    merKcal: mer,
    foodDensityKcal100g,
    dailyGrams,
    dailyWaterMl,
    mealsCount,
    gramsPerMeal,
  };
}

export function checkCalciumPhosphorusRatio(caPercent: number, pPercent: number) {
  if (pPercent <= 0) return { ratio: 0, status: 'alerta' as const, message: 'Fósforo não informado' };
  const ratio = Number((caPercent / pPercent).toFixed(2));
  if (ratio >= 1.1 && ratio <= 1.45) {
    return { ratio, status: 'ideal' as const, message: `Relação Ca:P ideal (${ratio}:1). Perfeito para o desenvolvimento ósseo e articular.` };
  } else if (ratio >= 1.0 && ratio <= 1.6) {
    return { ratio, status: 'alerta' as const, message: `Relação Ca:P aceitável (${ratio}:1). Seguro, mas monitore o crescimento.` };
  } else {
    return { ratio, status: 'perigo' as const, message: `Atenção: Relação Ca:P fora do padrão seguro da WSAVA/FEDIAF (${ratio}:1). Risco de displasia ou raquitismo.` };
  }
}
