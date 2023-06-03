import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { TDarkMode } from "@/hooks/useDarkMode";
import DarkModeButton from "@/components/DarkModeButton/DarkModeButton";

import "@testing-library/jest-dom";

describe("DarkmodeButton", () => {
  const mode: TDarkMode = "light";

  it("버튼 랜더링 테스트", () => {
    const onClickMock = jest.fn();
    const { container: app } = render(<DarkModeButton mode={mode} onClick={onClickMock} />);

    const icon = app.querySelector("svg");

    expect(icon).toBeInTheDocument();
  });

  it("버튼 클릭 테스트", () => {
    let mode: TDarkMode = "light";

    const onClickMock = jest.fn(() => {
      mode = mode === "light" ? "dark" : "light";
    });

    const { container: app, rerender } = render(
      <DarkModeButton mode={mode} onClick={onClickMock} />,
    );

    let icon = app.querySelector("svg") as unknown as HTMLElement;

    expect(icon.id).toContain("sun-icon");

    fireEvent.click(icon);

    rerender(<DarkModeButton mode={mode} onClick={onClickMock} />);

    icon = app.querySelector("svg") as unknown as HTMLElement;

    expect(icon.id).toContain("moon-icon");
    expect(onClickMock).toHaveBeenCalled();
  });

  it("mode가 null일 때 테스트", () => {
    const onClickMock = jest.fn();

    const { container: app } = render(<DarkModeButton onClick={onClickMock} />);

    expect(app).toBeEmptyDOMElement();

    const icon = app.querySelector("svg");

    expect(icon).not.toBeInTheDocument();
  });
});
