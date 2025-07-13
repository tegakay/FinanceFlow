import { Goal } from "../../types";
import { supabase } from '../../libs/supabaseClient';

export async function createGoal(data: Omit<Goal, 'id' | 'created_at' | 'user_id'>): Promise<{ error: any }> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('User not logged in');

  const { error } = await supabase.from('goals').insert({
    ...data,
    user_id: user.id,
  });

  

  return { error };
}

export async function fetchGoals(): Promise<Goal[]> {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .order('target_date', { ascending: false });

  if (error) throw error;
  return data as Goal[];
}

export async function updateGoal(id: string, updates: Partial<Omit<Goal, 'id' | 'user_id' | 'created_at'>>): Promise<{ error: any }> {
  const { error } = await supabase
    .from('goals')
    .update(updates)
    .eq('id', id);

  return { error };
}

export async function deleteGoal(id: string): Promise<{ error: any }> {
  const { error } = await supabase
    .from('goals')
    .delete()
    .eq('id', id);

  return { error };
}
