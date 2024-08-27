import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupApi({ fullName, email, password }),
    onSuccess: () => {
      toast.success("Signup successful! Verify your email to login");
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error("An error occurred, couldn't signup");
    },
  });

  return {
    signup,
    isLoading,
  };
}
