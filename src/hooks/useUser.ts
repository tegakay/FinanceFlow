
import { fetchUser, updateUser } from "../services/Users/user";
import { User } from "../types"; 
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";

export const useUser = () => {
  const queryClient = useQueryClient();

   const { data, isLoading, isError } = useQuery({
      queryKey: ["user"],
      queryFn: fetchUser,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    });

    const updateUserMutation = useMutation({
       
        mutationFn: (newTx: Omit<User, "id">) => updateUser(newTx),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["user"] });
        },
      });

      return {
        userData: data,
        isLoading,
        isError,    
        updateUser: updateUserMutation.mutate,
      };

}