import React, { useMemo } from "react";

import SkillImage from "@components/ui/core/SkillImage";
import { ISkill } from "@/types/skill";

interface IProps {
  skills: ISkill[];
  onClick: ((data: ISkill) => void) | null;
  type: string;
}

const SkillList = ({ skills = [], onClick, type }: IProps) => {
  const isAdmin = useMemo(() => Boolean(onClick), [onClick]);

  const CURSOR = isAdmin ? "cursor-pointer" : "";

  const filteredSkills = useMemo(
    () =>
      skills.filter((skill) => {
        return !!skill.description;
      }),
    [skills],
  );

  return (
    <div className="flex w-full flex-col items-start gap-4 [&:not(:last-child)]:mb-12">
      <h3 className="h-fit text-xl font-bold text-primary transition-[color]">{type}</h3>
      <ul className="flex w-full flex-1 list-inside list-disc flex-col flex-wrap gap-4 marker:text-primary marker:transition-[color] sm:justify-around md:gap-6">
        {filteredSkills.map((skill) => (
          <li
            key={skill._id}
            onClick={isAdmin && onClick ? () => onClick(skill) : undefined}
            className={`flex w-full items-center gap-4 text-primary transition-[color] md:flex-col md:items-start ${CURSOR}`}
          >
            <div className="flex min-w-max items-center gap-4">
              <span className="text-2xl text-slate-600 transition-[color] dark:text-slate-300 md:hidden">
                •
              </span>
              <SkillImage priority src={skill.icon} alt={skill.name} />
              <h3 className="font-medium">{skill.name}</h3>
            </div>
            <p className="gap-4 whitespace-pre-line break-all text-slate-600 transition-[color] dark:text-slate-300">
              {skill.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillList;
