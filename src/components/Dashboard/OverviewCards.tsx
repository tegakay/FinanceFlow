import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import { useQuery } from "@tanstack/react-query";
import { getOverviewData } from '../../services/Dashboard/dashboard';

const OverviewCards = () => {
  const { state } = useFinance();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["overview-transactions"],
    queryFn: getOverviewData,
  });
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

  const {
    totalIncome,
    totalExpenses,
    balance
  } = data || {
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0
  };

  const totalBalance = balance;
  

  const cards = [
    {
      title: 'Total Balance',
      value: totalBalance,
      icon: Wallet,
      change: '+5.2%',
      positive: true
    },
    {
      title: 'Monthly Income',
      value: totalIncome,
      icon: TrendingUp,
      change: '+12.5%',
      positive: true
    },
    {
      title: 'Monthly Expenses',
      value: totalExpenses,
      icon: TrendingDown,
      change: '-3.2%',
      positive: true
    },
    {
      title: 'Goals',
      value: 3,
      icon: DollarSign,
      change: '+8.1%',
      positive: true
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: state.user.currency
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md ${state.user.theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
              }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                  {card.title}
                </p>
                <p className={`text-2xl font-bold mt-2 ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                  {formatCurrency(card.value)}
                </p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${card.positive ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {card.change}
                  </span>
                  <span className={`text-sm ml-1 ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                    vs last month
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OverviewCards;