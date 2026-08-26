import { useRouter } from "next/navigation";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { userQueryKeys } from "@utils/query/queryKeys";
import { IUser } from "@/types";
import { getUser, signOut, signin } from "@/apis/user";

const useGetUserQuery = () => {
  return useQuery({
    queryKey: userQueryKeys.me,
    queryFn: getUser,
    select: (data) => data?.username ?? null,
    initialData: { username: "" },
  });
};

const useSigninMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signin,
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKeys.me, data);
      router.push("/");
    },
  });
};

const useSignOutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.setQueryData<IUser | null>(userQueryKeys.me, null);
    },
  });
};

export { useGetUserQuery, useSigninMutation, useSignOutMutation };
