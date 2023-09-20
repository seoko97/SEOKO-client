import React from "react";

import { useRouter } from "next/navigation";

import Button from "@components/ui/core/Button";

interface IProps {
  save: React.MouseEventHandler<HTMLButtonElement>;
}

const WriteFooter = ({ save }: IProps) => {
  const router = useRouter();

  const replace = () => {
    const answer = confirm("저장하지 않고 나가시겠습니까?");

    if (!answer) return;

    router.back();
  };

  return (
    <footer className="mb-5 flex w-full items-center justify-end gap-4">
      <Button buttonSize="large" buttonType="primary" onClick={save}>
        저장
      </Button>
      <Button buttonSize="large" buttonType="danger" onClick={replace}>
        나가기
      </Button>
    </footer>
  );
};

export default WriteFooter;
