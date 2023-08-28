import React, { ReactNode, useRef, ReactElement } from "react";

import useDetectOutsideClick from "@hooks/useDetectOutsideClick";
import useAnimation from "@hooks/useAnimation";

interface IProps {
  button: ReactElement;
  menu: ReactNode;
}

const BaseMenu = ({ button, menu }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showMenu, handler] = useDetectOutsideClick(ref, false);
  const [renderMenu, triggerAnimation, handleTransitionEnd] = useAnimation(showMenu);

  const containerProps = {
    ref,
    className: "flex items-center justify-center",
  };

  const menuButtonProps = {
    onClick: handler,
    className: `${showMenu ? "is-active" : ""} ${button.props.className}`,
  };

  const wrapperProps = {
    className: `${
      showMenu || triggerAnimation ? "animate-show" : "animate-hide"
    } absolute top-[60px] right-0 lg:right-4`,
    onAnimationEnd: handleTransitionEnd,
  };

  if (typeof button === "object") {
    button = React.cloneElement(button as ReactElement, menuButtonProps);
  }

  return (
    <div {...containerProps}>
      {button}
      {renderMenu && <div {...wrapperProps}>{menu}</div>}
    </div>
  );
};

export default BaseMenu;
