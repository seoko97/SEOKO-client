import React, { useRef, useState } from "react";

import MDEditor, {
  MDEditorProps,
  ICommand,
  commands,
  bold,
  hr,
  italic,
} from "@uiw/react-md-editor";
import { useUploadImageMutation } from "@hooks/query/image";
import { ImageIcon } from "@components/icons";
import { TImageType } from "@/types/base";

interface IProps {
  type: TImageType;
  content: string;
  onChangeContent: (value: string) => void;
}

const IMAGE_COMMAND: ICommand = {
  name: "image",
  keyCommand: "image",
  buttonProps: { "aria-label": "Insert image" },
  icon: <ImageIcon width={12} height={12} className="fill-white" />,
};

const MarkdownEditor = ({ type, content, onChangeContent }: IProps) => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(content || "## Hello World");
  const { mutateAsync } = useUploadImageMutation(type);

  const onChange: MDEditorProps["onChange"] = (value) => {
    if (!value) return;

    setValue(value);
    onChangeContent(value);
  };

  const image: ICommand = {
    ...IMAGE_COMMAND,
    execute: async () => {
      imageRef.current?.click();
    },
  };

  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const encodedFile = new File([file], encodeURI(file.name), { type: file.type });

    const formData = new FormData();

    formData.append("image", encodedFile);

    const imageUrl = await mutateAsync(formData);

    const textarea = document.querySelector(".w-md-editor-text-input") as HTMLTextAreaElement;

    const api = new commands.TextAreaTextApi(textarea);

    const modifyText = `![](${imageUrl})\n`;

    api.replaceSelection(modifyText);
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        ref={imageRef}
        style={{ display: "none" }}
        onChange={imageHandler}
      />
      <MDEditor
        value={value}
        onChange={onChange}
        height={600}
        visibleDragbar={false}
        commands={[bold, hr, italic, image]}
      />
    </div>
  );
};

export default MarkdownEditor;
