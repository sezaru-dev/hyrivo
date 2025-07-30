import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupUser } from "../queries/users/signup-user";

export function useSignupUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
