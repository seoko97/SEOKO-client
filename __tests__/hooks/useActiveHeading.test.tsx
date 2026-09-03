import { act, renderHook } from "@testing-library/react";

import { useActiveHeading } from "@/hooks/useActiveHeading";

const createContentRef = (headings: Array<{ id: string; top: () => number }>) => {
  const content = document.createElement("article");

  headings.forEach(({ id, top }) => {
    const heading = document.createElement("h2");

    heading.id = id;
    heading.getBoundingClientRect = () => ({ top: top() }) as DOMRect;
    content.appendChild(heading);
  });

  return { current: content };
};

describe("useActiveHeading", () => {
  const FRAME_ID = 1;

  let rAFCallback: FrameRequestCallback | null;
  let requestAnimationFrameMock: jest.SpyInstance;
  let cancelAnimationFrameMock: jest.SpyInstance;

  const flushAnimationFrame = () => {
    rAFCallback?.(0);
    rAFCallback = null;
  };

  beforeEach(() => {
    rAFCallback = null;

    requestAnimationFrameMock = jest
      .spyOn(global, "requestAnimationFrame")
      .mockImplementation((callback) => {
        rAFCallback = callback;

        return FRAME_ID;
      });
    cancelAnimationFrameMock = jest.spyOn(global, "cancelAnimationFrame").mockImplementation(() => {
      rAFCallback = null;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("header offset 위에 있는 마지막 heading을 활성화한다", () => {
    const contentRef = createContentRef([
      { id: "first", top: () => 80 },
      { id: "second", top: () => 100 },
    ]);
    const headingVersion = "test";
    const { result } = renderHook(() => useActiveHeading(headingVersion, contentRef));

    act(flushAnimationFrame);

    expect(result.current).toBe("second");
  });

  it("첫 heading 이전에서는 활성 heading을 비운다", () => {
    const contentRef = createContentRef([{ id: "first", top: () => 120 }]);
    const headingVersion = "test";
    const { result } = renderHook(() => useActiveHeading(headingVersion, contentRef));

    act(flushAnimationFrame);

    expect(result.current).toBe("");
  });

  it("빠른 스크롤 후 최종 위치의 마지막 heading을 활성화한다", () => {
    const positions = { first: 120, second: 140 };
    const contentRef = createContentRef([
      { id: "first", top: () => positions.first },
      { id: "second", top: () => positions.second },
    ]);
    const headingVersion = "test";
    const { result } = renderHook(() => useActiveHeading(headingVersion, contentRef));

    act(flushAnimationFrame);

    positions.first = 80;
    positions.second = 100;

    act(() => {
      window.dispatchEvent(new Event("scroll"));
      flushAnimationFrame();
    });

    expect(result.current).toBe("second");
  });

  it("effect cleanup 이후에도 다음 scroll에서 frame을 다시 등록한다", () => {
    const contentRef = createContentRef([{ id: "first", top: () => 80 }]);
    const initialHeadingVersion = "initial";
    const nextHeadingVersion = "next";
    const { result, rerender } = renderHook(
      ({ headingVersion }) => useActiveHeading(headingVersion, contentRef),
      { initialProps: { headingVersion: initialHeadingVersion } },
    );

    rerender({ headingVersion: nextHeadingVersion });

    act(flushAnimationFrame);

    const initialRequestCount = requestAnimationFrameMock.mock.calls.length;

    act(() => window.dispatchEvent(new Event("scroll")));

    expect(result.current).toBe("first");
    expect(cancelAnimationFrameMock).toHaveBeenCalledWith(FRAME_ID);
    expect(requestAnimationFrameMock).toHaveBeenCalledTimes(initialRequestCount + 1);
  });

  it("unmount 시 대기 중인 frame을 정리한다", () => {
    const contentRef = createContentRef([{ id: "first", top: () => 80 }]);
    const headingVersion = "test";
    const { unmount } = renderHook(() => useActiveHeading(headingVersion, contentRef));

    unmount();

    expect(cancelAnimationFrameMock).toHaveBeenCalledWith(FRAME_ID);
  });
});
