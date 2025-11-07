import React from "react";

type SvgElement = React.ReactElement<React.SVGProps<SVGSVGElement>>;

export const IconFrameComponent =
  (IconComponent: SvgElement): React.FC<React.SVGProps<SVGSVGElement>> =>
  (props) => {
    return React.cloneElement(IconComponent, {
      ...props,
      children: (
        <>
          {IconComponent.props.children}
          {props.children}
        </>
      ),
    });
  };

export default IconFrameComponent;
