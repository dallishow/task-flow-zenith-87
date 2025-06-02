
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddTaskProps {
  onAddTask: (text: string, priority: 'low' | 'medium' | 'high') => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText, priority);
      setTaskText('');
      setPriority('medium');
    }
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getPriorityLabel = (p: string) => {
    switch (p) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'Média';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Digite uma nova tarefa..."
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              className="w-full text-lg"
            />
          </div>
          
          <div className="w-full sm:w-40">
            <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low" className={getPriorityColor('low')}>
                  🟢 Baixa
                </SelectItem>
                <SelectItem value="medium" className={getPriorityColor('medium')}>
                  🟡 Média
                </SelectItem>
                <SelectItem value="high" className={getPriorityColor('high')}>
                  🔴 Alta
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="submit" 
            disabled={!taskText.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            Adicionar
          </Button>
        </div>
        
        {priority && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Prioridade selecionada: 
            <span className={`ml-1 font-medium ${getPriorityColor(priority)}`}>
              {getPriorityLabel(priority)}
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddTask;
