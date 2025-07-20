import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  PieChart, 
  TrendingUp, 
  Target, 
  User,
  Moon,
  Sun,
  LogOut
} from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { state, dispatch } = useFinance();
  const location = useLocation();
  const navigate = useNavigate();
  const {user,signOut} = useAuth();

  const  handleLogout = async(e: React.MouseEvent) => {
    e.preventDefault();
    try {
      signOut()
    navigate('/login');
      
    } catch (error) {
      console.error('Error logging out:', error);
      
    }
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'transactions', label: 'Transactions', icon: CreditCard, path: '/transactions' },
    { id: 'budget', label: 'Budget', icon: PieChart, path: '/budget' },
    { id: 'goals', label: 'Goals', icon: Target, path: '/goals' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' }
  ];

  return (
    <div className={`w-64 h-screen ${state.user.theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col transition-colors duration-200`}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              FinanceFlow
            </h1>
            <p className={`text-sm ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Financial Dashboard
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : state.user.theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            state.user.theme === 'dark'
              ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          {state.user.theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
          <span className="font-medium">
            {state.user.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>

        <button 
        onClick={handleLogout}
        className='w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900'>
          <LogOut/> <span className='font-medium'>Log out</span>
        </button>

      </div>
    </div>
  );
};

export default Sidebar;