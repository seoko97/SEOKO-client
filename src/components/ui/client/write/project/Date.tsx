import { type ChangeEventHandler, type ComponentProps, ReactNode } from "react";

import { IProjectInput } from "@/types";
import { useProjectWriteContext } from "@/context/ProjectWriteContext";

type TProjectDateInputName = keyof Pick<IProjectInput, "start" | "end">;

interface IProps extends Omit<ComponentProps<"input">, "id" | "name" | "type"> {
  name: TProjectDateInputName;
  label: ReactNode;
}

const ProjectDateInput = ({ name, label, onChange, ...inputProps }: IProps) => {
  const { dataRef, updateData } = useProjectWriteContext();

  const onChangeValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value || null;

    updateData(name, value);
    onChange?.(e);
  };

  return (
    <div className="text-primary transition-[color]">
      <label htmlFor={`project-${name}`} className="text-primary transition-[color]">
        {label}
      </label>
      <input
        id={`project-${name}`}
        name={name}
        type="date"
        placeholder="YYYY-MM-DD"
        defaultValue={dataRef.current[name] ?? ""}
        onChange={onChangeValue}
        className="rounded-md bg-secondary p-2 transition-[background-color]"
        {...inputProps}
      />
    </div>
  );
};

export default ProjectDateInput;
