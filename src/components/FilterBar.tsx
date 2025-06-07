
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trash2 } from 'lucide-react';
import { FilterType } from '../types/task';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearCompleted: () => void;
  hasCompletedTasks: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onClearCompleted,
  hasCompletedTasks,
}) => {
  const filterButtons = [
    { key: 'all' as FilterType, label: 'Todas', emoji: '📋' },
    { key: 'pending' as FilterType, label: 'Pendentes', emoji: '⏳' },
    { key: 'completed' as FilterType, label: 'Feitas', emoji: '✅' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-4 mx-4 mb-6 border border-gray-100 dark:border-gray-700">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Buscar tarefas..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-12 pl-12 pr-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filterButtons.map((button) => (
            <Button
              key={button.key}
              variant={currentFilter === button.key ? "default" : "outline"}
              onClick={() => onFilterChange(button.key)}
              className={`flex-1 min-w-[100px] h-12 rounded-2xl font-medium transition-all duration-200 ${
                currentFilter === button.key
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
              }`}
            >
              <span className="mr-2">{button.emoji}</span>
              {button.label}
            </Button>
          ))}
        </div>
        
        {hasCompletedTasks && (
          <Button
            variant="outline"
            onClick={onClearCompleted}
            className="w-full h-12 rounded-2xl border-2 border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 transition-all duration-200"
          >
            <Trash2 size={18} className="mr-2" />
            Limpar Concluídas
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
