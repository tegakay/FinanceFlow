import React, { useState } from 'react';
import { X, Target } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import { Goal } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGoal } from '../../services/Goals/goals';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useFinance();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: '',
    category: ''
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTx: Omit<Goal, "id">) => createGoal(newTx),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      setFormData({
        title: '',
        description: '',
        targetAmount: '',
        currentAmount: '',
        targetDate: '',
        category: ''
      })

    },
  });

  const categories = [
    'Emergency', 'Travel', 'Transportation', 'Home', 'Education',
    'Investment', 'Retirement', 'Healthcare', 'Entertainment', 'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.targetAmount || !formData.targetDate || !formData.category) {
      return;
    }

    const newGoal: Goal = {
      goal_title: formData.title,
      description: formData.description,
      target_amount: parseFloat(formData.targetAmount),
      current_amount: parseFloat(formData.currentAmount) || 0,
      target_date: formData.targetDate,
      category: formData.category
    };

    mutation.mutate(newGoal);

    // dispatch({ type: 'ADD_GOAL', payload: newGoal });

    // Reset form and close modal
    setFormData({
      title: '',
      description: '',
      targetAmount: '',
      currentAmount: '',
      targetDate: '',
      category: ''
    });
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md rounded-xl shadow-xl ${state.user.theme === 'dark'
          ? 'bg-gray-800 border border-gray-700'
          : 'bg-white border border-gray-200'
        }`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-xl font-semibold ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
            Add Financial Goal
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${state.user.theme === 'dark'
                ? 'hover:bg-gray-700 text-gray-400'
                : 'hover:bg-gray-100 text-gray-500'
              }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${state.user.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
              Goal Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Emergency Fund, Vacation, New Car"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${state.user.theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${state.user.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description of your goal"
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${state.user.theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${state.user.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Target Amount
              </label>
              <input
                type="number"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${state.user.theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${state.user.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Current Amount
              </label>
              <input
                type="number"
                name="currentAmount"
                value={formData.currentAmount}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${state.user.theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${state.user.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${state.user.theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
                }`}
              required
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${state.user.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
              Target Date
            </label>
            <input
              type="date"
              name="targetDate"
              value={formData.targetDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${state.user.theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
                }`}
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-2 border rounded-lg font-medium transition-colors ${state.user.theme === 'dark'
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Target className="w-4 h-4" />
              <span>Add Goal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;