import SkillList from "@components/ui/SkillList";
import SkillEditor from "@components/ui/client/about/SkillEditor";
import SectionHeader from "@components/ui/client/about/SectionHeader";
import SkillHydrate from "@components/pages/About/SkillHydrate";
import { ESkillType } from "@/types/skill";
import { getUserOrNull } from "@/apis/user";
import { getSkills } from "@/apis/skill";

const skillSections: Array<[ESkillType, string]> = [
  [ESkillType.LANGUAGE, "Language"],
  [ESkillType.FRONT_END, "FrontEnd"],
  [ESkillType.BACK_END, "BackEnd"],
  [ESkillType.DEV_OPS, "DevOps"],
];

const Skill = async () => {
  const user = await getUserOrNull();

  if (user) {
    return (
      <SkillHydrate>
        <SkillEditor />
      </SkillHydrate>
    );
  }

  const skills = await getSkills();

  return (
    <section className="flex w-full flex-col">
      <SectionHeader>Skill</SectionHeader>
      {skillSections.map(([type, title]) => (
        <SkillList key={type} skills={skills[type]} type={title} />
      ))}
    </section>
  );
};

export default Skill;
