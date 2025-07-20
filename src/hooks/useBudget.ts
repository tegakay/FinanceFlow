import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { getBudgetDataForCurrentMonth,upsertBudget } from "../services/Budgets/budgets";
import { Monthly_Budget } from "../types";

export const useBudget = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["budget"],
    queryFn: getBudgetDataForCurrentMonth,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  const addBudgetMutation = useMutation({
   
    mutationFn: (newTx: Omit<Monthly_Budget, "id">) => upsertBudget(newTx),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
  });

  return {
    budgetData: data,
    isLoading,
    isError,
    addBudget: addBudgetMutation.mutate,
  };
};