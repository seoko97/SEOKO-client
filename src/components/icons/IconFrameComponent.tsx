import React from "react";

const IconFrameComponent =
  (IconComponent: React.ReactElement): React.FC<React.SVGProps<SVGSVGElement>> =>
  (props) => {
    const children = [IconComponent.props?.children, props.children];

    return React.cloneElement(IconComponent, { ...props, children });
  };

export default IconFrameComponent;
