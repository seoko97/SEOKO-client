"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@components/ui/core/Button";

interface IProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: IProps) => {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="frame mt-28 flex flex-col items-center justify-center gap-6">
      <h1 className="text-6xl font-bold text-gray-400">오류가 발생했습니다</h1>
      <p className="text-center text-lg text-primary transition-[color]">
        페이지를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
      </p>
      <div className="flex items-center gap-3">
        <Button buttonType="primary" onClick={reset}>
          다시 시도
        </Button>
        <Button buttonType="default" onClick={() => router.push("/")}>
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
};

export default Error;
