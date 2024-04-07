import React from "react";

import Link from "next/link";

import Image from "@components/ui/core/Image";
import { TProject } from "@/types";

interface IProps {
  projects: TProject[];
}

const ProjectList = ({ projects }: IProps) => {
  return (
    <div className="grid w-full grid-cols-3 items-start gap-5 sm:!grid-cols-1 md:grid-cols-2">
      {projects.map((project) => (
        <Link key={project._id} href={`/project/${project.nid}`}>
          <div className="flex cursor-pointer flex-col items-center justify-start rounded-md bg-secondary text-primary shadow-md transition-[color,background-color,transform,box-shadow] hover:-translate-y-2 hover:shadow-lg">
            <Image
              src={project.thumbnail}
              alt={project.title}
              priority
              className="aspect-default w-full flex-1 rounded-b-md rounded-t-md [&>img]:rounded-b-none"
            />
            <div className="flex w-full flex-col gap-2 whitespace-pre-wrap break-all px-2 py-2 text-primary transition-[color,opacity]">
              <h3 className="truncate text-lg font-bold">{project.title}</h3>
              <div className="truncate text-sm">{project.description}</div>
              <div className="text-xs text-slate-500 transition-[color] dark:text-slate-400">
                {project.start} ~ {project.end ?? "진행중"}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;
