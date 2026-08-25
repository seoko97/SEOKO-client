import { getUser, signin, signOut } from "@/apis/user";
import { authRequest, request } from "@/apis";

jest.mock("@/apis", () => ({
  request: jest.fn(),
  authRequest: jest.fn(),
}));

const mockRequest = jest.mocked(request);
const mockAuthRequest = jest.mocked(authRequest);

describe("apis/user", () => {
  const user = { userId: "testId", password: "testPw" };
  const response = { username: "seoko" };

  beforeEach(() => {
    mockRequest.mockReset();
    mockAuthRequest.mockReset();
  });

  it("로그인시 options가 정상적으로 전달되는지 검증한다.", async () => {
    mockRequest.mockResolvedValueOnce(response);

    await expect(signin(user)).resolves.toBe(response);

    expect(mockRequest).toHaveBeenCalledWith("/auth/signin", {
      method: "POST",
      body: JSON.stringify(user),
      credentials: "include",
    });
  });

  it("로그아웃시 options가 정상적으로 전달되는지 검증한다.", async () => {
    await signOut();

    expect(mockAuthRequest).toHaveBeenCalledWith("/auth/signout", {
      method: "POST",
      credentials: "include",
    });
  });

  it("사용자 정보를 조회한다", async () => {
    mockAuthRequest.mockResolvedValueOnce(response);

    await expect(getUser()).resolves.toBe(response);

    expect(mockAuthRequest).toHaveBeenCalledWith("/users");
  });
});
