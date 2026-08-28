import { useEffect, useState } from "react";
import type { KeyboardEventHandler, MouseEventHandler } from "react";

import Tag from "@components/ui/TagList/item";
import { usePostWriteContext } from "@/context/PostWriteContext";

const TagEditor = () => {
  const { dataRef, updateData } = usePostWriteContext();

  const [tags, setTags] = useState(dataRef.current.tags);

  useEffect(() => {
    updateData("tags", tags);
  }, [tags, updateData]);

  const onClickTag: MouseEventHandler<HTMLDivElement> = (e) => {
    const tagName = e.currentTarget.textContent;

    if (!tagName) return;

    const newTags = [...tags];

    const idx = tags.indexOf(tagName);
    newTags.splice(idx, 1);

    setTags(newTags);
  };

  const tagHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.nativeEvent.isComposing) return;

    const tagName = e.currentTarget.value.trim();

    if (e.key === "Enter") {
      if (tags.includes(tagName) || !tagName.length) return;

      setTags([...tags, tagName]);

      e.currentTarget.value = "";
    }

    if (e.key === "Backspace") {
      if (tags.length === 0 || tagName.length > 0) return;

      const newTags = [...tags];

      newTags.pop();

      setTags(newTags);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1">
      {tags.map((tag, index) => (
        <Tag key={index} onClick={onClickTag}>
          {tag}
        </Tag>
      ))}
      <input className="write-text-input" onKeyDown={tagHandler} placeholder="태그를 입력하세요" />
    </div>
  );
};

export default TagEditor;
