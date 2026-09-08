import { ISignInInput, IUser } from "@/types";
import { ApiError, authRequest, request } from "@/apis";

const getUser = async () => {
  return authRequest<IUser>("/users");
};

const getUserOrNull = async () => {
  try {
    return await getUser();
  } catch (error) {
    if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
      return null;
    }

    throw error;
  }
};

const signin = async (data: ISignInInput) => {
  return request<IUser>("/auth/signin", {
    method: "POST",
    cache: "no-store",
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

export { getUser, getUserOrNull, signin, signOut };
