interface IUser {
  username: string;
}

interface ISignInInput {
  userId: string;
  password: string;
}

export type { IUser, ISignInInput };
