/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";

import MarkdownImage from "@components/ui/Markdown/overrides/img";

const mockOptimizedImageTestId = "optimized-image";
const regularImage = {
  src: "https://example.com/image.png",
  alt: "일반 이미지",
};
const toastImage = {
  src: "https://image.toast.com/image.png",
  alt: "Toast 이미지",
};

jest.mock("@/components/ui/core/Image", () => ({
  __esModule: true,
  default: ({ src, alt, loading }: { src: string; alt: string; loading: string }) => (
    <img data-testid={mockOptimizedImageTestId} src={src} alt={alt} data-loading={loading} />
  ),
}));

describe("Markdown image", () => {
  it("src가 없으면 렌더링하지 않는다", () => {
    const { container } = render(<MarkdownImage src="" alt="이미지" />);

    expect(container).toBeEmptyDOMElement();
  });

  it("일반 이미지 URL은 img 태그로 렌더링한다", () => {
    render(<MarkdownImage {...regularImage} />);

    const image = screen.getByRole("img", { name: regularImage.alt });

    expect(image).toHaveAttribute("src", regularImage.src);
    expect(image).not.toHaveAttribute("data-testid", mockOptimizedImageTestId);
  });

  it("Toast 이미지 URL은 공통 Image와 캡션으로 렌더링한다", () => {
    render(<MarkdownImage {...toastImage} />);

    const image = screen.getByTestId(mockOptimizedImageTestId);

    expect(image).toHaveAttribute("src", toastImage.src);
    expect(image).toHaveAttribute("alt", toastImage.alt);
    expect(image).toHaveAttribute("data-loading", "lazy");
    expect(screen.getByText(toastImage.alt)).toBeInTheDocument();
  });
});
