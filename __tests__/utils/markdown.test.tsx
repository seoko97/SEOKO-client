jest.mock("@/components/ui/Markdown/overrides", () => ({
  __esModule: true,
  default: {},
}));

import { createHeadingSlug, extractToc } from "@/utils/markdown";

describe("createHeadingSlug", () => {
  it("같은 제목에 순서대로 suffix를 붙인다", () => {
    const slugify = createHeadingSlug();

    expect(slugify("Title")).toBe("title");
    expect(slugify("Title")).toBe("title-2");
  });

  it("공백과 특수문자를 slug로 변환한다", () => {
    const slugify = createHeadingSlug();

    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  it("빈 slug에는 heading을 사용한다", () => {
    const slugify = createHeadingSlug();

    expect(slugify("!!!")).toBe("heading");
  });

  it("Markdown 문법을 제거한 제목을 slug로 변환한다", () => {
    const slugify = createHeadingSlug();

    expect(slugify("**Hello** _World_")).toBe("hello-world");
  });
});

describe("extractToc", () => {
  it("h1부터 h3까지의 제목을 입력 순서대로 목차 데이터로 변환한다", () => {
    const headings = [
      <h1 id="first" key="first">
        First
      </h1>,
      <h2 id="second" key="second">
        Second
      </h2>,
      <h3 id="third" key="third">
        Third
      </h3>,
    ];

    expect(extractToc(headings)).toEqual([
      { id: "first", text: "First", level: 0 },
      { id: "second", text: "Second", level: 1 },
      { id: "third", text: "Third", level: 2 },
    ]);
  });

  it("일반 요소와 h4부터 h6까지의 제목은 목차에서 제외한다", () => {
    const content = [
      <p key="paragraph">Paragraph</p>,
      <h4 key="fourth">Fourth</h4>,
      <h5 key="fifth">Fifth</h5>,
      <h6 key="sixth">Sixth</h6>,
    ];

    expect(extractToc(content)).toEqual([]);
  });

  it("id가 없으면 제목 기반 ID를 사용하고 빈 제목에는 heading을 사용한다", () => {
    const headings = [<h1 key="title">Hello, World!</h1>, <h2 key="empty">!!!</h2>];

    expect(extractToc(headings)).toEqual([
      { id: "hello-world", text: "Hello, World!", level: 0 },
      { id: "heading", text: "!!!", level: 1 },
    ]);
  });

  it("중첩된 React 요소의 텍스트를 목차 제목으로 추출한다", () => {
    const headings = [
      <h2 id="react-guide" key="react-guide">
        <strong>React</strong>Guide
      </h2>,
    ];

    expect(extractToc(headings)).toEqual([{ id: "react-guide", text: "React Guide", level: 1 }]);
  });
});
