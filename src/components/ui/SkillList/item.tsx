import React from "react";

import Image from "next/image";

import { ISkill } from "@/types/skill";

interface IProps {
  skill: ISkill;
  onClick: ((data: ISkill) => void) | null;
  className?: string;
}

const SkillItem = ({ skill, onClick, className = "" }: IProps) => {
  return (
    <li
      onClick={onClick ? () => onClick(skill) : () => undefined}
      className={`flex w-full items-center gap-4 text-primary transition-[color] md:flex-col md:items-start ${className}`}
    >
      <div className="flex min-w-max items-center gap-4">
        <span className="text-2xl md:hidden">•</span>
        <div className="relative items-center justify-center rounded-md border border-slate-300 bg-tertiary transition-[background-color,border] dark:border-slate-500">
          <Image
            src={skill.icon}
            alt={skill.name}
            width={32}
            height={32}
            className="m-1 rounded-sm"
          />
        </div>
        <h3 className="font-medium">{skill.name}</h3>
      </div>

      <p className="gap-4 whitespace-pre-line break-all text-sm font-light">{skill.description}</p>
    </li>
  );
};

export default SkillItem;
