
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';

const Investments = () => {
  const { state } = useFinance();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: state.user.currency
    }).format(amount);
  };

  const totalValue = state.investments.reduce((sum, inv) => sum + (inv.shares * inv.currentPrice), 0);
  const totalCost = state.investments.reduce((sum, inv) => sum + (inv.shares * inv.purchasePrice), 0);
  const totalGainLoss = totalValue - totalCost;
  const totalGainLossPercent = ((totalGainLoss / totalCost) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Investment Portfolio
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your investment performance and portfolio allocation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`p-6 rounded-xl shadow-sm border ${
          state.user.theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className={`font-semibold ${
              state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Total Value
            </h3>
          </div>
          <p className={`text-2xl font-bold ${
            state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {formatCurrency(totalValue)}
          </p>
          <p className={`text-sm mt-1 ${
            state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Current portfolio value
          </p>
        </div>

        <div className={`p-6 rounded-xl shadow-sm border ${
          state.user.theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className={`font-semibold ${
              state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Total Cost
            </h3>
          </div>
          <p className={`text-2xl font-bold ${
            state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {formatCurrency(totalCost)}
          </p>
          <p className={`text-sm mt-1 ${
            state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Original investment
          </p>
        </div>

        <div className={`p-6 rounded-xl shadow-sm border ${
          state.user.theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className={`p-2 rounded-lg ${
              totalGainLoss >= 0 
                ? 'bg-green-100 dark:bg-green-900' 
                : 'bg-red-100 dark:bg-red-900'
            }`}>
              {totalGainLoss >= 0 ? (
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
              )}
            </div>
            <h3 className={`font-semibold ${
              state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Total Gain/Loss
            </h3>
          </div>
          <p className={`text-2xl font-bold ${
            totalGainLoss >= 0 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {totalGainLoss >= 0 ? '+' : ''}{formatCurrency(totalGainLoss)}
          </p>
          <p className={`text-sm mt-1 ${
            totalGainLoss >= 0 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {totalGainLossPercent >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className={`p-6 rounded-xl shadow-sm border ${
        state.user.theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-6 ${
          state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Holdings
        </h3>

        <div className="space-y-4">
          {state.investments.map((investment) => {
            const currentValue = investment.shares * investment.currentPrice;
            const costBasis = investment.shares * investment.purchasePrice;
            const gainLoss = currentValue - costBasis;
            const gainLossPercent = ((gainLoss / costBasis) * 100);

            return (
              <div key={investment.id} className={`p-4 rounded-lg border ${
                state.user.theme === 'dark'
                  ? 'border-gray-700 hover:bg-gray-700'
                  : 'border-gray-100 hover:bg-gray-50'
              } transition-colors`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white bg-gradient-to-r ${
                        investment.symbol.charAt(0) <= 'M' 
                          ? 'from-blue-500 to-purple-600' 
                          : 'from-green-500 to-teal-600'
                      }`}>
                        {investment.symbol.charAt(0)}
                      </div>
                      <div>
                        <p className={`font-semibold ${
                          state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {investment.symbol}
                        </p>
                        <p className={`text-sm ${
                          state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {investment.name}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center space-x-4 text-sm">
                      <span className={state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                        {investment.shares} shares
                      </span>
                      <span className={state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                        Avg: {formatCurrency(investment.purchasePrice)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold text-lg ${
                      state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {formatCurrency(currentValue)}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`font-medium ${
                        gainLoss >= 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {gainLoss >= 0 ? '+' : ''}{formatCurrency(gainLoss)}
                      </span>
                      <span className={`text-sm ${
                        gainLoss >= 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        ({gainLossPercent >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%)
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${
                      state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {formatCurrency(investment.currentPrice)} per share
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Investments;