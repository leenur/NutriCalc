import { RecipeComponent, MealNutritionResult } from '../types';

export const calculateMealNutrition = (
  components: RecipeComponent[],
  weightAfterCooking: number
): MealNutritionResult => {
  const totalWeightBefore = components.reduce((sum, c) => sum + c.weightInRecipe, 0);

  // Avoid division by zero
  if (totalWeightBefore === 0) {
    return {
      totalRawWeight: 0,
      carbsPer100gBefore: 0,
      fatsPer100gBefore: 0,
      proteinsPer100gBefore: 0,
      caloriesPer100gBefore: 0,
      waterPer100gBefore: 0,
      caloriesPer100gAfter: 0,
      weightRatio: 0,
      totalCaloriesInPot: 0
    };
  }

  // Calculate total nutrients in the pot (not per 100g yet)
  const totalCarbs = components.reduce((sum, c) => sum + (c.carbs * c.weightInRecipe) / 100, 0);
  const totalFats = components.reduce((sum, c) => sum + (c.fats * c.weightInRecipe) / 100, 0);
  const totalProteins = components.reduce((sum, c) => sum + (c.proteins * c.weightInRecipe) / 100, 0);
  const totalCalories = components.reduce((sum, c) => sum + (c.calories * c.weightInRecipe) / 100, 0);

  // Calculate water content (Logic from Python: Total Weight - Sum of Macros)
  // Note: This is an approximation used in the Python script.
  const totalNutritionalWeight = totalCarbs + totalFats + totalProteins;
  const totalWater = totalWeightBefore - totalNutritionalWeight;

  // Calculate per 100 grams BEFORE cooking
  const carbsPer100gBefore = (totalCarbs / totalWeightBefore) * 100;
  const fatsPer100gBefore = (totalFats / totalWeightBefore) * 100;
  const proteinsPer100gBefore = (totalProteins / totalWeightBefore) * 100;
  const caloriesPer100gBefore = (totalCalories / totalWeightBefore) * 100;
  const waterPer100gBefore = (totalWater / totalWeightBefore) * 100;

  // Calculate ratio
  // If weightAfterCooking is not provided or 0, we assume raw weight (no cooking loss/gain)
  const effectiveCookedWeight = weightAfterCooking > 0 ? weightAfterCooking : totalWeightBefore;
  const weightRatio = effectiveCookedWeight / totalWeightBefore;

  // Calculate per 100 grams AFTER cooking
  const caloriesPer100gAfter = caloriesPer100gBefore / weightRatio;

  return {
    totalRawWeight: totalWeightBefore,
    carbsPer100gBefore,
    fatsPer100gBefore,
    proteinsPer100gBefore,
    caloriesPer100gBefore,
    waterPer100gBefore,
    caloriesPer100gAfter,
    weightRatio,
    totalCaloriesInPot: totalCalories
  };
};

export const formatNumber = (num: number) => num.toFixed(1);
