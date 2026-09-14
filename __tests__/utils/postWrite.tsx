import { type ReactNode, type RefObject, useEffect } from "react";
import { render, waitFor } from "@testing-library/react";

import { IPostWriteInput } from "@/types";
import { PostWriteProvider, usePostWriteContext } from "@/context/PostWriteContext";

type TPostWriteDataRef = RefObject<IPostWriteInput>;

interface IContextProbeProps {
  onReady: (dataRef: TPostWriteDataRef) => void;
}

const ContextProbe = ({ onReady }: IContextProbeProps) => {
  const { dataRef } = usePostWriteContext();

  useEffect(() => {
    onReady(dataRef);
  }, [dataRef, onReady]);

  return null;
};

const renderPostWriteEditor = (children: ReactNode, initialData: IPostWriteInput) => {
  let dataRef: TPostWriteDataRef | null = null;

  render(
    <PostWriteProvider initialData={initialData}>
      {children}
      <ContextProbe onReady={(ref) => (dataRef = ref)} />
    </PostWriteProvider>,
  );

  if (!dataRef) {
    throw new Error("PostWriteContext dataRef를 찾을 수 없습니다.");
  }

  return dataRef;
};

const expectPostWriteProperty = async <K extends keyof IPostWriteInput>(
  dataRef: TPostWriteDataRef,
  key: K,
  expectedValue: IPostWriteInput[K],
) => {
  await waitFor(() => {
    expect(dataRef.current?.[key]).toEqual(expectedValue);
  });
};

export { expectPostWriteProperty, renderPostWriteEditor };
export type { TPostWriteDataRef };
