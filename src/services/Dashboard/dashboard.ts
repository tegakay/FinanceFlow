
import { Transaction } from '../../types';
import { supabase } from '../../libs/supabaseClient';
import { fetchTransactions } from '../Transactions/transactions';
import { getBudgetSummary } from '../Budgets/budgets';

export async function getTotalIncome() {
  let transactions = await fetchTransactions();
  let totalExpenses = transactions.reduce((acc, transaction) => {
    return transaction.type === "Expense" ? acc + transaction.amount : acc - transaction.amount;
  }, 0);
  return totalExpenses;
}

export async function getOverviewData() {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('User not logged in');

  const totalIncome = await getTotalIncome()
  const totalExpenses = await getBudgetSummary()


  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
  };
}   