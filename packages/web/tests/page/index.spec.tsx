import React from "react";
import { render, screen } from "@testing-library/react";

import Home from "@/pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("test Home", () => {
    render(<Home />);

    const button = screen.getByRole("button", { name: "버튼" });
    const text = screen.getByText("HOME");

    // 3. heading 변수가 DOM 안에 존재하는지 테스트
    expect(button).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
