"use client";

import React, { useState } from "react";

import dynamic from "next/dynamic";

import useModal from "@hooks/useModal";
import { useGetUserQuery } from "@hooks/query/user";
import { useGetExperiencesQuery } from "@hooks/query/experience";
import SectionHeader from "@components/ui/client/about/SectionHeader";
import { IExperience } from "@/types/experience";

const ExperienceForm = dynamic(() => import("@components/modal/about/ExperienceForm"));

const Experience = () => {
  const { data: username } = useGetUserQuery();
  const { data: experiences = [] } = useGetExperiencesQuery();

  const [selectedExperience, setSelectedExperience] = useState<IExperience | null>(null);
  const [isOpen, onOpen, onClose] = useModal();

  const onClickExperience = (data: IExperience | null = null) => {
    onOpen();
    setSelectedExperience(data);
  };

  if (!experiences) return null;

  const onClick = username ? onClickExperience : null;

  return (
    <>
      <section className="flex w-full flex-col">
        <SectionHeader onClick={() => onClickExperience()}>Experience</SectionHeader>
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
                {experience.description.split("\n").map((desc, i) => (
                  <li key={desc + i} className="marker:text-main marker:transition-[color]">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      {isOpen && <ExperienceForm onClose={onClose} experience={selectedExperience} />}
    </>
  );
};

export default Experience;
