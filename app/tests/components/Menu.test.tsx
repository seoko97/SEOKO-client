import React from "react";

import "@testing-library/jest-dom";
import PageMenu from "@components/ui/molecules/Menu/Page/List";

import { render } from "../utils/theme";

describe("Menu", () => {
  it("메뉴 랜더링 테스트", () => {
    const { container: app } = render(<PageMenu isSign={true} />);

    expect(app).toBeInTheDocument();
  });

  it("메뉴 로그인 시", async () => {
    const { getAllByRole } = render(<PageMenu isSign={true} />);

    const list = getAllByRole("listitem");

    expect(list).toHaveLength(3);
    expect(list[list.length - 1]).not.toHaveTextContent(/로그인/gi);
  });

  it("메뉴 로그아웃 시", async () => {
    const { getAllByRole } = render(<PageMenu isSign={false} />);

    const list = getAllByRole("listitem");

    expect(list).toHaveLength(4);
    expect(list[list.length - 1]).toHaveTextContent(/로그인/gi);
  });
});
