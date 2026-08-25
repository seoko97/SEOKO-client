import { ISignInInput, IUser } from "@/types";
import { authRequest, request } from "@/apis";

const getUser = async () => {
  return authRequest<IUser>("/users");
};

const signin = async (data: ISignInInput) => {
  return request<IUser>("/auth/signin", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
  });
};

const signOut = async () => {
  return authRequest<true>("/auth/signout", {
    method: "POST",
    credentials: "include",
  });
};

export { getUser, signin, signOut };
