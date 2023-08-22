import React, { ReactNode, useRef, ReactElement } from "react";

import useDetectOutsideClick from "@hooks/useDetectOutsideClick";
import useAnimation from "@hooks/useAnimation";
import Wrapper from "@components/ui/Menu/Wrapper";

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
    className: showMenu || triggerAnimation ? "animate-show" : "animate-hide",
    onAnimationEnd: handleTransitionEnd,
  };

  if (typeof button === "object") {
    button = React.cloneElement(button as ReactElement, menuButtonProps);
  }

  return (
    <div {...containerProps}>
      {button}
      {renderMenu && <Wrapper {...wrapperProps}>{menu}</Wrapper>}
    </div>
  );
};

export default BaseMenu;
