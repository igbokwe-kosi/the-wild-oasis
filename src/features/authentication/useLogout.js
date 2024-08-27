import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => logout({ email, password }),
    onSuccess: () => {
      toast.success("Logout successful");
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
    onError: (error) => {
      toast.error("An error occurred, couldn't logout");
    },
  });

  return {
    logout: mutate,
    isLoading,
  };
}
