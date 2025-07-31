
import { PieChart, TrendingUp, AlertTriangle, Plus } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import { useState } from 'react';
import AddBudgetModal from '../Modals/AddBudgetModal';
import { useBudget } from '../../hooks/useBudget';

import { budget_entry } from '../../types';


const Budget = () => {
  const { state } = useFinance();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: state.user.currency
    }).format(amount);
  };

  const getProgressColor = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // const getProgressColorLight = (spent: number, allocated: number) => {
  //   const percentage = (spent / allocated) * 100;
  //   if (percentage >= 90) return 'bg-red-100 dark:bg-red-900';
  //   if (percentage >= 75) return 'bg-yellow-100 dark:bg-yellow-900';
  //   return 'bg-green-100 dark:bg-green-900';
  // };


  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["budget2"],
  //   queryFn: getBudgetDataForCurrentMonth,
  // });
  
  const { budgetData, isError, isLoading } = useBudget();
  

  //  console.error('data',data,isError);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="text-gray-500 text-sm">Loading Page...</div>
      </div>
    )
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="text-red-500 bg-red-50 px-4 py-2 rounded border border-red-200 text-sm">
          Failed to load page. Please try again.
        </div>
      </div>
    );
  }
  const { monthly_income, Expenses, total_remaning, data_raw } = budgetData || {};



  return (
    <div className="space-y-6">
      <div className='flex items-center justify-between'>
        <div>
          <h1 className={`text-2xl font-bold  dark:text-white mb-2 ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Budget Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your spending against your budget goals
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Configure Budget</span>
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`p-6 rounded-xl shadow-sm border ${state.user.theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
          }`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <PieChart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className={`font-semibold ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
              Total Budget
            </h3>
          </div>
          <p className={`text-2xl font-bold ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
            {formatCurrency(Number(monthly_income) || 0)}
          </p>
          <p className={`text-sm mt-1 ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
            Monthly allocation
          </p>
        </div>

        <div className={`p-6 rounded-xl shadow-sm border ${state.user.theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
          }`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className={`font-semibold ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
              Total Spent
            </h3>
          </div>
          <p className={`text-2xl font-bold ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
            {formatCurrency(Number(Expenses) || 0)}
          </p>
          <p className={`text-sm mt-1 ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
            This month
          </p>
        </div>

        <div className={`p-6 rounded-xl shadow-sm border ${state.user.theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
          }`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className={`font-semibold ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
              Remaining
            </h3>
          </div>
          <p className={`text-2xl font-bold ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
            {formatCurrency(
              Number(total_remaning) || 0
            )}
          </p>
          <p className={`text-sm mt-1 ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
            Available to spend
          </p>
        </div>
      </div>

      <div className={`p-6 rounded-xl shadow-sm border ${state.user.theme === 'dark'
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200'
        }`}>
        <h3 className={`text-lg font-semibold mb-6 ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
          Budget Categories
        </h3>

        <div className="space-y-6">
          {(!data_raw || data_raw.length === 0) && (
            <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg min-h-[150px]">
              <p className="text-gray-600 text-lg">No Results Found</p>
            </div>
          )}

          {data_raw && data_raw.map((budget: budget_entry) => {

            const percentage = (budget.total_expense / budget.budget_allocated) * 100;
            const remaining = budget.budget_allocated - budget.total_expense;


            return (
              <div key={budget.id}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className={`font-medium ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                      {budget.category}
                    </p>
                    <p className={`text-sm ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                      {formatCurrency(budget.total_expense)} of {formatCurrency(budget.budget_allocated)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${remaining >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                      }`}>
                      {formatCurrency(Math.abs(remaining))} {remaining >= 0 ? 'left' : 'over'}
                    </p>
                    <p className={`text-sm ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                      {percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className={`w-full rounded-full h-3 ${state.user.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(budget.total_expense, budget.budget_allocated)}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <AddBudgetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default Budget;