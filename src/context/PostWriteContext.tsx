import { IPostWriteInput } from "@/types";
import { createWriteDataContext } from "@/context/createWriteDataContext";

const {
  WriteDataContext: PostWriteContext,
  WriteDataProvider: PostWriteProvider,
  useWriteDataContext: usePostWriteContext,
} = createWriteDataContext<IPostWriteInput>();

export { PostWriteContext, PostWriteProvider, usePostWriteContext };
