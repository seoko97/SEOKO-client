import { ISignInInput, IUser } from "@/types";
import api from "@/apis";

const getUser = async () => {
  const res = await api.get<IUser>("/users");

  return res.data.username;
};

const signin = async (data: ISignInInput) => {
  const res = await api.post<IUser>("/auth/signin", data, { withCredentials: true });

  return res.data;
};

const signOut = async () => {
  const res = await api.post<true>("/auth/signout", {}, { withCredentials: true });

  return res.data;
};

export { getUser, signin, signOut };
