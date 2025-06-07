
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit2, Trash2, Save, X } from 'lucide-react';
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

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getPriorityDot = () => {
    switch (task.priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`mx-4 mb-3 bg-white dark:bg-gray-800 rounded-2xl border-l-4 ${getPriorityColor()} shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700`}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center pt-1">
            <Checkbox
              checked={task.completed}
              onCheckedChange={onToggle}
              className="w-5 h-5 rounded-lg"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="h-12 rounded-xl border-2 border-blue-300 focus:border-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave();
                    if (e.key === 'Escape') handleCancel();
                  }}
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    size="sm"
                    className="flex-1 h-10 bg-green-600 hover:bg-green-700 text-white rounded-xl"
                  >
                    <Save size={16} className="mr-1" />
                    Salvar
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    size="sm"
                    className="flex-1 h-10 rounded-xl border-2"
                  >
                    <X size={16} className="mr-1" />
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getPriorityDot()}`}></div>
                  <p className={`text-base font-medium ${
                    task.completed 
                      ? 'line-through text-gray-500 dark:text-gray-400' 
                      : 'text-gray-900 dark:text-gray-100'
                  }`}>
                    {task.text}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(task.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20"
                    >
                      <Edit2 size={14} />
                    </Button>
                    <Button
                      onClick={onDelete}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
