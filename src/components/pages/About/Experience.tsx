import SectionHeader from "@components/ui/client/about/SectionHeader";
import ExperienceEditor from "@components/ui/client/about/ExperienceEditor";
import ExperienceList from "@components/ui/about/ExperienceList";
import ExperienceHydrate from "@components/pages/About/ExperienceHydrate";
import { getUserOrNull } from "@/apis/user";
import { getExperiences } from "@/apis/experience";

const Experience = async () => {
  const user = await getUserOrNull();

  if (user) {
    return (
      <ExperienceHydrate>
        <ExperienceEditor />
      </ExperienceHydrate>
    );
  }

  const experiences = await getExperiences();

  return (
    <section className="flex w-full flex-col">
      <SectionHeader>Experience</SectionHeader>
      <ExperienceList experiences={experiences} />
    </section>
  );
};

export default Experience;
