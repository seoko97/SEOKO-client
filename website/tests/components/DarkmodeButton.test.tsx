import React from "react";
import { render, fireEvent } from "@testing-library/react";

import DarkModeButton from "@/components/DarkModeButton/DarkModeButton";

import "@testing-library/jest-dom";

describe("DarkModeButton", () => {
  beforeAll(() => {
    localStorage.setItem("theme", "light");
  });

  it("버튼 랜더링 테스트", () => {
    const { container: app } = render(<DarkModeButton />);

    const icon = app.querySelector("svg");

    expect(icon).toBeInTheDocument();
  });

  it("버튼 클릭 테스트", () => {
    const { container: app, rerender } = render(<DarkModeButton />);

    let icon = app.querySelector("svg") as unknown as HTMLElement;

    expect(icon.id).toContain("sun-icon");

    fireEvent.click(icon);

    rerender(<DarkModeButton />);

    icon = app.querySelector("svg") as unknown as HTMLElement;

    expect(icon.id).toContain("moon-icon");
  });

  it("mode가 null일 때 테스트", () => {
    localStorage.removeItem("theme");

    const { container: app } = render(<DarkModeButton />);

    expect(app).toBeEmptyDOMElement();

    const icon = app.querySelector("svg");

    expect(icon).not.toBeInTheDocument();
  });
});
