import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Transaction, Account, Budget, Investment, Goal, User } from '../types';

interface FinanceState {
  user: User;
  accounts: Account[];
  // transactions: Transaction[];
  // budgets: Budget[];
  // investments: Investment[];
  // goals: Goal[];
}

type FinanceAction = 
  | { type: 'TOGGLE_THEME' }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_ACCOUNT'; payload: Account }
  | { type: 'ADD_GOAL'; payload: Goal }
  | { type: 'UPDATE_GOAL'; payload: Goal }
  | { type: 'LOAD_DATA'; payload: Partial<FinanceState> };

const initialState: FinanceState = {
  user: { 
    name: 'Alex Johnson', 
    email: 'alex.johnson@email.com', 
    currency: 'USD',
    theme: 'light'
  },
  accounts: [
    { id: '1', name: 'Primary Checking', type: 'checking', balance: 12450.75, currency: 'USD' },
    { id: '2', name: 'High-Yield Savings', type: 'savings', balance: 25800.00, currency: 'USD' },
    { id: '3', name: 'Investment Portfolio', type: 'investment', balance: 42150.25, currency: 'USD' },
    { id: '4', name: 'Credit Card', type: 'credit', balance: -1250.30, currency: 'USD' }
  ],
  transactions: [
    { id: '1', description: 'Salary Deposit', amount: 5500.00, category: 'Salary', date: '2024-01-15', type: 'Income', accountId: '1' },
    { id: '2', description: 'Grocery Shopping', amount: -145.50, category: 'Food', date: '2024-01-14', type: 'Expense', accountId: '1' },
    { id: '3', description: 'Investment Dividend', amount: 125.75, category: 'Investments', date: '2024-01-13', type: 'Income', accountId: '3' },
    { id: '4', description: 'Electric Bill', amount: -89.25, category: 'Utilities', date: '2024-01-12', type: 'Expense', accountId: '1' },
    { id: '5', description: 'Gas Station', amount: -45.00, category: 'Transportation', date: '2024-01-11', type: 'Expense', accountId: '4' },
    { id: '6', description: 'Restaurant', amount: -78.90, category: 'Food', date: '2024-01-10', type: 'Expense', accountId: '4' }
  ],
  // budgets: [
  //   { id: '1', category: 'Food', allocated: 800, spent: 224.40, period: 'monthly' },
  //   { id: '2', category: 'Transportation', allocated: 400, spent: 45.00, period: 'monthly' },
  //   { id: '3', category: 'Utilities', allocated: 300, spent: 89.25, period: 'monthly' },
  //   { id: '4', category: 'Entertainment', allocated: 200, spent: 0, period: 'monthly' }
  // ],
  // investments: [
  //   { id: '1', symbol: 'AAPL', name: 'Apple Inc.', shares: 50, purchasePrice: 150.00, currentPrice: 185.25, change: 2.15, changePercent: 1.17 },
  //   { id: '2', symbol: 'MSFT', name: 'Microsoft Corp.', shares: 25, purchasePrice: 300.00, currentPrice: 310.50, change: -1.25, changePercent: -0.40 },
  //   { id: '3', symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 15, purchasePrice: 2400.00, currentPrice: 2465.75, change: 15.30, changePercent: 0.62 },
  //   { id: '4', symbol: 'TSLA', name: 'Tesla Inc.', shares: 20, purchasePrice: 800.00, currentPrice: 755.25, change: -8.75, changePercent: -1.15 }
  // ],
  // goals: [
  //   { id: '1', title: 'Emergency Fund', description: '6 months of expenses', targetAmount: 30000, currentAmount: 25800, targetDate: '2024-06-01', category: 'Emergency' },
  //   { id: '2', title: 'Vacation Fund', description: 'European trip', targetAmount: 8000, currentAmount: 3200, targetDate: '2024-07-15', category: 'Travel' },
  //   { id: '3', title: 'New Car', description: 'Down payment for new vehicle', targetAmount: 15000, currentAmount: 7500, targetDate: '2024-12-01', category: 'Transportation' }
  // ]
};

const financeReducer = (state: FinanceState, action: FinanceAction): FinanceState => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        user: { ...state.user, theme: state.user.theme === 'light' ? 'dark' : 'light' }
      };
    case 'ADD_TRANSACTION':

      // return {
      //   ...state,
      //   transactions: [action.payload, ...state.transactions]
      // };
    case 'UPDATE_ACCOUNT':
      // return {
      //   ...state,
      //   accounts: state.accounts.map(acc => 
      //     acc.id === action.payload.id ? action.payload : acc
      //   )
      // };
    case 'ADD_GOAL':
      // return {
      //   ...state,
      //   goals: [...state.goals, action.payload]
      // };
    case 'UPDATE_GOAL':
      
    case 'LOAD_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const FinanceContext = createContext<{
  state: FinanceState;
  dispatch: React.Dispatch<FinanceAction>;
} | null>(null);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  useEffect(() => {
    const savedData = localStorage.getItem('financeflow-data');
    if (savedData) {
      dispatch({ type: 'LOAD_DATA', payload: JSON.parse(savedData) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('financeflow-data', JSON.stringify(state));
  }, [state]);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};