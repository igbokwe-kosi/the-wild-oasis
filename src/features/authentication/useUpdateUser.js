import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account successfully edited!");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      //   queryClient.setQueryData("user", user);
    },
    onError: (error) => {
      toast.error("User could not be created");
      console.error(error);
    },
  });

  return { updateUser, isUpdating };
}
