import { type RefObject, useEffect } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import TitleEditor from "@components/ui/client/write/post/Title";
import { IPostWriteInput } from "@/types";
import { PostWriteProvider, usePostWriteContext } from "@/context/PostWriteContext";

interface IContextProbeProps {
  onReady: (dataRef: RefObject<IPostWriteInput>) => void;
}

const ContextProbe = ({ onReady }: IContextProbeProps) => {
  const { dataRef } = usePostWriteContext();

  useEffect(() => {
    onReady(dataRef);
  }, [dataRef, onReady]);

  return null;
};

const createInitialData = (): IPostWriteInput => ({
  title: "기존 제목",
  content: "본문",
  thumbnail: "/thumbnail.png",
  tags: [],
});

const renderTitleEditor = () => {
  let dataRef: RefObject<IPostWriteInput> | null = null;

  render(
    <PostWriteProvider initialData={createInitialData()}>
      <TitleEditor />
      <ContextProbe onReady={(ref) => (dataRef = ref)} />
    </PostWriteProvider>,
  );

  if (!dataRef) {
    throw new Error("PostWriteContext dataRef를 찾을 수 없습니다.");
  }

  return dataRef;
};

const expectTitle = async (dataRef: RefObject<IPostWriteInput>, expectedTitle?: string) => {
  await waitFor(() => {
    expect(dataRef.current?.title).toBe(expectedTitle);
  });
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

    await expectTitle(dataRef, "변경된 제목");
  });
});
