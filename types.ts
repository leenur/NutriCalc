export interface NutritionalValues {
  carbs: number;
  fats: number;
  proteins: number;
  calories: number;
}

// Represents a base ingredient from the database (values per 100g)
export interface BaseIngredient extends NutritionalValues {
  name: string;
  id: string;
}

// Represents an ingredient added to the recipe with a specific weight
export interface RecipeComponent extends BaseIngredient {
  uniqueId: string; // unique ID for list rendering (handling duplicates)
  weightInRecipe: number; // The actual weight used in the recipe
}

export interface MealNutritionResult {
  totalRawWeight: number;
  carbsPer100gBefore: number;
  fatsPer100gBefore: number;
  proteinsPer100gBefore: number;
  caloriesPer100gBefore: number;
  waterPer100gBefore: number;
  caloriesPer100gAfter: number;
  weightRatio: number;
  totalCaloriesInPot: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill: string;
}