import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Loader2, ChefHat } from 'lucide-react';
import { RecipeComponent, MealNutritionResult } from '../types';

interface GeminiChefProps {
  ingredients: RecipeComponent[];
  nutrition: MealNutritionResult;
}

const GeminiChef: React.FC<GeminiChefProps> = ({ ingredients, nutrition }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (ingredients.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API Key not found");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const ingredientsList = ingredients
        .map(i => `- ${i.name}: ${i.weightInRecipe}g`)
        .join('\n');
      
      const prompt = `
        I am cooking a dish with the following ingredients:
        ${ingredientsList}

        The calculated nutrition per 100g (cooked) is:
        - Calories: ${nutrition.caloriesPer100gAfter.toFixed(0)} kcal
        - Carbs: ${nutrition.carbsPer100gBefore.toFixed(1)}g (raw basis)
        - Protein: ${nutrition.proteinsPer100gBefore.toFixed(1)}g (raw basis)
        - Fat: ${nutrition.fatsPer100gBefore.toFixed(1)}g (raw basis)

        1. Guess what this dish might be (or similar to).
        2. Provide a 1-sentence comment on its nutritional balance (e.g. high protein, keto-friendly, etc).
        3. Suggest one spice or herb that would improve this specific combination.

        Keep the response concise and friendly.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setAnalysis(response.text || "Could not generate analysis.");
    } catch (err: any) {
      console.error(err);
      setError("Failed to connect to AI Chef. Please check API configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <ChefHat className="h-6 w-6" />
          <h2 className="text-lg font-bold">AI Chef Assistant</h2>
        </div>
        {!analysis && !loading && (
          <button
            onClick={handleAnalyze}
            disabled={ingredients.length === 0}
            className="flex items-center bg-white text-indigo-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Analyze Recipe
          </button>
        )}
      </div>

      {loading && (
        <div className="flex justify-center py-4">
          <Loader2 className="h-8 w-8 animate-spin text-white/80" />
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 p-3 rounded border border-red-300/30 text-sm">
          {error}
        </div>
      )}

      {analysis && (
        <div className="bg-white/10 backdrop-blur-sm rounded-md p-4 animate-fade-in">
          <div className="prose prose-invert prose-sm max-w-none">
            <p className="whitespace-pre-line leading-relaxed">{analysis}</p>
          </div>
          <button 
            onClick={() => setAnalysis(null)} 
            className="mt-4 text-xs text-white/70 hover:text-white underline"
          >
            Clear Analysis
          </button>
        </div>
      )}
    </div>
  );
};

export default GeminiChef;