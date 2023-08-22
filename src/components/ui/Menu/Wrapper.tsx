import React from "react";

type TProps = React.PropsWithChildren<{
  className?: string;
  onAnimationEnd: () => void;
}>;

const Wrapper: React.FC<TProps> = (props) => {
  const { className, children, onAnimationEnd } = props;

  const containerProps = {
    className: `${className} absolute top-[60px] right-0 lg:right-4`,
    onAnimationEnd,
  };

  return <div {...containerProps}>{children}</div>;
};

export default Wrapper;
