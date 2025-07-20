import React, { useState } from 'react';
import { Search, Filter, Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import AddTransactionModal from '../Modals/AddTransactionModal';
import { fetchTransactions } from '../../services/Transactions/transactions';
import { useQuery } from "@tanstack/react-query";
import { Transaction } from '../../types';
import { useTransactions } from '../../hooks/useTransaction';

const Transactions = () => {
  const { state } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const categories = ['all', ...Array.from(new Set(state.transactions.map(t => t.category)))];
  const { transactions,isLoading,isError } = useTransactions();

  
  const data = transactions
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="text-gray-500 text-sm">Loading transactions...</div>
      </div>
    )
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="text-red-500 bg-red-50 px-4 py-2 rounded border border-red-200 text-sm">
          Failed to load transactions. Please try again.
        </div>
      </div>
    );
  }

  const filteredTransactions = data?.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: state.user.currency
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Transactions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track all your income and expenses
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Transaction</span>
        </button>
      </div>

      <div className={`p-6 rounded-xl shadow-sm border ${state.user.theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
        }`}>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${state.user.theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${state.user.theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
                }`}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          {filteredTransactions?.map((transaction) => (
            <div key={transaction.id} className={`flex items-center justify-between p-4 rounded-lg border ${state.user.theme === 'dark'
                ? 'border-gray-700 hover:bg-gray-700'
                : 'border-gray-100 hover:bg-gray-50'
              } transition-colors`}>
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${transaction.type === 'Income'
                    ? 'bg-green-100 dark:bg-green-900'
                    : 'bg-red-100 dark:bg-red-900'
                  }`}>
                  {transaction.type === 'Income' ? (
                    <ArrowUpRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowDownLeft className="w-5 h-5 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <p className={`font-medium ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                    {transaction.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-sm px-2 py-1 rounded-full ${state.user.theme === 'dark'
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-600'
                      }`}>
                      {transaction.category}
                    </span>
                    <span className={`text-sm ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                      {formatDate(transaction.date)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold text-lg ${transaction.type === 'Income'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                  }`}>
                  {transaction.type === 'Income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default Transactions;