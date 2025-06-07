
import React from 'react';
import { FilterType } from '../types/task';

interface EmptyStateProps {
  filter: FilterType;
  hasSearchQuery: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ filter, hasSearchQuery }) => {
  const getEmptyMessage = () => {
    if (hasSearchQuery) {
      return {
        emoji: '🔍',
        title: 'Nenhuma tarefa encontrada',
        subtitle: 'Tente ajustar sua busca ou criar uma nova tarefa.',
      };
    }

    switch (filter) {
      case 'completed':
        return {
          emoji: '🎯',
          title: 'Nenhuma tarefa concluída',
          subtitle: 'Continue trabalhando para completar suas metas!',
        };
      case 'pending':
        return {
          emoji: '🎉',
          title: 'Parabéns! Tudo feito!',
          subtitle: 'Você está em dia com todas as suas tarefas.',
        };
      default:
        return {
          emoji: '📝',
          title: 'Sua lista está vazia',
          subtitle: 'Que tal começar adicionando sua primeira tarefa?',
        };
    }
  };

  const message = getEmptyMessage();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 max-w-sm mx-auto text-center border border-gray-100 dark:border-gray-700">
        <div className="text-8xl mb-6 animate-bounce">{message.emoji}</div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
          {message.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          {message.subtitle}
        </p>
        
        {!hasSearchQuery && filter === 'all' && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              💡 Dicas para começar:
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Organize por prioridade
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                Use descrições claras
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Marque como concluída
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
