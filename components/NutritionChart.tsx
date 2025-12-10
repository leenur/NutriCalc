import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { MealNutritionResult, ChartDataPoint } from '../types';

interface NutritionChartProps {
  data: MealNutritionResult;
}

const NutritionChart: React.FC<NutritionChartProps> = ({ data }) => {
  const chartData: ChartDataPoint[] = [
    { name: 'Carbs', value: data.carbsPer100gBefore, fill: '#3b82f6' }, // blue-500
    { name: 'Fats', value: data.fatsPer100gBefore, fill: '#10b981' }, // green-500
    { name: 'Proteins', value: data.proteinsPer100gBefore, fill: '#ef4444' }, // red-500
    { name: 'Water', value: data.waterPer100gBefore, fill: '#06b6d4' }, // cyan-500
  ];

  const calorieData = [
    { name: 'Cals (Raw)', value: data.caloriesPer100gBefore, fill: '#a855f7' }, // purple-500
    { name: 'Cals (Cooked)', value: data.caloriesPer100gAfter, fill: '#f97316' }, // orange-500
  ];

  if (data.totalRawWeight === 0) return null;

  return (
    <div className="space-y-8">
      <div className="h-64 w-full bg-white p-4 rounded-lg shadow border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">Macronutrients & Water (g per 100g Raw)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              cursor={{ fill: '#f3f4f6' }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="h-64 w-full bg-white p-4 rounded-lg shadow border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">Calorie Density (kcal per 100g)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={calorieData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
             <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
            <Tooltip
               contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
               cursor={{ fill: '#f3f4f6' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
              {calorieData.map((entry, index) => (
                <Cell key={`cell-c-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NutritionChart;