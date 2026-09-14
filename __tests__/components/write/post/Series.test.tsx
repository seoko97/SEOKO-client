import { type ReactNode } from "react";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";

import { useGetSeriesQueries } from "@hooks/query/series";
import SeriesEditor from "@components/ui/client/write/post/Series";
import { IPostWriteInput, ISeries } from "@/types";

import { expectPostWriteProperty, renderPostWriteEditor } from "../../../utils/postWrite";

jest.mock("@/hooks/query/series", () => ({
  useGetSeriesQueries: jest.fn(),
}));

jest.mock("@/components/modal/ModalLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => <div role="dialog">{children}</div>,
}));

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
  return renderPostWriteEditor(<SeriesEditor />, createWriteInput(initialSeries));
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

    await expectPostWriteProperty(dataRef, "series", "Frontend");
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  it("기존 시리즈가 없고 목록도 비어 있으면 입력 후 Enter로 시리즈를 추가한다", async () => {
    const user = userEvent.setup();
    const dataRef = renderSeriesEditor();
    mockUseGetSeriesQueries.mockReturnValue({ data: [] } as never);

    await user.click(screen.getByRole("button", { name: "추가" }));
    await user.type(screen.getByRole("textbox"), "DevOps{enter}");

    await expectPostWriteProperty(dataRef, "series", "DevOps");
    expect(screen.getByText("DevOps")).toBeInTheDocument();
  });

  it("기존 시리즈가 있을 때 목록에서 선택한 시리즈로 변경한다", async () => {
    const user = userEvent.setup();
    const dataRef = renderSeriesEditor("Backend");
    mockUseGetSeriesQueries.mockReturnValue({ data: [createSeries("Frontend", 1)] } as never);

    await user.click(screen.getByRole("button", { name: "변경" }));
    await user.click(screen.getByText("Frontend"));
    await user.click(screen.getByRole("button", { name: "확인" }));

    await expectPostWriteProperty(dataRef, "series", "Frontend");
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.queryByText("Backend")).not.toBeInTheDocument();
  });

  it("제거 버튼을 누르면 기존 시리즈를 제거한다", async () => {
    const user = userEvent.setup();
    const dataRef = renderSeriesEditor("Backend");

    await user.click(screen.getByRole("button", { name: "제거" }));

    await expectPostWriteProperty(dataRef, "series", undefined);
    expect(screen.queryByText("Backend")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "추가" })).toBeInTheDocument();
  });
});
