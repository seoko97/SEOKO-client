import React, { useMemo } from "react";

import SkillItem from "@components/ui/SkillList/item";
import { ISkill } from "@/types/skill";

interface IProps {
  skills: ISkill[];
  onClick: ((data: ISkill) => void) | null;
  type: string;
}

const SkillList = ({ skills = [], onClick, type }: IProps) => {
  const isAdmin = useMemo(() => Boolean(onClick), [onClick]);

  return (
    <div className="flex w-full flex-col items-start gap-4 [&:not(:last-child)]:mb-12">
      <h3 className="h-fit text-lg font-bold text-primary transition-[color]">{type}</h3>
      <ul className="flex w-full flex-1 list-inside list-disc flex-col flex-wrap gap-4 marker:text-primary marker:transition-[color] sm:justify-around md:gap-6">
        {skills.map((skill) => (
          <SkillItem
            key={skill._id + Math.random()}
            skill={skill}
            onClick={onClick}
            className={isAdmin ? "cursor-pointer" : ""}
          />
        ))}
      </ul>
    </div>
  );
};

export default SkillList;
