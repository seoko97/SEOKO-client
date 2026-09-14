import SkillImage from "@components/ui/client/about/SkillImage";
import { ISkill } from "@/types/skill";

interface IProps {
  skills: ISkill[];
  onClick?: (data: ISkill) => void;
  type: string;
}

const SkillList = ({ skills = [], onClick, type }: IProps) => {
  const cursor = onClick ? "cursor-pointer" : "";
  const filteredSkills = skills.filter((skill) => skill.description);

  return (
    <div className="flex w-full flex-col items-start gap-4 [&:not(:last-child)]:mb-12">
      <h3 className="h-fit text-xl font-bold text-primary transition-[color]">{type}</h3>
      <ul className="flex w-full flex-1 list-inside list-disc flex-col flex-wrap gap-4 marker:text-primary marker:transition-[color] sm:justify-around md:gap-6">
        {filteredSkills.map((skill) => (
          <li
            key={skill._id}
            onClick={onClick ? () => onClick(skill) : undefined}
            className={`flex w-full items-center gap-4 text-primary transition-[color] md:flex-col md:items-start ${cursor}`}
          >
            <div className="flex min-w-max items-center gap-4">
              <span className="text-2xl text-slate-600 transition-[color] dark:text-slate-300 md:hidden">
                •
              </span>
              <SkillImage src={skill.icon} alt={skill.name} />
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
