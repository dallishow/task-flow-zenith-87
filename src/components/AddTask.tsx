
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 mx-4 mb-6 border border-gray-100 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <Input
            type="text"
            placeholder="O que precisa ser feito? 🚀"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className="h-14 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 px-4"
          />
          
          <div className="flex gap-3">
            <div className="flex-1">
              <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
                <SelectTrigger className="h-12 rounded-2xl border-2 border-gray-200 dark:border-gray-600">
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low" className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Baixa</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium" className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span>Média</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="high" className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Alta</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              type="submit" 
              disabled={!taskText.trim()}
              className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Plus size={20} />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
