import React from "react";

import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import DarkModeButton from "@components/ui/DarkModeButton";

describe("DarkModeButton", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("버튼 랜더링 테스트", () => {
    const { container: app } = render(<DarkModeButton />);

    expect(app).toBeInTheDocument();
  });

  test("버튼 클릭 테스트", async () => {
    const { container: app, rerender } = render(<DarkModeButton />);

    const button = screen.getByRole("button");

    let icon = app.querySelector("svg") as unknown as HTMLElement;

    expect(icon.id).toContain("moon-icon");

    await userEvent.click(button);

    rerender(<DarkModeButton />);

    icon = app.querySelector("svg") as unknown as HTMLElement;

    expect(icon.id).toContain("sun-icon");
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
