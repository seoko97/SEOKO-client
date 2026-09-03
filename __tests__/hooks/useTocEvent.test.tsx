import { act, renderHook } from "@testing-library/react";

import { useTocEvent } from "@/hooks/useTocEvent";

const createContentRef = (id: string, top: number) => {
  const content = document.createElement("article");
  const heading = document.createElement("h2");

  heading.id = id;
  heading.getBoundingClientRect = () => ({ top }) as DOMRect;
  content.appendChild(heading);

  return { current: content };
};

describe("useTocEvent", () => {
  const initialScrollY = Object.getOwnPropertyDescriptor(window, "scrollY");

  let scrollToMock: jest.SpyInstance;

  beforeEach(() => {
    scrollToMock = jest.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  });

  afterEach(() => {
    jest.restoreAllMocks();

    if (initialScrollY) {
      Object.defineProperty(window, "scrollY", initialScrollY);
    }

    window.history.replaceState({}, "", "/");
  });

  it("목차 항목 클릭 시 contentRef 내부 heading으로 스크롤한다", () => {
    const contentRef = createContentRef("first", 300);
    const toc = [{ id: "first", text: "설치", level: 2 }];
    const { result } = renderHook(() => useTocEvent(toc, contentRef));
    const link = document.createElement("a");

    Object.defineProperty(window, "scrollY", { configurable: true, value: 200 });
    link.dataset.id = "first";

    act(() => {
      result.current({ currentTarget: link } as React.MouseEvent<HTMLAnchorElement>);
    });

    expect(scrollToMock).toHaveBeenCalledWith({ top: 420, behavior: "smooth", left: 0 });
  });

  it("클릭한 목차 항목의 heading이 없으면 스크롤하지 않는다", () => {
    const contentRef = createContentRef("introduction", 300);
    const toc = [{ id: "first", text: "설치", level: 2 }];
    const { result } = renderHook(() => useTocEvent(toc, contentRef));
    const link = document.createElement("a");

    link.dataset.id = "first";

    act(() => {
      result.current({ currentTarget: link } as React.MouseEvent<HTMLAnchorElement>);
    });

    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it("contentRef 외부 heading은 스크롤 대상으로 사용하지 않는다", () => {
    const outsideHeading = document.createElement("h2");
    const contentRef = createContentRef("first", 300);
    const toc = [{ id: "first", text: "설치", level: 2 }];
    const { result } = renderHook(() => useTocEvent(toc, contentRef));
    const link = document.createElement("a");

    outsideHeading.id = "first";
    outsideHeading.getBoundingClientRect = () => ({ top: 20 }) as DOMRect;

    document.body.appendChild(outsideHeading);

    link.dataset.id = "first";

    act(() => {
      result.current({ currentTarget: link } as React.MouseEvent<HTMLAnchorElement>);
    });

    expect(scrollToMock).toHaveBeenCalledWith({ top: 220, behavior: "smooth", left: 0 });

    outsideHeading.remove();
  });

  it("유효한 초기 hash가 있으면 해당 heading으로 즉시 스크롤한다", () => {
    const contentRef = createContentRef("first", 300);
    const toc = [{ id: "first", text: "설치", level: 2 }];

    window.history.replaceState({}, "", "/post/1#first");

    renderHook(() => useTocEvent(toc, contentRef));

    expect(scrollToMock).toHaveBeenCalledWith({ top: 220, behavior: "instant", left: 0 });
  });

  it("잘못 인코딩된 초기 hash는 예외 없이 종료한다", () => {
    const contentRef = createContentRef("first", 300);
    const toc = [{ id: "first", text: "설치", level: 2 }];

    window.history.replaceState({}, "", "/post/1#%");

    expect(() => renderHook(() => useTocEvent(toc, contentRef))).not.toThrow();

    expect(scrollToMock).not.toHaveBeenCalled();
  });
});
