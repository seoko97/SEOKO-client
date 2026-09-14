import { fireEvent, screen } from "@testing-library/react";

import TitleEditor from "@components/ui/client/write/post/Title";
import { IPostWriteInput } from "@/types";

import { expectPostWriteProperty, renderPostWriteEditor } from "../../../utils/postWrite";

const createInitialData = (): IPostWriteInput => ({
  title: "기존 제목",
  content: "본문",
  thumbnail: "/thumbnail.png",
  tags: [],
});

const renderTitleEditor = () => {
  return renderPostWriteEditor(<TitleEditor />, createInitialData());
};

describe("TitleEditor", () => {
  it("기존 제목 초기값을 표시한다", () => {
    renderTitleEditor();

    expect(screen.getByPlaceholderText("제목을 입력하세요")).toHaveValue("기존 제목");
  });

  it("제목을 변경하면 dataRef에 반영한다", async () => {
    const dataRef = renderTitleEditor();
    const input = screen.getByPlaceholderText("제목을 입력하세요");

    fireEvent.change(input, { target: { value: "변경된 제목" } });

    await expectPostWriteProperty(dataRef, "title", "변경된 제목");
  });
});
