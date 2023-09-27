import React from "react";

import Button from "@components/ui/core/Button";

const NotFound = () => {
  return (
    <div className="frame mt-28 flex flex-col items-center justify-center gap-6">
      <h1 className="text-9xl font-bold text-gray-400">404</h1>
      <h2 className="text-2xl font-semibold text-primary transition-[color]">
        페이지를 찾을 수 없습니다 😭
      </h2>
      <a href="/">
        <Button className="border-none !bg-[theme(textColor.main)] text-white">
          홈으로 돌아가기
        </Button>
      </a>
    </div>
  );
};

export default NotFound;
