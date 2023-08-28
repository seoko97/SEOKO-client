"use client";

import React, { useCallback, useEffect } from "react";

import { useRouter } from "next/navigation";

import useInput from "@hooks/useInput";
import { useGetUserQuery, useSigninMutation } from "@hooks/query/user";
import Input from "@components/ui/core/Input";
import Button from "@components/ui/core/Button";

const SigninForm = () => {
  const router = useRouter();

  const [input, onChangeValue] = useInput({ userId: "", password: "" });

  const { data } = useGetUserQuery();
  const { mutate } = useSigninMutation();

  useEffect(() => {
    if (data?.username) router.push("/");
  }, [data, router]);

  const onSubmit: React.FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();

      const { userId, password } = input;

      if (!userId) return alert("아이디를 입력하세요");
      if (!password) return alert("비밀번호를 입력하세요");

      mutate({ userId, password });
    },
    [input, mutate],
  );

  const formProps = {
    onSubmit,
    className:
      "flex w-[300px] flex-col gap-4 rounded-lg bg-secondary px-4 py-8 shadow-md transition-[background-color] sm:w-full [&>input]:w-full",
  };

  const userIdInputProps = {
    onChange: onChangeValue,
    placeholder: "아이디",
    name: "userId",
  };

  const passwordInputProps = {
    onChange: onChangeValue,
    placeholder: "비밀번호",
    name: "password",
    type: "password",
  };

  return (
    <form {...formProps}>
      <Input {...userIdInputProps} />
      <Input {...passwordInputProps} />
      <Button buttonType="primary">로그인</Button>
    </form>
  );
};

export default SigninForm;
