import React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { debounce } from "@utils/debounce";
import Input from "@components/ui/core/Input";
import { SearchIcon } from "@components/icons";

const ContentHeader = () => {
  const router = useRouter();
  const params = useSearchParams();

  const textParam = params.get("text") ?? "";

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
      .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\\{\\}\\[\]\\\\/]/gim, "")
      .trim();

    if (textParam === text) return;

    const link = text ? `/?text=${text}` : "/";

    router.push(link);
  };

  return (
    <div className="flex items-center justify-end gap-4 px-2 sm:flex-col sm:items-start sm:justify-start sm:p-0 md:w-full">
      <div className="relative w-[200px] sm:w-full">
        <Input
          placeholder="어떤글을 찾으시나요?"
          defaultValue={textParam}
          onChange={debounce(onChangeInput, 300)}
        />
        <SearchIcon className="absolute right-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transform fill-gray-400 text-primary" />
      </div>
    </div>
  );
};

export default ContentHeader;
