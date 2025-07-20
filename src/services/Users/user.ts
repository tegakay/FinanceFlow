import { supabase } from '../../libs/supabaseClient';
import { User } from '../../types'; 

export async function fetchUser(): Promise<User | null> {
    const user = (await supabase.auth.getUser()).data.user;
    console.log("User fetched:", user?.id);
    if (!user) {
        return null
    }
    
   const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw error;
  return data 
}

export const updateUser = async (updates: Partial<User>): Promise<User | null> => {
    const user = (await supabase.auth.getUser()).data.user;
   
    if (!user) {
        return null
    }
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", user.id)
    .select()
    .single(); // returns a single updated row

  if (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }

  return data as User;
};