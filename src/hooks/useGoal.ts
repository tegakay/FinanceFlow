import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { fetchGoals,createGoal } from "../services/Goals/goals";
import { Goal } from "../types";

export const useGoal = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["goals"],
    queryFn: fetchGoals,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  const addGoalMutation = useMutation({
    mutationFn: (newTx: Omit<Goal, "id">) => createGoal(newTx),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

  return {
    goalsData: data,
    isLoading,
    isError,
    addGoal: addGoalMutation.mutate,
  };
}