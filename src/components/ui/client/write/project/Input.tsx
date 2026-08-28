import { type ChangeEventHandler, type ComponentProps } from "react";

import Input from "@components/ui/core/Input";
import { IProjectInput } from "@/types";
import { useProjectWriteContext } from "@/context/ProjectWriteContext";

type TProjectInputName = keyof Pick<IProjectInput, "title" | "description" | "github" | "page">;

interface IProps extends Omit<ComponentProps<"input">, "name"> {
  name: TProjectInputName;
}

const ProjectInput = ({ name, className, onChange, ...rest }: IProps) => {
  const { dataRef, updateData } = useProjectWriteContext();

  const onChangeValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = name === "page" ? e.target.value || null : e.target.value;

    updateData(name, value);
    onChange?.(e);
  };

  return (
    <Input
      {...rest}
      defaultValue={dataRef.current[name] ?? ""}
      name={name}
      className={`write-text-input ${className ?? ""}`}
      onChange={onChangeValue}
    />
  );
};
export default ProjectInput;
