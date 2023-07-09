import React, { ReactNode, useRef, ReactElement } from "react";

import useDetectOutsideClick from "@hooks/useDetectOutsideClick";
import useAnimation from "@hooks/useAnimation";
import Wrapper from "@components/ui/molecules/Menu/Wrapper";
import { MenuWrapper } from "@components/ui/molecules/Menu/styles";

interface IProps {
  button: ReactNode;
  menu: ReactNode;
}

const BaseMenu = ({ button, menu }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showMenu, handler] = useDetectOutsideClick(ref, false);
  const [renderMenu, triggerAnimation, handleTransitionEnd] = useAnimation(showMenu);

  const containerProps = {
    ref,
  };

  const menuButtonProps = {
    onClick: handler,
    className: showMenu ? "is-active" : "",
  };

  const wrapperProps = {
    onAnimationEnd: handleTransitionEnd,
    className: showMenu || triggerAnimation ? "is-show" : "is-hide",
  };

  if (typeof button === "object") {
    button = React.cloneElement(button as ReactElement, menuButtonProps);
  }

  return (
    <BaseMenu.Container {...containerProps}>
      {button}
      {renderMenu && <BaseMenu.MenuForm {...wrapperProps}>{menu}</BaseMenu.MenuForm>}
    </BaseMenu.Container>
  );
};

BaseMenu.Container = MenuWrapper;
BaseMenu.MenuForm = Wrapper;

export default BaseMenu;
