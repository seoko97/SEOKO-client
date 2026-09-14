import { cloneElement } from "react";
import type { SVGProps, FC, ReactElement } from "react";

const IconFrameComponent =
  (IconComponent: ReactElement<SVGProps<SVGSVGElement>>): FC<SVGProps<SVGSVGElement>> =>
  (props) => {
    const children = [IconComponent.props?.children, props.children];

    return cloneElement(IconComponent, { ...props, children });
  };

export default IconFrameComponent;
