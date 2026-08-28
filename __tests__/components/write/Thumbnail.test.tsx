import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";

import Thumbnail from "@components/ui/client/write/Thumbnail";
import { EImageType } from "@/types/base";

const DEFAULT_IMAGE = "/SEOKO.png";
const UPLOADED_IMAGE = "/uploaded-thumbnail.png";
const mockSetThumbnail = jest.fn();

jest.mock("@/hooks/query/image", () => {
  const { useState } = jest.requireActual("react") as typeof import("react");

  return {
    useUploadImage: ({ defaultImg }: { defaultImg?: string }) => {
      const [image, setImage] = useState(defaultImg || "/SEOKO.png");

      return {
        image,
        changeImage: () => setImage("/uploaded-thumbnail.png"),
        clearImage: () => setImage("/SEOKO.png"),
      };
    },
  };
});

jest.mock("@/components/ui/core/Image", () => ({
  __esModule: true,
  default: ({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) => (
    <img src={src} alt={alt} onClick={onClick} />
  ),
}));

const renderThumbnail = (defaultValue = "") => {
  return render(
    <Thumbnail
      defaultValue={defaultValue}
      setThumbnail={mockSetThumbnail}
      type={EImageType.POST}
    />,
  );
};

const getFileInput = () => {
  const input = document.querySelector<HTMLInputElement>('input[type="file"]');

  if (!input) {
    throw new Error("썸네일 파일 input을 찾을 수 없습니다.");
  }

  return input;
};

const expectThumbnail = async (expectedThumbnail: string) => {
  await waitFor(() => {
    expect(screen.getByAltText("thumbnail")).toHaveAttribute("src", expectedThumbnail);
    expect(mockSetThumbnail).toHaveBeenLastCalledWith(expectedThumbnail);
  });
};

describe("Thumbnail", () => {
  beforeEach(() => {
    mockSetThumbnail.mockClear();
  });

  it("썸네일 초기값이 없으면 기본 이미지를 표시하고 상위 setter에 전달한다", async () => {
    renderThumbnail();

    await expectThumbnail(DEFAULT_IMAGE);
  });

  it("파일 input 변경 후 업로드된 이미지 주소를 표시하고 상위 setter에 전달한다", async () => {
    const user = userEvent.setup();
    renderThumbnail();
    const image = new File(["thumbnail"], "thumbnail.png", { type: "image/png" });

    await user.upload(getFileInput(), image);

    await expectThumbnail(UPLOADED_IMAGE);
  });

  it("변경된 이미지를 클릭하면 기본 이미지로 되돌리고 상위 setter에 전달한다", async () => {
    const user = userEvent.setup();
    renderThumbnail();
    const image = new File(["thumbnail"], "thumbnail.png", { type: "image/png" });

    await user.upload(getFileInput(), image);
    await expectThumbnail(UPLOADED_IMAGE);

    await user.click(screen.getByAltText("thumbnail"));

    await expectThumbnail(DEFAULT_IMAGE);
  });
});
