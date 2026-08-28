import { useProjectMutation } from "@hooks/query/project";
import WriteFooter from "@components/ui/client/write/Footer";
import { useProjectWriteContext } from "@/context/ProjectWriteContext";

interface IProps {
  nid: number | null;
}

const ProjectFooter = ({ nid }: IProps) => {
  const { dataRef } = useProjectWriteContext();

  const mutate = useProjectMutation(nid);

  const addProject = () => {
    const confirmPost = confirm("저장하시겠습니까?");

    if (!confirmPost) return;

    mutate(dataRef.current);
  };

  return <WriteFooter save={addProject} />;
};

export default ProjectFooter;
