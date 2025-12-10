import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Plus, X, PenTool } from 'lucide-react';
import { INGREDIENT_DATABASE } from '../constants';
import { BaseIngredient } from '../types';
import CustomIngredientModal from './CustomIngredientModal';

interface IngredientSelectorProps {
  onAdd: (ingredient: BaseIngredient, weight: number) => void;
}

const IngredientSelector: React.FC<IngredientSelectorProps> = ({ onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIng, setSelectedIng] = useState<BaseIngredient | null>(null);
  const [weight, setWeight] = useState<string>('100');
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const weightInputRef = useRef<HTMLInputElement>(null);

  const filteredIngredients = useMemo(() => {
    return INGREDIENT_DATABASE.filter((ing) =>
      ing.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // Auto-focus weight input when an ingredient is selected
  useEffect(() => {
    if (selectedIng && weightInputRef.current) {
      weightInputRef.current.focus();
      weightInputRef.current.select();
    }
  }, [selectedIng]);

  const handleSelect = (ing: BaseIngredient) => {
    setSelectedIng(ing);
    setSearchTerm('');
    setIsOpen(false);
    setWeight('100');
  };

  const handleConfirm = () => {
    if (selectedIng) {
      const w = parseFloat(weight);
      if (!isNaN(w) && w > 0) {
        onAdd(selectedIng, w);
        setSelectedIng(null); // Reset selection
      }
    }
  };

  const handleCustomIngredientSave = (customIng: BaseIngredient) => {
    // When a custom ingredient is created, add it immediately with default 100g.
    // The user can edit the weight in the list.
    onAdd(customIng, 100);
    setIsCustomModalOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm();
    } else if (e.key === 'Escape') {
      setSelectedIng(null);
    }
  };

  return (
    <div className="relative w-full z-10" ref={wrapperRef}>
      {!selectedIng ? (
        <div className="flex gap-2">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="Search ingredient..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
            />

            {isOpen && searchTerm.length > 0 && (
              <div className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm z-50">
                {filteredIngredients.length === 0 ? (
                  <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                    No ingredients found.
                  </div>
                ) : (
                  filteredIngredients.map((ing) => (
                    <div
                      key={ing.id}
                      className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50 transition-colors"
                      onClick={() => handleSelect(ing)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900 block truncate">
                          {ing.name}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {ing.calories} kcal/100g
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Custom Button */}
          <button
            onClick={() => setIsCustomModalOpen(true)}
            className="flex items-center justify-center px-4 py-2 border border-indigo-200 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 hover:border-indigo-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
            title="Create Custom Ingredient"
          >
            <PenTool className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline text-sm font-medium">Custom</span>
          </button>

          {/* Modal */}
          <CustomIngredientModal 
            isOpen={isCustomModalOpen} 
            onClose={() => setIsCustomModalOpen(false)} 
            onSave={handleCustomIngredientSave} 
          />
        </div>
      ) : (
        <div className="flex items-center justify-between p-2 bg-indigo-50 border border-indigo-200 rounded-lg shadow-sm animate-fade-in">
           <div className="flex items-center space-x-3 overflow-hidden px-2">
               <span className="font-medium text-indigo-900 truncate">{selectedIng.name}</span>
           </div>
           
           <div className="flex items-center space-x-2 shrink-0">
               <div className="relative">
                   <input
                       ref={weightInputRef}
                       type="number"
                       value={weight}
                       onChange={(e) => setWeight(e.target.value)}
                       onKeyDown={handleKeyDown}
                       className="w-28 pl-3 pr-8 py-1.5 text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 border shadow-sm"
                       placeholder="100"
                   />
                   <span className="absolute right-2 top-1.5 text-xs text-gray-500">g</span>
               </div>
               
               <button onClick={handleConfirm} className="p-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow-sm transition-colors" title="Add">
                   <Plus className="w-4 h-4" />
               </button>
               <button onClick={() => setSelectedIng(null)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors" title="Cancel">
                   <X className="w-4 h-4" />
               </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default IngredientSelector;