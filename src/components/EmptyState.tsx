
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
        icon: '🔍',
        title: 'Nenhuma tarefa encontrada',
        subtitle: 'Tente ajustar sua busca ou criar uma nova tarefa.',
      };
    }

    switch (filter) {
      case 'completed':
        return {
          icon: '✅',
          title: 'Nenhuma tarefa concluída ainda',
          subtitle: 'Continue trabalhando para completar suas tarefas!',
        };
      case 'pending':
        return {
          icon: '🎉',
          title: 'Parabéns! Todas as tarefas concluídas',
          subtitle: 'Você está em dia com todas as suas responsabilidades.',
        };
      default:
        return {
          icon: '📝',
          title: 'Sua lista está vazia',
          subtitle: 'Que tal começar adicionando sua primeira tarefa?',
        };
    }
  };

  const message = getEmptyMessage();

  return (
    <div className="text-center py-16 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
        <div className="text-6xl mb-4">{message.icon}</div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {message.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {message.subtitle}
        </p>
        
        {!hasSearchQuery && filter === 'all' && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p className="mb-2">💡 Dicas para começar:</p>
            <ul className="text-left space-y-1">
              <li>• Organize tarefas por prioridade</li>
              <li>• Use descrições claras e objetivas</li>
              <li>• Marque como concluída quando terminar</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
