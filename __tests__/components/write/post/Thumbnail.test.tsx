import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";

import ThumbnailEditor from "@components/ui/client/write/post/Thumbnail";
import { IPostWriteInput } from "@/types";

import {
  expectPostWriteProperty,
  renderPostWriteEditor,
  TPostWriteDataRef,
} from "../../../utils/postWrite";

const DEFAULT_IMAGE = "/SEOKO.png";
const UPLOADED_IMAGE = "/uploaded-thumbnail.png";

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

const renderThumbnailEditor = (thumbnail = "") => {
  const initialData: IPostWriteInput = { title: "제목", content: "본문", tags: [], thumbnail };

  return renderPostWriteEditor(<ThumbnailEditor />, initialData);
};

const getFileInput = () => {
  const input = document.querySelector<HTMLInputElement>('input[type="file"]');

  if (!input) {
    throw new Error("썸네일 파일 input을 찾을 수 없습니다.");
  }

  return input;
};

const expectThumbnail = async (dataRef: TPostWriteDataRef, expectedThumbnail: string) => {
  await waitFor(() => {
    expect(screen.getByAltText("thumbnail")).toHaveAttribute("src", expectedThumbnail);
  });

  await expectPostWriteProperty(dataRef, "thumbnail", expectedThumbnail);
};

describe("ThumbnailEditor", () => {
  it("썸네일 초기값이 없으면 기본 이미지를 표시한다", async () => {
    const dataRef = renderThumbnailEditor();

    await expectThumbnail(dataRef, DEFAULT_IMAGE);
  });

  it("파일 input 변경 후 업로드된 이미지 주소를 표시한다", async () => {
    const user = userEvent.setup();
    const dataRef = renderThumbnailEditor();
    const image = new File(["thumbnail"], "thumbnail.png", { type: "image/png" });

    await user.upload(getFileInput(), image);

    await expectThumbnail(dataRef, UPLOADED_IMAGE);
  });

  it("변경된 이미지를 클릭하면 기본 이미지로 되돌린다", async () => {
    const user = userEvent.setup();
    const dataRef = renderThumbnailEditor();
    const image = new File(["thumbnail"], "thumbnail.png", { type: "image/png" });

    await user.upload(getFileInput(), image);
    await expectThumbnail(dataRef, UPLOADED_IMAGE);

    await user.click(screen.getByAltText("thumbnail"));

    await expectThumbnail(dataRef, DEFAULT_IMAGE);
  });
});
