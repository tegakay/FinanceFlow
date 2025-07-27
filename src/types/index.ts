export interface Transaction {
  id?: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: "Income" | "Expense";
  accountId?: string;
  account?: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface budget_entry {
    category: string,
    total_expense: number,
    budget_allocated: number,
    id: number
}

export interface Monthly_Budget {
  id: string;
  monthly_income: string;
  food: number | string;
  transportation: number | string;
  date?: number | string;
  utilities: number | string;
  entertainment: number | string;
}

export interface budget_entry {
  category: string;
  total_expense: number;
  budget_allocated: number;
  id: number;
}

export interface Account {
  id: string;
  name: string;
  type: "checking" | "savings" | "credit" | "investment";
  balance: number;
  currency: string;
}

export interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  period: "monthly" | "yearly";
}

export interface Investment {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  purchasePrice: number;
  currentPrice: number;
  change: number;
  changePercent: number;
}

export interface Goal {
  id?: string;
  goal_title: string;
  description: string;
  target_amount: number;
  current_amount: number;
  target_date: string;
  category: string;
  status?: "active" | "paused" | "cancelled" | "completed";
}

export interface User {
  name: string;
  email: string;
  currency: string;
  theme: "light" | "dark";
}
