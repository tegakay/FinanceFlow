import { Monthly_Budget } from "../../types";
import { supabase } from "../../libs/supabaseClient";
import { fetchTransactions } from "../Transactions/transactions";

export async function upsertBudget(
  upsert_data: Omit<Monthly_Budget, "id" | "created_at" | "user_id">
): Promise<{ error: any }> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("User not logged in");
  let date = getFirstDayOfCurrentMonth();
  console.error("upsert_data", upsert_data);

  const { data, error } = await supabase
    .from("budget_entries")
    .upsert(
      { ...upsert_data, id: `${user.id}_${date}`, user_id: user.id },
      { onConflict: "id" }
    ); // specify unique column here

  if (error) {
    console.error("Error upserting budget:", error);
  } else {
    console.log("Budget upserted:", data);
  }

  return { error };
}

export async function getCurrentUserBudgets() {
  //   const { data: { user } } = await supabase.auth.getUser()
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    console.error("No authenticated user");
    return null;
  }

  const { data, error } = await supabase
    .from("budget_entries")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .single();

  console.error("me", data);

  if (error) {
    console.error("Error fetching budgets:", error);
    return null;
  }

  return data;
}

export async function getBudgetSummary() {
  let transactions = await fetchTransactions();
  let totalExpenses = transactions.reduce((acc, transaction) => {
    return transaction.type === "Expense" ? acc + transaction.amount : acc;
  }, 0);
  return totalExpenses;
}

export async function getBudgetDataForCurrentMonth() {
  const { entertainment, food, transportation, utilities, monthly_income } =
    await getCurrentUserBudgets();
  const Expenses = await getBudgetSummary();
  const total_remaning = Number(monthly_income) - Expenses;
  const food_budget = (Number(food) / 100) * Number(monthly_income);
  const transportation_budget =
    (Number(transportation) / 100) * Number(monthly_income);
  const utilities_budget = (Number(utilities) / 100) * Number(monthly_income);
  const entertainment_budget =
    (Number(entertainment) / 100) * Number(monthly_income);
    let data = [];

  try {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    const { data, error } = await supabase.rpc("sum_transactions_by_category", {
      uid: userId,
    });
    console.log("Sum by category:", data);

    for (let i = 0; i < data.length; i++) {
      data[i].budget_allocated = 10;
      data[i].id = i
      if (data[i].category === "Food") {
        data[i].budget_allocated = food_budget;
      }
      if (data[i].category === "Transportation") {
        data[i].budget_allocated = transportation_budget;
      }
      if (data[i].category === "Utilities") {
        data[i].budget_allocated = utilities_budget;
      }
      if (data[i].category === "Entertainment") {
        data[i].budget_allocated = entertainment_budget;
      }
    }
     return {
      total_remaning,
      Expenses,
      monthly_income,
      'data_raw':data,
    };
    
  } catch (error) {
    console.log("Error fetching sum by category:", error);
  }

  return {
      total_remaning,
      Expenses,
      monthly_income,
      'data_raw':data,
    };
  
}

function getFirstDayOfCurrentMonth(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are 0-indexed

  // Pad month with leading zero if needed
  const monthString = month < 10 ? `0${month}` : `${month}`;

  return `${year}-${monthString}-01`;
}
