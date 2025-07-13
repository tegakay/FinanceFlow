import  { useState } from 'react';
import { Target, Calendar, TrendingUp, Plus } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import AddGoalModal from '../Modals/AddGoalModal';
import { useQuery } from "@tanstack/react-query";
import { fetchGoals } from '../../services/Goals/goals';
import { Goal } from '../../types';

const Goals = () => {
  const { state } = useFinance();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: state.user.currency
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilTarget = (targetDate: string) => {
    const target = new Date(targetDate);
    const today = new Date();
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    if (percentage >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const { data, isLoading, isError } = useQuery<Goal[]>({
    queryKey: ["goals"],
    queryFn: fetchGoals,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="text-gray-500 text-sm">Loading Goals...</div>
      </div>
    )
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="text-red-500 bg-red-50 px-4 py-2 rounded border border-red-200 text-sm">
          Failed to load Goals. Please try again.
        </div>
      </div>
    );
  }

  if(!data || data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <div className="text-gray-500 text-sm">No financial goals found.</div>  
        </div>
    );
  }

  
  function sumGoals(goals: Goal[]) {
    let totalCurrentAmount = 0;
    let totalTargetAmount = 0;

    for (const goal_sum of goals) {
      totalCurrentAmount += goal_sum.current_amount;
      totalTargetAmount += goal_sum.target_amount;
    }

    return {
      totalCurrentAmount,
      totalTargetAmount,
    };
  }
  let goal_info = sumGoals(data);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Financial Goals
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your progress towards your financial objectives
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Goal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`p-6 rounded-xl shadow-sm border ${state.user.theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
          }`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className={`font-semibold ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
              Active Goals
            </h3>
          </div>
          <p className={`text-2xl font-bold ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
            {data?.length}
          </p>
          <p className={`text-sm mt-1 ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
            Goals in progress
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
              Total Saved
            </h3>
          </div>
          <p className={`text-2xl font-bold ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
            {formatCurrency(goal_info.totalCurrentAmount)}
          </p>
          <p className={`text-sm mt-1 ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
            Across all goals
          </p>
        </div>

        <div className={`p-6 rounded-xl shadow-sm border ${state.user.theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
          }`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className={`font-semibold ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
              Target Amount
            </h3>
          </div>
          <p className={`text-2xl font-bold ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
            {formatCurrency(goal_info.totalTargetAmount)}
          </p>
          <p className={`text-sm mt-1 ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
            Total target
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {data.map((goal) => {
          const progress = (goal.current_amount / goal.target_amount) * 100;
          const remaining = goal.target_amount - goal.current_amount;
          const daysUntil = getDaysUntilTarget(goal.target_date);

          return (
            <div key={goal.id} className={`p-6 rounded-xl shadow-sm border ${state.user.theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
              }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        {goal.goal_title}
                      </h3>
                      <p className={`text-sm ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        {goal.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className={`text-sm font-medium ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Current Amount
                      </p>
                      <p className={`text-xl font-bold ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        {formatCurrency(goal.current_amount)}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Target Amount
                      </p>
                      <p className={`text-xl font-bold ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        {formatCurrency(goal.target_amount)}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Days Until Target
                      </p>
                      <p className={`text-xl font-bold ${daysUntil > 0
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-red-600 dark:text-red-400'
                        }`}>
                        {daysUntil > 0 ? daysUntil : 'Overdue'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="ml-6 text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${progress >= 75
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : progress >= 50
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                    {progress.toFixed(1)}% Complete
                  </div>
                  <p className={`text-sm mt-2 ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                    {formatCurrency(remaining)} remaining
                  </p>
                  <p className={`text-xs mt-1 ${state.user.theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                    Target: {formatDate(goal.target_date)}
                  </p>
                </div>
              </div>

              <div className={`w-full rounded-full h-3 ${state.user.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(goal.current_amount, goal.target_amount)}`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <AddGoalModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default Goals;