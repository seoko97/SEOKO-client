import { EImageType } from "@/types/base";
import { uploadImage } from "@/apis/image";
import { authRequest } from "@/apis";

jest.mock("@/apis", () => ({
  authRequest: jest.fn(),
}));

const mockAuthRequest = jest.mocked(authRequest);

describe("apis/image", () => {
  beforeEach(() => {
    mockAuthRequest.mockReset();
  });

  it("이미지를 FormData와 text 응답 옵션으로 업로드한다", async () => {
    const formData = new FormData();
    const imageUrl = "https://image.toast.com/uploaded-image.png";

    formData.append("image", new Blob(["image"]), "image.png");
    mockAuthRequest.mockResolvedValueOnce(imageUrl);

    await expect(uploadImage(EImageType.POST, formData)).resolves.toBe(imageUrl);

    expect(mockAuthRequest).toHaveBeenCalledTimes(1);
    expect(mockAuthRequest).toHaveBeenCalledWith("/images/post", {
      method: "POST",
      body: formData,
      responseType: "text",
    });
  });
});
