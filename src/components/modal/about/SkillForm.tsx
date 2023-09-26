import React, { useRef } from "react";

import Image from "next/image";

import { useSkillMutation } from "@hooks/query/skill";
import { useUploadImage } from "@hooks/query/image";
import Input from "@components/ui/core/Input";
import Button from "@components/ui/core/Button";
import ModalLayout from "@components/modal/ModalLayout";
import { ImageIcon } from "@components/icons";
import { ESkillType, ISkill } from "@/types/skill";

interface IProps {
  onClose: () => void;
  skill: ISkill | null;
}

const SkillForm = ({ onClose, skill }: IProps) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const formDataRef = useRef({
    name: skill?.name ?? "",
    description: skill?.description ?? "",
    type: skill?.type ?? ESkillType.LANGUAGE,
  });

  const { image, changeImage, clearImage } = useUploadImage({
    defaultImg: skill?.icon ?? "",
    type: "skill",
  });

  const { createOrUpdate, remove } = useSkillMutation(skill?._id);

  const onChangeInput = (e: React.ChangeEvent) => {
    const name = (e.target as HTMLInputElement).name as keyof typeof formDataRef.current;
    const value = (e.target as HTMLInputElement).value as ESkillType.FRONT_END;

    formDataRef.current[name] = value;
  };

  const onSubmitForm = () => {
    const conf = confirm("저장하시겠습니까?");

    if (!conf) return;

    const input = { ...formDataRef.current, icon: image };

    createOrUpdate(input);

    onClose();
  };

  const deleteSkill = () => {
    const conf = confirm("삭제하시겠습니까?");

    if (!conf || !skill) return;

    remove();

    onClose();
  };

  const imageHandler = (e: React.MouseEvent) => {
    e.preventDefault();

    imageRef.current?.click();
  };

  return (
    <ModalLayout onClose={onClose}>
      <div className="z-[60] flex h-fit max-h-[600px] w-[600px] flex-col gap-4 rounded-md bg-tertiary px-5 py-7 text-primary shadow-md transition-[background-color,color] md:w-full">
        <h1 className="text-center text-lg font-medium">스킬 등록</h1>
        <div className="flex items-center gap-5">
          <h3 className="font-medium">분류</h3>
          <select
            name="type"
            className="rounded-md border border-slate-300 bg-secondary px-2 py-1"
            onChange={onChangeInput}
            defaultValue={formDataRef.current.type ?? ""}
          >
            <option value={ESkillType.LANGUAGE}>LANGUAGE</option>
            <option value={ESkillType.FRONT_END}>FRONT</option>
            <option value={ESkillType.BACK_END}>BACK</option>
            <option value={ESkillType.DEV_OPS}>DEVOPS</option>
          </select>
        </div>
        <div className="flex items-center gap-5">
          <h3>이름</h3>
          <Input
            name="name"
            placeholder="이름입력"
            onChange={onChangeInput}
            defaultValue={formDataRef.current.name ?? ""}
            className="w-min"
          />
        </div>
        <div className="flex items-center gap-5">
          <h3 className="min-w-fit">정보</h3>
          <Input
            name="description"
            placeholder="정보입력"
            onChange={onChangeInput}
            defaultValue={formDataRef.current.description ?? ""}
            className="w-full"
          />
        </div>
        <div>
          <h3>아이콘</h3>
          <div className="flex items-center gap-4">
            {image && (
              <Image
                className="cursor-pointer"
                src={image}
                alt="thumbnail"
                onClick={clearImage}
                width={72}
                height={72}
              />
            )}
            <span onClick={imageHandler}>
              <ImageIcon className="h-16 w-16 cursor-pointer fill-[theme(textColor.primary)] hover:opacity-50" />
            </span>
            <input
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              ref={imageRef}
              style={{ display: "none" }}
              onChange={changeImage}
            />
          </div>
        </div>
        <div className="flex w-full gap-4 [&>button]:flex-1">
          <Button name="save" onClick={onSubmitForm} buttonType="primary">
            저장
          </Button>
          {skill && (
            <Button onClick={deleteSkill} name="delete" buttonType="danger">
              삭제
            </Button>
          )}
        </div>
      </div>
    </ModalLayout>
  );
};

export default SkillForm;
