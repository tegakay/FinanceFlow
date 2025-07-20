import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { fetchTransactions,createTransaction } from "../services/Transactions/transactions";
import { Transaction } from "../types";



 export const useTransactions = () => {
  const { data, isLoading, isError } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
    const queryClient = useQueryClient();

  const addTransactionMutation = useMutation({
      mutationFn: (newTx: Omit<Transaction, "id">) => createTransaction(newTx),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        
  
      },
    });

  return {
    transactions: data,
    isLoading,
    isError,
    addTransaction: addTransactionMutation.mutate,
  };
}

