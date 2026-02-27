import React from 'react';
import type { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isOverdue = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    return dueDate < today && !task.paid;
  };

  const getDaysUntilDue = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = () => {
    if (task.paid) return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300';
    if (isOverdue()) return 'bg-gradient-to-r from-red-50 to-rose-50 border-red-300';
    if (getDaysUntilDue() <= 7) return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300';
    return 'bg-white border-gray-200';
  };

  const getCategoryIcon = () => {
    const icons: { [key: string]: string } = {
      'Bills': '💳',
      'Insurance': '🛡️',
      'Housing': '🏠',
      'Education': '📚',
    };
    return icons[task.category] || '📋';
  };

  return (
    <div className={`border-2 rounded-xl p-6 mb-4 transition-all hover:shadow-xl ${getStatusColor()} shadow-md`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{getCategoryIcon()}</span>
            <h3 className={`text-xl font-bold ${task.paid ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
          </div>
          
          {task.description && (
            <p className="text-gray-600 text-sm mb-3 pl-11 leading-relaxed">{task.description}</p>
          )}
          
          <div className="flex flex-wrap gap-4 text-sm pl-11">
            <span className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-gray-200">
              <span className="font-semibold text-gray-700">📅</span>
              <span className={isOverdue() && !task.paid ? 'text-red-600 font-bold' : 'text-gray-700 font-medium'}>
                {formatDate(task.dueDate)}
              </span>
              {!task.paid && getDaysUntilDue() >= 0 && getDaysUntilDue() <= 7 && (
                <span className="text-amber-600 font-semibold">({getDaysUntilDue()}d left)</span>
              )}
            </span>
            
            <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-xs font-bold uppercase tracking-wide shadow-sm">
              {task.category}
            </span>
            
            {task.amount && (
              <span className="flex items-center gap-1 px-3 py-1 bg-white rounded-lg border border-gray-200">
                <span className="text-green-600 font-bold text-lg">💵</span>
                <span className="text-gray-800 font-bold">${task.amount.toFixed(2)}</span>
              </span>
            )}
            
            {task.recurring && (
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-xs font-bold uppercase tracking-wide shadow-sm">
                🔁 Recurring
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <button
            onClick={() => task.id && onToggle(task.id)}
            className={`px-5 py-2.5 rounded-lg font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
              task.paid
                ? 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
            }`}
          >
            {task.paid ? '↺ Undo' : '✓ Mark Paid'}
          </button>
          
          <button
            onClick={() => onEdit(task)}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            ✏️ Edit
          </button>
          
          <button
            onClick={() => task.id && onDelete(task.id)}
            className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
