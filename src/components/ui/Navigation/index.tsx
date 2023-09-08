import React from "react";

import Button from "@components/ui/core/Button";

interface IProps {
  onDelete: () => void;
  onEdit: () => void;
}

const Navigation = ({ onEdit, onDelete }: IProps) => {
  return (
    <div className="flex gap-4">
      <Button buttonType="primary" onClick={onEdit}>
        수정
      </Button>
      <Button buttonType="danger" onClick={onDelete}>
        삭제
      </Button>
    </div>
  );
};

export default Navigation;
