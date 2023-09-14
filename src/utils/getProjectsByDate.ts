import { TProject } from "@/types";

interface IProjectsByDate {
  [key: string]: TProject[];
}

const getProjectsByDate = (projects: TProject[] | undefined): IProjectsByDate => {
  if (!projects) return {};

  return projects.reduce<IProjectsByDate>((acc, project) => {
    const startYear = new Date(project.start).getFullYear();

    if (!acc[startYear]) acc[startYear] = [];

    acc[startYear].push(project);

    return acc;
  }, {});
};

export { getProjectsByDate };
