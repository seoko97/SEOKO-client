import { getProjectsByDate } from "@utils/getProjectsByDate";
import ProjectList from "@components/ui/ProjectList";
import { getProjects } from "@/apis/project";

const Project = async () => {
  const projects = await getProjects();

  const filteredProjects = getProjectsByDate(projects);
  const yearsBtProject = Object.keys(filteredProjects).sort((a, b) => (a > b ? -1 : 1));

  return (
    <section className="frame mb-8 flex flex-col gap-8">
      <div className="w-full px-0 py-4">
        <h1 className="mb-1 text-4xl font-bold text-primary transition-[color]">
          PROJECT
          <span className="ml-4 align-top text-sm font-normal">{projects.length} projects</span>
        </h1>
        <p className="text-slate-500 transition-[color] dark:text-slate-400">
          연도별로 진행한 프로젝트 목록입니다.
        </p>
      </div>
      <div>
        {yearsBtProject.map((year) => (
          <div key={year} className="flex w-full flex-col gap-4 [&:not(:last-child)]:mb-8">
            <h2 className="last text-2xl font-bold">
              <span className="text-primary transition-[color]">{year}</span>
              <span className="ml-4 align-top text-sm font-normal text-slate-500 transition-[color] dark:text-slate-400">
                {filteredProjects[year].length} projects
              </span>
            </h2>
            <ProjectList projects={filteredProjects[year]} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;
