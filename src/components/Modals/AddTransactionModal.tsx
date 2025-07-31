import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import { Transaction } from '../../types'; 
import { useTransactions } from '../../hooks/useTransaction';
import toast from "react-hot-toast";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose }) => {
  const { state } = useFinance();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'Expense' as 'Income' | 'Expense',
    accountId: '',
    date: new Date().toISOString().split('T')[0]
  });

  const { addTransaction } = useTransactions();
  

  const categories = [
    'Food', 'Transportation', 'Utilities', 'Entertainment'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.description || !formData.amount || !formData.category) {
      return;
    }

    const newTransaction: Transaction = {

      description: formData.description,
      amount: formData.type === 'Expense' ? -Math.abs(parseFloat(formData.amount)) : Math.abs(parseFloat(formData.amount)),
      category: formData.category,
      date: formData.date,
      type: formData.type,
      account: formData.accountId
    };

    // mutation.mutate(newTransaction);
    
    try {
      await addTransaction(newTransaction);
      setFormData({
        description: '',
        amount: '',
        category: '',
        type: 'Expense' as 'Income' | 'Expense',
        accountId: '',
        date: new Date().toISOString().split('T')[0]
      })
      onClose();
      toast.success("Transaction added successfully!");

    } catch (error) {
      console.log('Error adding transaction:', error);
      toast.error("Failed to add transaction. Please try again.");
    }


    

    // dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });

    // Update account balance
    // const account = state.accounts.find(acc => acc.id === formData.accountId);
    // if (account) {
    //   const updatedAccount = {
    //     ...account,
    //     balance: account.balance + newTransaction.amount
    //   };
    //   dispatch({ type: 'UPDATE_ACCOUNT', payload: updatedAccount });
    // }

    // // Reset form and close modal
    // setFormData({
    //   description: '',
    //   amount: '',
    //   category: '',
    //   type: 'Expense',
    //   accountId: state.accounts[0]?.id || '',
    //   date: new Date().toISOString().split('T')[0]
    // });
    // onClose();
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
            Add Transaction
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
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter transaction description"
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
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${state.user.theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                  }`}
              >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${state.user.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Amount
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
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
              Account
            </label>
            <select
              name="accountId"
              value={formData.accountId}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${state.user.theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
                }`}
            >
              {state.accounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${state.user.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
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
              <Plus className="w-4 h-4" />
              <span>Add Transaction</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;