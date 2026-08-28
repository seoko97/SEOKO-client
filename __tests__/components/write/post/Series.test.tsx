import { type ReactNode, type RefObject, useEffect } from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";

import { useGetSeriesQueries } from "@hooks/query/series";
import SeriesEditor from "@components/ui/client/write/post/Series";
import { IPostWriteInput, ISeries } from "@/types";
import { PostWriteProvider, usePostWriteContext } from "@/context/PostWriteContext";

jest.mock("@/hooks/query/series", () => ({
  useGetSeriesQueries: jest.fn(),
}));

jest.mock("@/components/modal/ModalLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => <div role="dialog">{children}</div>,
}));

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

const mockUseGetSeriesQueries = jest.mocked(useGetSeriesQueries);

const createSeries = (name: string, index: number): ISeries => ({
  _id: `series-${index}`,
  nid: index,
  name,
  thumbnail: `/series-${index}.png`,
  posts: [],
  postCount: 0,
  createdAt: "2026-08-28",
  updatedAt: "2026-08-28",
});

const createWriteInput = (series?: string): IPostWriteInput => ({
  title: "제목",
  content: "본문",
  thumbnail: "/thumbnail.png",
  tags: [],
  series,
});

const renderSeriesEditor = (initialSeries?: string) => {
  let dataRef: RefObject<IPostWriteInput> | null = null;

  render(
    <PostWriteProvider initialData={createWriteInput(initialSeries)}>
      <SeriesEditor />
      <ContextProbe onReady={(ref) => (dataRef = ref)} />
    </PostWriteProvider>,
  );

  if (!dataRef) {
    throw new Error("PostWriteContext dataRef를 찾을 수 없습니다.");
  }

  return dataRef;
};

const expectSeries = async (dataRef: RefObject<IPostWriteInput>, expectedSeries?: string) => {
  await waitFor(() => {
    expect(dataRef.current?.series).toBe(expectedSeries);
  });
};

describe("SeriesEditor", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("기존 시리즈가 없을 때 목록에서 선택한 시리즈를 추가한다", async () => {
    const user = userEvent.setup();
    const dataRef = renderSeriesEditor();
    mockUseGetSeriesQueries.mockReturnValue({ data: [createSeries("Frontend", 1)] } as never);

    await user.click(screen.getByRole("button", { name: "추가" }));
    await user.click(screen.getByText("Frontend"));
    await user.click(screen.getByRole("button", { name: "확인" }));

    await expectSeries(dataRef, "Frontend");
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  it("기존 시리즈가 없고 목록도 비어 있으면 입력 후 Enter로 시리즈를 추가한다", async () => {
    const user = userEvent.setup();
    const dataRef = renderSeriesEditor();
    mockUseGetSeriesQueries.mockReturnValue({ data: [] } as never);

    await user.click(screen.getByRole("button", { name: "추가" }));
    await user.type(screen.getByRole("textbox"), "DevOps{enter}");

    await expectSeries(dataRef, "DevOps");
    expect(screen.getByText("DevOps")).toBeInTheDocument();
  });

  it("기존 시리즈가 있을 때 목록에서 선택한 시리즈로 변경한다", async () => {
    const user = userEvent.setup();
    const dataRef = renderSeriesEditor("Backend");
    mockUseGetSeriesQueries.mockReturnValue({ data: [createSeries("Frontend", 1)] } as never);

    await user.click(screen.getByRole("button", { name: "변경" }));
    await user.click(screen.getByText("Frontend"));
    await user.click(screen.getByRole("button", { name: "확인" }));

    await expectSeries(dataRef, "Frontend");
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.queryByText("Backend")).not.toBeInTheDocument();
  });

  it("제거 버튼을 누르면 기존 시리즈를 제거한다", async () => {
    const user = userEvent.setup();
    const dataRef = renderSeriesEditor("Backend");

    await user.click(screen.getByRole("button", { name: "제거" }));

    await expectSeries(dataRef);
    expect(screen.queryByText("Backend")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "추가" })).toBeInTheDocument();
  });
});
