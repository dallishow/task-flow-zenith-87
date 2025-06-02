
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (newText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSaveEdit = () => {
    if (editText.trim() && editText !== task.text) {
      onEdit(editText);
    }
    setIsEditing(false);
    setEditText(task.text);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(task.text);
  };

  const getPriorityStyles = () => {
    switch (task.priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low':
        return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      default:
        return 'border-l-gray-500 bg-gray-50 dark:bg-gray-800';
    }
  };

  const getPriorityIcon = () => {
    switch (task.priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`
        border-l-4 rounded-lg shadow-sm p-4 transition-all duration-200 hover:shadow-md
        ${getPriorityStyles()}
        ${task.completed ? 'opacity-75' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex items-center pt-1">
          <Checkbox
            checked={task.completed}
            onCheckedChange={onToggle}
            className="w-5 h-5"
          />
        </div>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit();
                  if (e.key === 'Escape') handleCancelEdit();
                }}
                className="w-full"
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSaveEdit}
                  disabled={!editText.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Salvar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancelEdit}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{getPriorityIcon()}</span>
                <p
                  className={`text-lg ${
                    task.completed
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {task.text}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Criada em {formatDate(task.createdAt)}
                </span>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditing(true)}
                    disabled={task.completed}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    ✏️ Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={onDelete}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    🗑️ Excluir
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
