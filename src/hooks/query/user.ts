import { useRouter } from "next/navigation";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUser } from "@/types";
import { getUser, signOut, signin } from "@/apis/user";

const useGetUserQuery = () => {
  return useQuery({ queryKey: ["user"], queryFn: getUser });
};

const useSigninMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(signin, {
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      router.push("/");
    },
  });
};

const useSignOutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.setQueryData<IUser | null>(["user"], null);
    },
  });
};

export { useGetUserQuery, useSigninMutation, useSignOutMutation };
