
import { User, Mail, DollarSign, Bell, Shield, Settings, Plus } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import { useUser } from '../../hooks/useUser';
import { useState } from 'react';


const Profile = () => {
  const { state } = useFinance();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const { userData: data, isLoading, isError } = useUser();
  console.log('User Data:', data);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="text-gray-500 text-sm">Loading Profile...</div>
      </div>
    )
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="text-red-500 bg-red-50 px-4 py-2 rounded border border-red-200 text-sm">
          Failed to load Profile. Please try again.
        </div>
      </div>
    );
  }

  console.log('Profile Data:', data);


  // if (data) {
  //   setFormData({
  //     firstName: data?.first_name,
  //     lastName: data?.last_name,
  //     email: data?.email,
  //   });

  // }



  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 space-y-6`}>
          <div className={`p-6 rounded-xl shadow-sm border ${state.user.theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
            }`}>
            <h3 className={`text-lg font-semibold mb-6 ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
              Personal Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${state.user.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  First Name
                </label>
                <input
                  type="text"
                  value={data?.first_name || ''}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${state.user.theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  readOnly
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${state.user.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  Last Name
                </label>
                <input
                  type="text"
                  value={data?.last_name || ''}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${state.user.theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  readOnly
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${state.user.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={data?.email || ''}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${state.user.theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  readOnly
                />
              </div>

              {/* <div>
                <label className={`block text-sm font-medium mb-2 ${state.user.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  Default Currency
                </label>
                <select
                  value={state.user.currency}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${state.user.theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div> */}

              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Update</span>
              </button>
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-sm border ${state.user.theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
            }`}>
            <h3 className={`text-lg font-semibold mb-6 ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
              Preferences
            </h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                    Email Notifications
                  </p>
                  <p className={`text-sm ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                    Receive notifications about your financial activities
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                    Budget Alerts
                  </p>
                  <p className={`text-sm ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                    Get notified when you approach budget limits
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                    Investment Updates
                  </p>
                  <p className={`text-sm ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                    Daily updates on your investment portfolio
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`p-6 rounded-xl shadow-sm border ${state.user.theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
            }`}>
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className={`text-lg font-semibold ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                {data?.first_name || 'John'} {data?.last_name || 'Doe'}
              </h3>
              <p className={`text-sm ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                Premium Member
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className={`w-5 h-5 ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                <span className={`text-sm ${state.user.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  {data?.email || 'Not provided'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className={`w-5 h-5 ${state.user.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                <span className={`text-sm ${state.user.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  Currency: {state.user.currency}
                </span>
              </div>
            </div>
          </div>

          {/* <div className={`p-6 rounded-xl shadow-sm border ${state.user.theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
            }`}>
            <h3 className={`text-lg font-semibold mb-4 ${state.user.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
              Quick Actions
            </h3>

            <div className="space-y-3">
              <button className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${state.user.theme === 'dark'
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-50 text-gray-700'
                }`}>
                <Settings className="w-5 h-5" />
                <span>Account Settings</span>
              </button>

              <button className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${state.user.theme === 'dark'
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-50 text-gray-700'
                }`}>
                <Shield className="w-5 h-5" />
                <span>Security</span>
              </button>

              <button className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${state.user.theme === 'dark'
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-50 text-gray-700'
                }`}>
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;