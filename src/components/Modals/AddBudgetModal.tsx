import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import { Monthly_Budget } from '../../types';
import { createTransaction } from '../../services/Transactions/transactions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upsertBudget } from '../../services/Budgets/budgets';

interface AddBudgetModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddBudgetModal: React.FC<AddBudgetModalProps> = ({ isOpen, onClose }) => {
    const { state, dispatch } = useFinance();
    const [formData, setFormData] = useState({
        income: '',
        food: '',
        transportation: '',
        utilities: '',
        entertainment: '',
        id: ''
    });
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newTx: Omit<Monthly_Budget, "id">) => upsertBudget(newTx),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["budget"] });
            setFormData({
                income: '',
                food: '',
                transportation: '',
                utilities: '',
                entertainment: '',
                id: ''
            })

        },
    });

    const categories = [
        'Food', 'Transportation', 'Utilities', 'Entertainment', 'Shopping',
        'Healthcare', 'Education', 'Travel', 'Salary', 'Investments', 'Other'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.income) {
            return;
        }
        //confirm percentages add up to 100%
        const food = Number(formData.food) || 0;
        const transportation = Number(formData.transportation) || 0;
        const utilities = Number(formData.utilities) || 0;
        const entertainment = Number(formData.entertainment ) || 0;
        const totalPercentage = food + transportation + utilities + entertainment;
        // debugger;

        if (totalPercentage > 100) {
            //change to react-toastify
            alert('Total percentage cannot exceed 100%');
            return;
        }

        const Budget: Monthly_Budget = {

            monthly_income: formData.income,
            food: formData.food,
            transportation: formData.transportation,
            utilities: formData.utilities,
            entertainment: formData.entertainment,
            id: formData.id,

            
        };

        mutation.mutate(Budget);



        // dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });

        // Update account balance


        // Reset form and close modal
        setFormData({
            income: '',
            food: '',
            transportation: '',
            utilities: '',
            entertainment: '',
            id: '',
           
        });
        onClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                        Setup Monthly Budget
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
                            Enter Monthly Income
                        </label>
                        <input
                            type="number"
                            name="income"
                            value={formData.income}
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

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${state.user.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                Food
                            </label>
                           <input
                                type="number"
                                name="food"
                                value={formData.food}
                                onChange={handleInputChange}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                max="100"
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
                                Transportation
                            </label>
                            <input
                                type="number"
                                name="transportation"
                                value={formData.transportation}
                                onChange={handleInputChange}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                max="100"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${state.user.theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    }`}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${state.user.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                Utilities
                            </label>
                           <input
                                type="number"
                                name="utilities"
                                value={formData.utilities}
                                onChange={handleInputChange}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                max="100"
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
                                Entertainment
                            </label>
                            <input
                                type="number"
                                name="entertainment"
                                value={formData.entertainment}
                                onChange={handleInputChange}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                max="100"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${state.user.theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    }`}
                                required
                            />
                        </div>
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
                            <Plus className="w-4 h-4" />
                            <span>Add Transaction</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBudgetModal;