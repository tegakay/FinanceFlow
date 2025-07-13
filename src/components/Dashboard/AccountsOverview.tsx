
import { CreditCard, Wallet, TrendingUp, Minus } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import { useQuery } from '@tanstack/react-query';
import { getBudgetDataForCurrentMonth } from '../../services/Budgets/budgets';


const AccountsOverview = () => {
  const { state } = useFinance();

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking':
        return Wallet;
      case 'savings':
        return TrendingUp;
      case 'investment':
        return TrendingUp;
      case 'credit':
        return CreditCard;
      default:
        return Wallet;
    }
  };

    const { data, isLoading, isError } = useQuery({
      queryKey: ["budget"],
      queryFn: getBudgetDataForCurrentMonth,
    });
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

    const { data_raw} = data || {};
    console.log('data_rawme',data_raw)

  const getAccountColor = (type: string, balance: number) => {
    if (type === 'credit' || balance < 0) {
      return 'text-red-600 dark:text-red-400';
    }
    return 'text-green-600 dark:text-green-400';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: state.user.currency
    }).format(Math.abs(amount));
  };

  return (
    <div className={`p-6 rounded-xl shadow-sm border ${
      state.user.theme === 'dark'
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-6 ${
        state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        Accounts Overview
      </h3>

      <div className="space-y-4">
        {data_raw.map((account) => {
          const Icon = getAccountIcon(account.category);
          return (
            <div key={account.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className={`font-medium ${
                    state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {account.category}
                  </p>
                  <p className={`text-sm capitalize ${
                    state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {account.total_expense}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${getAccountColor(account.category, account.budget_allocated)}`}>
                  {account.budget_allocated < 0 ? '-' : ''}
                  {formatCurrency(account.budget_allocated)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccountsOverview;