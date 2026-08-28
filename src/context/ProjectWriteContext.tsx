import { IProjectInput } from "@/types";
import { createWriteDataContext } from "@/context/createWriteDataContext";

const {
  WriteDataContext: ProjectWriteContext,
  WriteDataProvider: ProjectWriteProvider,
  useWriteDataContext: useProjectWriteContext,
} = createWriteDataContext<IProjectInput>();

export { ProjectWriteContext, ProjectWriteProvider, useProjectWriteContext };
