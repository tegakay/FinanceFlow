
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';

import { useTransactions } from '../../hooks/useTransaction';

const RecentTransactions = () => {
  const { state } = useFinance();
    const { transactions,isLoading,isError } = useTransactions();
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

  const recentTransactions = transactions?.slice(0, 5) || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: state.user.currency
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`p-6 rounded-xl shadow-sm border ${
      state.user.theme === 'dark'
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${
          state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Recent Transactions
        </h3>
        <Link
          to="/transactions"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {recentTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                transaction.type === 'Income'
                  ? 'bg-green-100 dark:bg-green-900'
                  : 'bg-red-100 dark:bg-red-900'
              }`}>
                {transaction.type === 'Income' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <ArrowDownLeft className="w-4 h-4 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div>
                <p className={`font-medium ${
                  state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {transaction.description}
                </p>
                <p className={`text-sm ${
                  state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {transaction.category} • {formatDate(transaction.date)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.type === 'Income'
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
  );
};

export default RecentTransactions;