import React, { useState, useMemo } from 'react';
import { BaseIngredient, RecipeComponent } from './types';
import { calculateMealNutrition, formatNumber } from './utils/nutritionLogic';
import IngredientSelector from './components/IngredientSelector';
import RecipeList from './components/RecipeList';
import NutritionChart from './components/NutritionChart';
import { Calculator, Flame, Droplets, Utensils } from 'lucide-react';

const App: React.FC = () => {
  const [components, setComponents] = useState<RecipeComponent[]>([]);
  const [cookedWeight, setCookedWeight] = useState<string>(''); // Using string for better input handling

  const addIngredient = (ingredient: BaseIngredient, weight: number = 100) => {
    const newComponent: RecipeComponent = {
      ...ingredient,
      uniqueId: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      weightInRecipe: weight,
    };
    setComponents((prev) => [...prev, newComponent]);
  };

  const updateWeight = (id: string, weight: number) => {
    setComponents((prev) =>
      prev.map((c) => (c.uniqueId === id ? { ...c, weightInRecipe: weight } : c))
    );
  };

  const removeIngredient = (id: string) => {
    setComponents((prev) => prev.filter((c) => c.uniqueId !== id));
  };

  const nutrition = useMemo(() => {
    const weightNum = parseFloat(cookedWeight);
    return calculateMealNutrition(components, isNaN(weightNum) ? 0 : weightNum);
  }, [components, cookedWeight]);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">NutriCalc Pro</h1>
          </div>
          <div className="text-sm text-gray-500 hidden sm:block">
            Advanced Recipe Analysis
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: BUILDER */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Search and Add */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Utensils className="w-5 h-5 mr-2 text-indigo-500" />
                Ingredients
              </h2>
              <div className="space-y-4">
                <IngredientSelector onAdd={addIngredient} />
                <RecipeList 
                  components={components} 
                  onUpdateWeight={updateWeight} 
                  onRemove={removeIngredient} 
                />
              </div>
            </div>

            {/* Total Weight Input */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
               <div>
                  <h2 className="text-lg font-semibold text-gray-800">Final Dish Weight</h2>
                  <p className="text-sm text-gray-500">Enter the weight after cooking to calculate water loss/gain.</p>
               </div>
               <div className="flex items-center">
                 <input
                   type="number"
                   value={cookedWeight}
                   onChange={(e) => setCookedWeight(e.target.value)}
                   placeholder={nutrition.totalRawWeight.toFixed(0)}
                   className="block w-32 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg p-2 border"
                 />
                 <span className="ml-2 text-gray-600 font-medium">g</span>
               </div>
            </div>

          </div>

          {/* RIGHT COLUMN: RESULTS */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Main Stats Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <Flame className="w-5 h-5 mr-2 text-orange-500" />
                Nutrition Summary
              </h2>
              
              <div className="space-y-6">
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <span className="block text-sm font-medium text-indigo-600 uppercase tracking-wider">Calories (Cooked)</span>
                  <span className="block text-4xl font-extrabold text-indigo-900 mt-1">
                    {formatNumber(nutrition.caloriesPer100gAfter)}
                  </span>
                  <span className="text-sm text-indigo-700">kcal / 100g</span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                   <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-xs text-blue-600 font-semibold uppercase">Carbs</div>
                      <div className="text-xl font-bold text-blue-900">{formatNumber(nutrition.carbsPer100gBefore)}g</div>
                      <div className="text-[10px] text-blue-400">Raw/100g</div>
                   </div>
                   <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-xs text-green-600 font-semibold uppercase">Fat</div>
                      <div className="text-xl font-bold text-green-900">{formatNumber(nutrition.fatsPer100gBefore)}g</div>
                      <div className="text-[10px] text-green-400">Raw/100g</div>
                   </div>
                   <div className="p-3 bg-red-50 rounded-lg">
                      <div className="text-xs text-red-600 font-semibold uppercase">Protein</div>
                      <div className="text-xl font-bold text-red-900">{formatNumber(nutrition.proteinsPer100gBefore)}g</div>
                      <div className="text-[10px] text-red-400">Raw/100g</div>
                   </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                    <span className="flex items-center"><Droplets className="w-4 h-4 mr-1 text-cyan-500" /> Water Content</span>
                    <span>{formatNumber(nutrition.waterPer100gBefore)}g / 100g</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Total Raw Weight</span>
                    <span>{nutrition.totalRawWeight.toFixed(0)}g</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                    <span>Weight Ratio</span>
                    <span className={`${nutrition.weightRatio < 1 ? 'text-orange-500' : 'text-green-500'} font-medium`}>
                      {nutrition.weightRatio.toFixed(2)}x
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                    <span>Total Pot Calories</span>
                    <span className="font-bold">{nutrition.totalCaloriesInPot.toFixed(0)} kcal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <NutritionChart data={nutrition} />

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;