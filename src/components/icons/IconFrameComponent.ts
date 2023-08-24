import React from "react";

const IconFrameComponent =
  (IconComponent: React.JSX.Element): React.FC<React.SVGProps<SVGSVGElement>> =>
  (props) => {
    return React.cloneElement(IconComponent, props);
  };

export default IconFrameComponent;
