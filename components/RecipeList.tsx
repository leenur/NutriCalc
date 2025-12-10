import React from 'react';
import { Trash2, TrendingUp } from 'lucide-react';
import { RecipeComponent } from '../types';

interface RecipeListProps {
  components: RecipeComponent[];
  onUpdateWeight: (id: string, weight: number) => void;
  onRemove: (id: string) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ components, onUpdateWeight, onRemove }) => {
  if (components.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
        <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No ingredients added</h3>
        <p className="mt-1 text-sm text-gray-500">Search and select ingredients to build your recipe.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden rounded-md">
      <ul className="divide-y divide-gray-200">
        {components.map((component) => (
          <li key={component.uniqueId} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition duration-150">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-indigo-600 truncate">{component.name}</h4>
                <div className="mt-1 flex text-xs text-gray-500 space-x-2">
                  <span>P: {component.proteins}g</span>
                  <span>C: {component.carbs}g</span>
                  <span>F: {component.fats}g</span>
                  <span>{component.calories} kcal (per 100g)</span>
                </div>
              </div>
              <div className="flex items-center ml-4 space-x-4">
                <div className="flex flex-col items-end">
                  <label htmlFor={`weight-${component.uniqueId}`} className="sr-only">Weight</label>
                  <div className="relative rounded-md shadow-sm w-28">
                    <input
                      type="number"
                      name={`weight-${component.uniqueId}`}
                      id={`weight-${component.uniqueId}`}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-8 sm:text-sm border-gray-300 rounded-md py-1.5 border"
                      placeholder="0"
                      value={component.weightInRecipe || ''}
                      onChange={(e) => onUpdateWeight(component.uniqueId, parseFloat(e.target.value) || 0)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-xs">g</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(component.uniqueId)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;