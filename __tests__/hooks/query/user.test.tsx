import { act, renderHook, waitFor } from "@testing-library/react";

import { userQueryKeys } from "@/utils/query/queryKeys";
import { ISignInInput, IUser } from "@/types";
import { useSigninMutation, useSignOutMutation } from "@/hooks/query/user";
import { signOut, signin } from "@/apis/user";

import { createQueryTestWrapper } from "../../utils/query";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
}));

jest.mock("@/apis/user", () => ({
  signin: jest.fn(),
  signOut: jest.fn(),
}));

const mockSignin = jest.mocked(signin);
const mockSignOut = jest.mocked(signOut);
const mockPush = jest.fn();
const mockReplace = jest.fn();

describe("hooks/query/user", () => {
  beforeEach(() => {
    mockSignin.mockReset();
    mockSignOut.mockReset();
    mockPush.mockReset();
    mockReplace.mockReset();
  });

  it("로그인 성공 시 캐시를 저장하고 홈으로 이동한다", async () => {
    const { queryClient, wrapper } = createQueryTestWrapper();
    const input: ISignInInput = { userId: "seoko", password: "password" };
    const user: IUser = { username: "seoko" };
    mockSignin.mockResolvedValueOnce(user);

    const { result } = renderHook(() => useSigninMutation(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(input);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockSignin).toHaveBeenCalledTimes(1);
    expect(mockSignin.mock.calls[0][0]).toBe(input);
    expect(queryClient.getQueryData(userQueryKeys.me)).toBe(user);
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("로그아웃 성공 시 캐시를 비우고 홈으로 이동한다", async () => {
    const { queryClient, wrapper } = createQueryTestWrapper();
    queryClient.setQueryData<IUser>(userQueryKeys.me, { username: "seoko" });
    mockSignOut.mockResolvedValueOnce(true);

    const { result } = renderHook(() => useSignOutMutation(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync();
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockSignOut).toHaveBeenCalledTimes(1);
    expect(queryClient.getQueryData(userQueryKeys.me)).toBeNull();
    expect(mockReplace).toHaveBeenCalledWith("/");
  });
});
