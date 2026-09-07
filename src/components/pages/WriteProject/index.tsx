import ProjectClient from "@components/ui/client/write/project";

import Hydrate from "@components/pages/WriteProject/Hydrate";

interface IProps {
  params?: PageProps<"/write/project/[nid]">["params"];
}

const WriteProject = async ({ params }: IProps) => {
  const paramNid = (await params)?.nid;
  const nid = paramNid ? Number(paramNid) : null;

  return (
    <Hydrate nid={nid}>
      <ProjectClient nid={nid} />
    </Hydrate>
  );
};

export default WriteProject;
