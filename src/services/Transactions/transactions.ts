
import { Transaction } from '../../types';
import { supabase } from '../../libs/supabaseClient';

export async function createTransaction(data: Omit<Transaction, 'id' | 'created_at' | 'user_id'>): Promise<{ error: any }> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('User not logged in');

  const { error } = await supabase.from('transactions').insert({
    ...data,
    user_id: user.id,
  });

  return { error };
}

export async function fetchTransactions(): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false });

  if (error) throw error;
  return data as Transaction[];
}



export async function updateTransaction(id: string, updates: Partial<Omit<Transaction, 'id' | 'user_id' | 'created_at'>>): Promise<{ error: any }> {
  const { error } = await supabase
    .from('transactions')
    .update(updates)
    .eq('id', id);

  return { error };
}


export async function deleteTransaction(id: string): Promise<{ error: any }> {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  return { error };
}

