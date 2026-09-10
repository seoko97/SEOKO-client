import { useRef, cloneElement } from "react";

import type { ReactElement, ReactNode } from "react";

import useDetectOutsideClick from "@hooks/useDetectOutsideClick";

interface IProps {
  button: ReactElement<React.ComponentProps<"button">>;
  menu: ReactNode;
}

const MENU_STYLE = {
  visible: "visible translate-y-0 opacity-100",
  invisible: "invisible pointer-events-none -translate-y-[5%] opacity-0",
};

const BaseMenu = ({ button, menu }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showMenu, handler] = useDetectOutsideClick(ref, false);

  const containerProps = {
    ref,
    className: "flex items-center justify-center",
  };

  const menuButtonProps = {
    onClick: handler,
    "aria-expanded": showMenu,
    className: `${showMenu ? "is-active" : ""} ${button.props.className}`,
  };

  const wrapperProps = {
    className: `${
      showMenu ? MENU_STYLE.visible : MENU_STYLE.invisible
    } absolute top-[60px] right-0 transition-[opacity,transform,visibility] duration-150 ease-in-out lg:right-4`,
    inert: !showMenu,
    "aria-hidden": !showMenu,
  };

  if (typeof button === "object") {
    button = cloneElement(button, menuButtonProps);
  }

  return (
    <div {...containerProps}>
      {button}
      <div {...wrapperProps}>{menu}</div>
    </div>
  );
};

export default BaseMenu;
