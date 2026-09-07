"use client";

import { useRouter } from "next/navigation";

import Button from "@components/ui/core/Button";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="frame mt-28 flex flex-col items-center justify-center gap-6">
      <h1 className="text-9xl font-bold text-gray-400">404</h1>
      <h2 className="text-2xl font-semibold text-primary transition-[color]">
        페이지를 찾을 수 없습니다 😭
      </h2>
      <Button buttonType="primary" onClick={() => router.push("/")}>
        홈으로 돌아가기
      </Button>
    </div>
  );
};

export default NotFound;
