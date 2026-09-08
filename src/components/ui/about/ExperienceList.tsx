import { IExperience } from "@/types/experience";

interface IProps {
  experiences: IExperience[];
  onClick?: (experience: IExperience) => void;
}

const ExperienceList = ({ experiences, onClick }: IProps) => {
  return (
    <div className="flex w-full flex-col gap-9 text-primary transition-[color]">
      {experiences.map((experience) => (
        <div key={experience._id} className="flex w-full gap-7 sm:flex-col">
          <div className="flex w-[220px] flex-col gap-3 sm:w-full">
            <h3 className="text-2xl font-medium">{experience.title}</h3>
            <p className="mt-1 text-sm font-light text-slate-500 transition-[color] dark:text-slate-400">
              {experience.start} ~ {experience.end ?? "진행중"}
            </p>
          </div>
          <ul
            className="flex h-fit flex-1 list-inside list-disc flex-col gap-2 whitespace-pre-wrap text-sm"
            onClick={onClick ? () => onClick(experience) : undefined}
          >
            {experience.description.split("\n").map((description, index) => (
              <li key={description + index} className="marker:text-main marker:transition-[color]">
                {description}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExperienceList;
