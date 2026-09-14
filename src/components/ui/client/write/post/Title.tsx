import type { ChangeEventHandler } from "react";

import { usePostWriteContext } from "@/context/PostWriteContext";

const TitleEditor = () => {
  const { initialData, updateData } = usePostWriteContext();

  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    const title = e.target.value;

    updateData("title", title);
  };

  return (
    <input
      name="title"
      className="write-text-input"
      defaultValue={initialData.title}
      onChange={onChangeTitle}
      placeholder="제목을 입력하세요"
    />
  );
};

export default TitleEditor;
