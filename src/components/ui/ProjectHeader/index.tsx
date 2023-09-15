import React from "react";

import { useRouter } from "next/navigation";

import { useGetUserQuery } from "@hooks/query/user";
import { useDeleteProjectMutation } from "@hooks/query/project";
import Navigation from "@components/ui/Navigation";
import Image from "@components/ui/core/Image";
import { GithubIcon, LinkIcon } from "@components/icons";
import { TProject } from "@/types";

interface IProps {
  project: TProject;
}

const ProjectHeader = ({ project }: IProps) => {
  const router = useRouter();
  const { data: username } = useGetUserQuery();
  const { mutate: deleteProjectMutate } = useDeleteProjectMutation(project.nid);

  if (!project) return null;

  const { nid, title, description, start, end, github, thumbnail, page } = project;

  const editProject = () => {
    router.push(`/write/project/${nid}`);
  };

  const deleteProject = () => {
    const conf = confirm("삭제하시겠습니까?");

    if (!conf) return;

    deleteProjectMutate();
  };

  return (
    <header className="mt-8 flex w-[theme(screens.md.max)] flex-col items-center justify-center gap-3 break-all md:w-full">
      <Image src={thumbnail} alt="project-thumbnail" />
      <h1 className="text-xl font-bold text-primary transition-[color]">{title}</h1>
      <p className="text-sm text-slate-500 transition-[color] dark:text-slate-400">{description}</p>
      <div className="text-sm text-slate-500 transition-[color] dark:text-slate-400">
        <span>{start}</span>
        <span className="mx-2">~</span>
        <span>{end ?? "진행중"}</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        {page && (
          <a target="_blank" href={page} rel="noreferrer">
            <LinkIcon className="fill-[theme(textColor.secondary)] transition-[fill] hover:fill-[theme(textColor.effect1)]" />
          </a>
        )}
        <a target="_blank" href={github} rel="noreferrer">
          <GithubIcon className="fill-[theme(textColor.secondary)] transition-[fill] hover:fill-[theme(textColor.effect1)]" />
        </a>
      </div>
      {username && <Navigation onDelete={deleteProject} onEdit={editProject} />}
    </header>
  );
};

export default ProjectHeader;
