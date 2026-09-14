"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

import useModal from "@hooks/useModal";
import { useGetExperiencesQuery } from "@hooks/query/experience";
import SectionHeader from "@components/ui/client/about/SectionHeader";
import ExperienceList from "@components/ui/about/ExperienceList";
import { IExperience } from "@/types/experience";

const ExperienceForm = dynamic(() => import("@components/modal/about/ExperienceForm"));

const ExperienceEditor = () => {
  const { data: experiences = [] } = useGetExperiencesQuery();

  const [selectedExperience, setSelectedExperience] = useState<IExperience | null>(null);
  const [isOpen, onOpen, onClose] = useModal();

  const onClickExperience = (data: IExperience | null = null) => {
    onOpen();
    setSelectedExperience(data);
  };

  return (
    <>
      <section className="flex w-full flex-col">
        <SectionHeader onClick={() => onClickExperience()}>Experience</SectionHeader>
        <ExperienceList experiences={experiences} onClick={onClickExperience} />
      </section>
      {isOpen && <ExperienceForm onClose={onClose} experience={selectedExperience} />}
    </>
  );
};

export default ExperienceEditor;
