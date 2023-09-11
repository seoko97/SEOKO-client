import React, { useCallback, useState } from "react";

import { IPost } from "@/types";

interface IWriteTag {
  tags: string[];
  tagName: string;
  set: React.Dispatch<React.SetStateAction<string[]>>;
}

const useWriteTag = (post?: IPost) => {
  const [tags, setTags] = useState<string[]>(post?.tags.map((tag) => tag.name) || []);

  const [deletedTags, setDeletedTags] = useState<string[]>([]);
  const [addedTags, setAddedTags] = useState<string[]>([]);

  const tagHandler: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const tagName = e.currentTarget.value;

      if (e.nativeEvent.isComposing) return;

      if (e.key === "Enter") {
        const newTag = tagName.trim();

        if (tags.includes(newTag)) return alert("이미 추가된 태그입니다.");
        if (!newTag.length) return alert("태그를 입력해주세요.");

        addTag({ tagName: newTag, tags: addedTags, set: setAddedTags });
        deleteTag({ tagName: newTag, tags: deletedTags, set: setDeletedTags });

        setTags([...tags, newTag]);

        e.currentTarget.value = "";
      } else if (e.key === "Backspace" && tags.length && !tagName.length) {
        const newTags = [...tags];

        const tagName = newTags.pop() ?? "";

        addTag({ tagName, tags: deletedTags, set: setDeletedTags });
        deleteTag({ tagName, tags: addedTags, set: setAddedTags });

        setTags(newTags);
      }
    },
    [tags, deletedTags, addedTags],
  );

  const addTag = ({ tagName, tags, set }: IWriteTag) => {
    const isInclude = tags.includes(tagName ?? "");

    if (isInclude) return;

    set([...tags, tagName]);
  };

  const deleteTag = ({ tagName, tags, set }: IWriteTag) => {
    const isInclude = tags.includes(tagName ?? "");

    if (!isInclude) return;

    const newTags = tags.filter((tag) => tag !== tagName);

    set(newTags);
  };

  const onClickTag: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const tagName = e.currentTarget.innerText;
      const newTags = [...tags];

      const idx = tags.indexOf(tagName);
      newTags.splice(idx, 1);

      const deletedTag = post?.tags.find((tag) => tag.name === tagName);
      const addedTag = addedTags.includes(tagName ?? "");

      if (deletedTag) setDeletedTags([...deletedTags, tagName]);
      if (addedTag) setAddedTags(addedTags.filter((tag) => tag !== tagName));

      setTags(newTags);
    },
    [tags, deletedTags],
  );

  return [tags, deletedTags, addedTags, tagHandler, onClickTag] as const;
};

export { useWriteTag };
