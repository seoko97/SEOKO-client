import { redirect } from "next/navigation";

import ProjectClient from "@components/ui/client/write/project";

import Hydrate from "@components/pages/WriteProject/Hydrate";
import { getUserOrNull } from "@/apis/user";

interface IProps {
  params?: PageProps<"/write/project/[nid]">["params"];
}

const WriteProject = async ({ params }: IProps) => {
  const paramNid = (await params)?.nid;
  const nid = paramNid ? Number(paramNid) : null;

  const user = await getUserOrNull();

  if (!user) return redirect("/signin");

  return (
    <Hydrate nid={nid}>
      <ProjectClient nid={nid} />
    </Hydrate>
  );
};

export default WriteProject;
