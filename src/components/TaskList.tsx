
import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newText: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}) => {
  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <TaskItem
            task={task}
            onToggle={() => onToggleTask(task.id)}
            onDelete={() => onDeleteTask(task.id)}
            onEdit={(newText) => onEditTask(task.id, newText)}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
