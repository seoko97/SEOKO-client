import React from "react";

interface IButtonProps {
  buttonSize?: "default" | "large" | "small";
  buttonType?: "default" | "primary" | "danger";
}

type TProps = IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

const BUTTON_SIZE = {
  default: "font-medium px-4 py-2",
  large: "font-medium px-6 py-3",
  small: "font-medium px-2 py-1",
};

const BUTTON_TYPE = {
  default: "border-[1px] border-gray bg-secondary text-primary",
  primary: "bg-[theme(textColor.main)] text-white font-bold",
  danger: "bg-secondary text-red-400 font-bold border-[1px] border-red-400 border-solid",
};

const Button: React.FC<TProps> = ({
  children,
  buttonSize = "default",
  buttonType = "default",
  ...props
}) => {
  const { className, ...rest } = props;

  const buttonProps = {
    ...rest,
    className: `cursor-pointer rounded-sm text-primary transition-[filter,background-color] hover:brightness-105 ${BUTTON_SIZE[buttonSize]} ${BUTTON_TYPE[buttonType]} ${className}`,
  };

  return <button {...buttonProps}>{children}</button>;
};

export default Button;
