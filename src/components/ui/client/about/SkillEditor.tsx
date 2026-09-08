"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

import useModal from "@hooks/useModal";
import { useGetSkillsQuery } from "@hooks/query/skill";
import SkillList from "@components/ui/SkillList";
import SectionHeader from "@components/ui/client/about/SectionHeader";
import { ISkill } from "@/types/skill";

const SkillForm = dynamic(() => import("@components/modal/about/SkillForm"));

const SkillEditor = () => {
  const { data: skills } = useGetSkillsQuery();

  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null);
  const [isOpenSkillForm, onOpenSkillForm, onCloseSkillForm] = useModal();

  const onClickSkill = (data: ISkill | null = null) => {
    onOpenSkillForm();
    setSelectedSkill(data);
  };

  if (!skills) return null;

  const { front, back, devops, language } = skills;

  return (
    <>
      <section className="flex w-full flex-col">
        <SectionHeader onClick={() => onClickSkill()}>Skill</SectionHeader>
        <SkillList skills={language} onClick={onClickSkill} type="Language" />
        <SkillList skills={front} onClick={onClickSkill} type="FrontEnd" />
        <SkillList skills={back} onClick={onClickSkill} type="BackEnd" />
        <SkillList skills={devops} onClick={onClickSkill} type="DevOps" />
      </section>
      {isOpenSkillForm && <SkillForm onClose={onCloseSkillForm} skill={selectedSkill} />}
    </>
  );
};

export default SkillEditor;
