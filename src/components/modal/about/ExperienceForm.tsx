import React, { useRef } from "react";

import { useExperienceMutation } from "@hooks/query/experience";
import Input from "@components/ui/core/Input";
import Button from "@components/ui/core/Button";
import ModalLayout from "@components/modal/ModalLayout";
import { IExperience } from "@/types/experience";

interface IProps {
  onClose: () => void;
  experience: IExperience | null;
}

const ExperienceForm = ({ onClose, experience }: IProps) => {
  const formDataRef = useRef({
    title: experience?.title ?? "",
    description: experience?.description ?? "",
    start: experience?.start ?? "",
    end: experience?.end ?? null,
  });

  const { createOrUpdateExperience, deleteExperience } = useExperienceMutation(experience?._id);

  const onChangeInput = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    const name = target.name as keyof typeof formDataRef.current;
    const value = target.value;

    if (name === "end") formDataRef.current[name] = value || null;
    else formDataRef.current[name] = value;
  };

  const onSubmitForm = () => {
    const conf = confirm("저장하시겠습니까?");

    if (!conf) return;

    createOrUpdateExperience(formDataRef.current);

    onClose();
  };

  const onClickDeleteButton = () => {
    const conf = confirm("삭제하시겠습니까?");

    if (!conf || !experience) return;

    deleteExperience();

    onClose();
  };

  const { title, description, start, end } = formDataRef.current;

  return (
    <ModalLayout onClose={onClose}>
      <div className="z-[60] flex h-fit max-h-[600px] w-[600px] flex-col gap-4 rounded-md bg-tertiary px-5 py-7 text-primary shadow-md transition-[background-color,color] md:w-full">
        <h1 className="text-center text-lg font-medium">스킬 등록</h1>
        <div className="flex items-center gap-5">
          <h3 className="font-medium">활동명</h3>
          <Input
            name="title"
            placeholder="입력"
            onChange={onChangeInput}
            defaultValue={title}
            className="w-min"
          />
        </div>
        <div className="flex flex-1 flex-col gap-5">
          <h3 className="font-medium">상세</h3>
          <textarea
            className="max-h-[200px] min-h-[100px] w-full rounded-md bg-primary p-2 transition-[background-color]"
            defaultValue={description}
            name="description"
            onChange={onChangeInput}
          />
        </div>
        <div className="text-primary transition-[color]">
          <span>시작 날짜 : </span>
          <input
            name="start"
            type="date"
            placeholder="YYYY-MM-DD"
            defaultValue={start}
            onChange={onChangeInput}
            className="rounded-md bg-secondary p-2 transition-[background-color]"
          />
        </div>
        <div className="text-primary transition-[color]">
          <span>종료 날짜 : </span>
          <input
            name="end"
            type="date"
            placeholder="YYYY-MM-DD"
            defaultValue={end ?? ""}
            onChange={onChangeInput}
            className="rounded-md bg-secondary p-2 transition-[background-color]"
          />
        </div>
        <div className="flex w-full gap-4 [&>button]:flex-1">
          <Button name="save" onClick={onSubmitForm} buttonType="primary">
            저장
          </Button>
          {experience && (
            <Button onClick={onClickDeleteButton} name="delete" buttonType="danger">
              삭제
            </Button>
          )}
        </div>
      </div>
    </ModalLayout>
  );
};

export default ExperienceForm;
