
import React from 'react';

interface HeaderProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
}

const Header: React.FC<HeaderProps> = ({ stats }) => {
  const completionPercentage = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
        Lista de Tarefas
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Organize sua vida, uma tarefa de cada vez
      </p>
      
      <div className="flex justify-center items-center space-x-8 text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {stats.total}
          </div>
          <div className="text-gray-500 dark:text-gray-400">Total</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.completed}
          </div>
          <div className="text-gray-500 dark:text-gray-400">Concluídas</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {stats.pending}
          </div>
          <div className="text-gray-500 dark:text-gray-400">Pendentes</div>
        </div>
      </div>

      {stats.total > 0 && (
        <div className="mt-4 max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span>Progresso</span>
            <span>{Math.round(completionPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
