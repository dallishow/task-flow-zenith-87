
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import AddTask from '../components/AddTask';
import FilterBar from '../components/FilterBar';
import TaskList from '../components/TaskList';
import EmptyState from '../components/EmptyState';
import { Task, FilterType } from '../types/task';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('todo-tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string, priority: 'low' | 'medium' | 'high' = 'medium') => {
    const newTask: Task = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: new Date(),
      dueDate: null,
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const editTask = (id: string, newText: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, text: newText.trim() } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const getFilteredTasks = () => {
    let filtered = tasks;

    // Apply filter
    switch (filter) {
      case 'pending':
        filtered = filtered.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      default:
        break;
    }

    // Apply search
    if (searchQuery.trim()) {
      filtered = filtered.filter(task =>
        task.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTasks = getFilteredTasks();
  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header stats={stats} />
        
        <div className="space-y-6">
          <AddTask onAddTask={addTask} />
          
          <FilterBar
            currentFilter={filter}
            onFilterChange={setFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearCompleted={clearCompleted}
            hasCompletedTasks={stats.completed > 0}
          />

          {filteredTasks.length === 0 ? (
            <EmptyState filter={filter} hasSearchQuery={!!searchQuery.trim()} />
          ) : (
            <TaskList
              tasks={filteredTasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
