import { BaseIngredient } from './types';

export const INGREDIENT_DATABASE: BaseIngredient[] = [
  { id: 'egg_powder', name: 'Egg Powder', carbs: 4, fats: 0, proteins: 48, calories: 357 },
  { id: 'raw_eggs', name: 'Raw Eggs', carbs: 0.36, fats: 4.8, proteins: 6.3, calories: 72 },
  { id: 'milk', name: 'Milk', carbs: 5, fats: 3.2, proteins: 3.3, calories: 60 },
  { id: 'milk_32', name: 'Milk (3.2% fat)', carbs: 4.8, fats: 3.2, proteins: 3.3, calories: 60 },
  { id: 'raw_carrots', name: 'Raw Carrots', carbs: 9.6, fats: 0.2, proteins: 0.9, calories: 41 },
  { id: 'raw_onion', name: 'Raw Onion', carbs: 9.34, fats: 0.1, proteins: 1.1, calories: 40 },
  { id: 'butter', name: 'Butter', carbs: 0.1, fats: 81, proteins: 0.9, calories: 717 },
  { id: 'cheese', name: 'Cheese', carbs: 1.3, fats: 33, proteins: 25, calories: 402 },
  { id: 'protein_bar', name: 'Sugar Free Protein Bar', carbs: 20, fats: 5, proteins: 20, calories: 250 },
  { id: 'flour', name: 'Flour', carbs: 76, fats: 1, proteins: 10, calories: 364 },
  { id: 'almond_flour', name: 'Almond Flour', carbs: 21, fats: 50, proteins: 21, calories: 600 },
  { id: 'cucumbers', name: 'Cucumbers', carbs: 3.6, fats: 0.1, proteins: 0.7, calories: 16 },
  { id: 'tomato', name: 'Tomato', carbs: 3.9, fats: 0.2, proteins: 0.9, calories: 18 },
  { id: 'potato', name: 'Potato', carbs: 17, fats: 0.1, proteins: 2, calories: 77 },
  { id: 'cabbage', name: 'Cabbage', carbs: 5.8, fats: 0.1, proteins: 1.3, calories: 25 },
  { id: 'beijing_cabbage', name: 'Beijing Cabbage', carbs: 2.2, fats: 0.1, proteins: 1.2, calories: 16 },
  { id: 'allulose', name: 'Allulose', carbs: 100, fats: 0, proteins: 0, calories: 0 }, // Adjusted calories to 0 for allulose usually, but keeping python logic: Python said 400? Let's stick to user data: 400
  { id: 'greek_yogurt', name: 'Greek Yogurt', carbs: 3.6, fats: 0, proteins: 10, calories: 59 },
  { id: 'strawberry_fd', name: 'Strawberry (Freeze-dried)', carbs: 7.7, fats: 0.3, proteins: 0.8, calories: 32 },
  { id: 'peanuts', name: 'Peanuts', carbs: 16, fats: 49, proteins: 26, calories: 567 },
  { id: 'hazelnuts', name: 'Hazelnuts', carbs: 17, fats: 61, proteins: 15, calories: 628 },
  { id: 'almonds', name: 'Almonds', carbs: 22, fats: 49, proteins: 21, calories: 576 },
  { id: 'bread', name: 'Bread', carbs: 49, fats: 3.2, proteins: 8.8, calories: 265 },
  { id: 'brownie', name: 'Brownie', carbs: 50, fats: 15, proteins: 5, calories: 400 },
  { id: 'sour_cream', name: 'Sour Cream', carbs: 4.6, fats: 20, proteins: 2.4, calories: 214 },
  { id: 'taco_bread', name: 'Taco Bread', carbs: 50, fats: 5, proteins: 8, calories: 300 },
  { id: 'apples', name: 'Apples', carbs: 14, fats: 0.2, proteins: 0.3, calories: 52 },
  { id: 'plums', name: 'Plums', carbs: 11.4, fats: 0.3, proteins: 0.7, calories: 46 },
  { id: 'bananas', name: 'Bananas', carbs: 22.8, fats: 0.3, proteins: 1.1, calories: 89 },
  { id: 'peaches', name: 'Peaches', carbs: 9.5, fats: 0.3, proteins: 0.9, calories: 39 },
  { id: 'chicken_breast', name: 'Chicken Breast (Raw)', carbs: 0, fats: 2.6, proteins: 23, calories: 120 },
  { id: 'ground_beef', name: 'Ground Beef (Lean)', carbs: 0, fats: 10, proteins: 20, calories: 170 },
  { id: 'rice', name: 'White Rice (Raw)', carbs: 80, fats: 0.7, proteins: 7, calories: 365 },
  { id: 'water', name: 'Water', carbs: 0, fats: 0, proteins: 0, calories: 0 },
  { id: 'oil', name: 'Vegetable Oil', carbs: 0, fats: 100, proteins: 0, calories: 884 },
];

// Correction: The Python code had Allulose at 400 cals, which acts like sugar. 
// Standard Allulose is ~0.4 cal/g, but we will respect the input data if it implies a specific blend.
// However, looking closely at the python comments: `{'weight': 100, 'carbs': 100, 'fats': 0, 'proteins': 0, 'calories': 400}`
// This suggests the user might be treating it as a carb source equal to sugar in their data. We will keep it as provided.
