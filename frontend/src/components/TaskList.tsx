import React, { useState, useEffect } from 'react';
import type { Task } from '../types/Task';
import { taskApi } from '../services/taskApi';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'unpaid'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskApi.getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Make sure the backend is running on http://localhost:8080');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (id: number) => {
    try {
      await taskApi.toggleTaskCompletion(id);
      await fetchTasks();
    } catch (err) {
      setError('Failed to update task');
      console.error('Error toggling task:', err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskApi.deleteTask(id);
        await fetchTasks();
      } catch (err) {
        setError('Failed to delete task');
        console.error('Error deleting task:', err);
      }
    }
  };

  const handleSubmitTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      if (editingTask && editingTask.id) {
        await taskApi.updateTask(editingTask.id, taskData);
      } else {
        await taskApi.createTask(taskData);
      }
      await fetchTasks();
      setShowForm(false);
      setEditingTask(undefined);
    } catch (err) {
      setError('Failed to save task');
      console.error('Error saving task:', err);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(undefined);
  };

  const getFilteredTasks = () => {
    let filtered = [...tasks];

    if (filterStatus === 'paid') {
      filtered = filtered.filter(task => task.paid);
    } else if (filterStatus === 'unpaid') {
      filtered = filtered.filter(task => !task.paid);
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(task => task.category === filterCategory);
    }

    return filtered;
  };

  const filteredTasks = getFilteredTasks();
  const categories = ['all', ...Array.from(new Set(tasks.map(task => task.category)))];
  const totalAmount = filteredTasks.reduce((sum, task) => sum + (task.amount || 0), 0);
  const paidAmount = filteredTasks.filter(t => t.paid).reduce((sum, task) => sum + (task.amount || 0), 0);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <div className="text-2xl font-bold text-gray-700">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with gradient */}
      <div className="mb-8 text-center">
        <div className="inline-block mb-4">
          <div className="text-6xl mb-2">🏠</div>
        </div>
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Household Tasks
        </h1>
        <p className="text-lg text-gray-600 font-medium">Manage your monthly bills and recurring tasks</p>
      </div>

      {error && (
        <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-300 text-red-800 px-6 py-4 rounded-xl mb-6 shadow-md">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <span className="font-semibold">{error}</span>
          </div>
        </div>
      )}

      {/* Summary Cards with enhanced styling */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-blue-100 text-sm font-semibold uppercase tracking-wide mb-1">Total Tasks</div>
              <div className="text-4xl font-bold text-white">{filteredTasks.length}</div>
            </div>
            <div className="text-5xl text-blue-200 opacity-50">📋</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-green-100 text-sm font-semibold uppercase tracking-wide mb-1">Completed</div>
              <div className="text-4xl font-bold text-white">
                {filteredTasks.filter(t => t.paid).length}
              </div>
            </div>
            <div className="text-5xl text-green-200 opacity-50">✓</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-purple-100 text-sm font-semibold uppercase tracking-wide mb-1">Amount</div>
              <div className="text-2xl font-bold text-white">
                ${paidAmount.toFixed(2)}
              </div>
              <div className="text-purple-200 text-sm mt-1">of ${totalAmount.toFixed(2)}</div>
            </div>
            <div className="text-5xl text-purple-200 opacity-50">💰</div>
          </div>
        </div>
      </div>

      {/* Filters with enhanced design */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'paid' | 'unpaid')}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
            >
              <option value="all">All Tasks</option>
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-shrink-0">
            <label className="block text-xs font-semibold text-transparent mb-2">Action</label>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              {showForm ? '✕ Cancel' : '+ Add New Task'}
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <TaskForm
          onSubmit={handleSubmitTask}
          onCancel={handleCancelForm}
          initialTask={editingTask}
        />
      )}

      {/* Task List */}
      <div>
        {filteredTasks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-300 shadow-lg">
            <div className="text-6xl mb-4">📂</div>
            <p className="text-gray-500 text-xl font-semibold mb-6">No tasks found</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              ✨ Add Your First Task
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
