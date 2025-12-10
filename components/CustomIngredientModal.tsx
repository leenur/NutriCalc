import React, { useState } from 'react';
import { X, Save, PenTool } from 'lucide-react';
import { BaseIngredient } from '../types';

interface CustomIngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ingredient: BaseIngredient) => void;
}

const CustomIngredientModal: React.FC<CustomIngredientModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [proteins, setProteins] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new ingredient object
    const newIngredient: BaseIngredient = {
      id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: name.trim() || 'Custom Item',
      calories: parseFloat(calories) || 0,
      proteins: parseFloat(proteins) || 0,
      carbs: parseFloat(carbs) || 0,
      fats: parseFloat(fats) || 0,
    };

    onSave(newIngredient);
    
    // Reset and close
    setName('');
    setCalories('');
    setProteins('');
    setCarbs('');
    setFats('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <PenTool className="w-5 h-5 mr-2 text-indigo-600" />
            Add Custom Product
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-shadow outline-none"
              placeholder="e.g., My Secret Sauce"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             {/* Calories - Full Width on small grid */}
             <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Calories (kcal per 100g)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-shadow outline-none"
                    placeholder="0"
                  />
                  <span className="absolute right-3 top-2 text-xs text-gray-400 font-medium">kcal</span>
                </div>
             </div>
             
             {/* Macros */}
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Protein (g)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  required
                  value={proteins}
                  onChange={(e) => setProteins(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-shadow outline-none"
                  placeholder="0"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Carbs (g)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  required
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-shadow outline-none"
                  placeholder="0"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fats (g)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  required
                  value={fats}
                  onChange={(e) => setFats(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-shadow outline-none"
                  placeholder="0"
                />
             </div>
          </div>
          <p className="text-xs text-gray-500 italic text-center pt-2">Values should be per 100 grams of the raw product.</p>

          <div className="pt-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center shadow-sm transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Add to Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomIngredientModal;