/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";

import { useGetUserQuery } from "@hooks/query/user";
import { useDeleteProjectMutation } from "@hooks/query/project";
import ProjectHeader from "@components/ui/ProjectHeader";
import type { TProject } from "@/types";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("@/hooks/query/project", () => ({
  useDeleteProjectMutation: jest.fn(),
}));

jest.mock("@/hooks/query/user", () => ({
  useGetUserQuery: jest.fn(),
}));

jest.mock("@/components/ui/core/Image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

const mockUseDeleteProjectMutation = jest.mocked(useDeleteProjectMutation);
const mockUseGetUserQuery = jest.mocked(useGetUserQuery);

const project: TProject = {
  _id: "project-id",
  nid: 1,
  title: "title",
  description: "description",
  content: "content",
  thumbnail: "/thumbnail.png",
  github: "https://github.com/seoko/project",
  page: null,
  start: "2025.01",
  end: "2025.03",
  createdAt: "2025-01-01",
  updatedAt: "2025-01-01",
};

describe("ProjectHeader", () => {
  beforeEach(() => {
    mockUseGetUserQuery.mockReturnValue({ data: null } as ReturnType<typeof useGetUserQuery>);
    mockUseDeleteProjectMutation.mockReturnValue({ mutate: jest.fn() } as unknown as ReturnType<
      typeof useDeleteProjectMutation
    >);
  });

  it("완료된 프로젝트의 시작일과 종료일을 표시한다", () => {
    render(<ProjectHeader project={project} />);

    expect(screen.getByText(project.start)).toBeInTheDocument();
    expect(screen.getByText(project.end!)).toBeInTheDocument();
  });

  it("종료일이 없으면 진행중으로 표시한다", () => {
    render(<ProjectHeader project={{ ...project, end: null }} />);

    expect(screen.getByText("진행중")).toBeInTheDocument();
  });

  it("GitHub 링크를 새 탭으로 렌더링한다", () => {
    render(<ProjectHeader project={project} />);

    const githubLink = screen
      .getAllByRole("link")
      .find((link) => link.getAttribute("href") === project.github);

    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noreferrer");
  });

  it("페이지 주소가 있을 때만 프로젝트 페이지 링크를 렌더링한다", () => {
    const page = "https://seoko.blog";
    const { rerender } = render(<ProjectHeader project={project} />);

    expect(screen.getAllByRole("link")).toHaveLength(1);

    rerender(<ProjectHeader project={{ ...project, page }} />);

    const pageLink = screen.getAllByRole("link").find((link) => link.getAttribute("href") === page);

    expect(pageLink).toHaveAttribute("target", "_blank");
    expect(pageLink).toHaveAttribute("rel", "noreferrer");
  });
});
