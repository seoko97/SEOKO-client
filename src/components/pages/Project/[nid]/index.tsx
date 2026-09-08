import { notFound } from "next/navigation";

import { compileMarkdown } from "@utils/markdown";
import getOrNotFound from "@utils/getOrNotFound";
import ProjectHeader from "@components/ui/client/project/ProjectHeader";
import { getProject } from "@/apis/project";

type TProps = Pick<PageProps<"/project/[nid]">, "params">;

const Project = async ({ params }: TProps) => {
  const { nid: paramNid } = await params;
  const nid = Number(paramNid);

  if (isNaN(nid)) return notFound();

  const project = await getOrNotFound(() => getProject(nid));

  const markdown = compileMarkdown(project.content);

  return (
    <section className="frame flex w-[theme(screens.xl.max)] flex-col items-center xl:w-full">
      <ProjectHeader project={project} />
      <div className="relative my-6 flex w-full justify-center">
        <div className="markdown w-full max-w-[theme(screens.lg.max)] md:w-full">{markdown}</div>
      </div>
    </section>
  );
};

export default Project;
