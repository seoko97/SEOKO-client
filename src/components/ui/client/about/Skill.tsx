"use client";

import React, { useState } from "react";

import dynamic from "next/dynamic";

import useModal from "@hooks/useModal";
import { useGetUserQuery } from "@hooks/query/user";
import { useGetSkillsQuery } from "@hooks/query/skill";
import SkillList from "@components/ui/SkillList";
import SectionHeader from "@components/ui/client/about/SectionHeader";
import { ISkill } from "@/types/skill";

const SkillForm = dynamic(() => import("@components/modal/about/SkillForm"));

const Skill = () => {
  const { data: username } = useGetUserQuery();
  const { data: skills } = useGetSkillsQuery();

  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null);
  const [isOpenSkillForm, onOpenSkillForm, onCloseSkillForm] = useModal();

  const onClickSkill = (data: ISkill | null = null) => {
    onOpenSkillForm();
    setSelectedSkill(data);
  };

  if (!skills) return null;

  const { front, back, devops, language } = skills;

  const onClick = username ? onClickSkill : null;

  return (
    <>
      <section className="flex w-full flex-col">
        <SectionHeader onClick={() => onClickSkill()}>Skill</SectionHeader>
        <SkillList skills={language} onClick={onClick} type="Language" />
        <SkillList skills={front} onClick={onClick} type="FrontEnd" />
        <SkillList skills={back} onClick={onClick} type="BackEnd" />
        <SkillList skills={devops} onClick={onClick} type="DevOps" />
      </section>
      {isOpenSkillForm && <SkillForm onClose={onCloseSkillForm} skill={selectedSkill} />}
    </>
  );
};

export default Skill;
