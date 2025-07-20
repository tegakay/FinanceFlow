import React from 'react';
import OverviewCards from '../Dashboard/OverviewCards';
import RecentTransactions from '../Dashboard/RecentTransactions';
import AccountsOverview from '../Dashboard/AccountsOverview';
import { useUser } from '../../hooks/useUser';

const Dashboard = () => {

  const { userData } = useUser();
  console.log("User Data:", userData);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back{`, ${userData?.first_name}`} 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's your financial overview for this month.
        </p>
      </div>
      
      <OverviewCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions />
        <AccountsOverview />
      </div>
    </div>
  );
};

export default Dashboard;