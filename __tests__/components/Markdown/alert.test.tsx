import { render, screen } from "@testing-library/react";

import Alert from "@components/ui/Markdown/overrides/alert";

const alertTypes = [
  { type: "info", content: "정보" },
  { type: "success", content: "성공" },
  { type: "warning", content: "경고" },
  { type: "danger", content: "위험" },
] as const;

describe("Markdown Alert", () => {
  it.each(alertTypes)("$type type의 콘텐츠를 렌더링한다", ({ type, content }) => {
    render(<Alert type={type}>{content}</Alert>);

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it("잘못된 타입이면 렌더링하지 않는다", () => {
    const content = "error";
    const errorType = "error" as never;

    render(<Alert type={errorType}>{content}</Alert>);

    expect(screen.queryByText(content)).not.toBeInTheDocument();
  });
});
