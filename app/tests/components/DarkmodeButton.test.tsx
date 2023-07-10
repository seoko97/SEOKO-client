import React from "react";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";

import DarkModeButton from "@components/ui/molecules/DarkModeButton";

import "@testing-library/jest-dom";
import { render } from "../utils/theme";

describe("DarkModeButton", () => {
  beforeAll(() => {
    localStorage.setItem("theme", "light");
  });

  afterAll(() => {
    localStorage.removeItem("theme");
  });

  it("버튼 랜더링 테스트", () => {
    const { container: app } = render(<DarkModeButton />);

    expect(app).toBeInTheDocument();
  });

  it("버튼 클릭 테스트", async () => {
    const { container: app, rerender } = render(<DarkModeButton />);

    const button = screen.getByRole("button");

    let icon = app.querySelector("svg") as unknown as HTMLElement;

    expect(icon.id).toContain("moon-icon");

    await userEvent.click(button);

    rerender(<DarkModeButton />);

    icon = app.querySelector("svg") as unknown as HTMLElement;

    expect(icon.id).toContain("sun-icon");
  });

  it("mode가 null일 때 테스트", () => {
    localStorage.removeItem("theme");

    const { container: app } = render(<DarkModeButton />);

    expect(app).toBeEmptyDOMElement();

    const icon = app.querySelector("svg");

    expect(icon).not.toBeInTheDocument();
  });
});
