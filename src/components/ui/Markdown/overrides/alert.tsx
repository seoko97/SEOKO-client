import React from "react";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  TimesCircleIcon,
} from "@components/icons";

interface IProps {
  children: React.ReactNode;
  type: "info" | "success" | "warning" | "danger";
}

const typeMapping = {
  info: {
    icon: ExclamationCircleIcon,
    style: "border-[#4433ff] bg-[#dfebf6] dark:border-[#617bff] dark:bg-[#182635]",
    iconStyle: "text-[#4433ff] dark:text-[#617bff]",
  },
  success: {
    icon: CheckCircleIcon,
    style: "border-[#00cc88] bg-[#00cc88]/10",
    iconStyle: "text-[#00cc88]",
  },
  warning: {
    icon: ExclamationTriangleIcon,
    style: "border-[#ff9d00] bg-[#ffdd00]/25 dark:border-[#ff8000] dark:bg-[#ffa200]/10",
    iconStyle: "text-[#ff9d00] dark:text-[#ff8000] !rounded-md",
  },
  danger: {
    icon: TimesCircleIcon,
    style: "border-[#f90657] bg-[#d6054b]/10 dark:border-[#fa3879] dark:bg-[#d6054b]/10",
    iconStyle: "text-[#f90657] dark:text-[#fa3879]",
  },
};

const Alert = ({ type = "info", children }: IProps) => {
  const { icon: Icon, style, iconStyle } = typeMapping[type];

  return (
    <div
      className={`relative my-12 rounded-r-md border-l-2 px-5 py-3 !transition-[background-color,color] sm:border-l-4 [&>*:not(svg)]:my-4 ${style}`}
    >
      <Icon
        className={`${iconStyle} duration-default absolute -left-0.5 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full border border-[theme(backgroundColor.primary)] bg-primary p-0.5 transition-[background-color,border] sm:h-10 sm:w-10`}
      />
      {children}
    </div>
  );
};

export default Alert;
