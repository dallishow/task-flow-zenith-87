
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
    <div className="text-center mb-6 px-4">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          📱 Minhas Tarefas
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300">
          Organize sua vida com estilo
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {stats.total}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Total</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.completed}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Feitas</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {stats.pending}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Pendentes</div>
        </div>
      </div>

      {stats.total > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progresso geral</span>
            <span className="font-semibold">{Math.round(completionPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
