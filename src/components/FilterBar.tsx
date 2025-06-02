
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    { key: 'all' as FilterType, label: 'Todas', icon: '📋' },
    { key: 'pending' as FilterType, label: 'Pendentes', icon: '⏳' },
    { key: 'completed' as FilterType, label: 'Concluídas', icon: '✅' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <Input
            type="text"
            placeholder="Buscar tarefas..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        
        {hasCompletedTasks && (
          <Button
            variant="outline"
            onClick={onClearCompleted}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            🗑️ Limpar Concluídas
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filterButtons.map((button) => (
          <Button
            key={button.key}
            variant={currentFilter === button.key ? "default" : "outline"}
            onClick={() => onFilterChange(button.key)}
            className={`flex items-center gap-2 ${
              currentFilter === button.key
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <span>{button.icon}</span>
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
