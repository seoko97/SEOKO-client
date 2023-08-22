import React from "react";

import Link from "next/link";

interface IProps extends React.LiHTMLAttributes<HTMLLIElement> {
  href?: string;
}

type TComponent = React.FC<React.PropsWithChildren<IProps>>;

const MenuItem: TComponent = ({ children, href, ...rest }) => {
  const liProps = {
    ...rest,
    className:
      "flex cursor-pointer items-center text-[0.9rem] text-primary transition-[background-color,color] hover:bg-primary hover:text-effect1 [&:not(:has(a))]:w-full [&:not(:has(a))]:p-2",
  };

  return (
    <li {...liProps}>
      {href ? (
        <Link href={href} className="w-full p-2">
          {children}
        </Link>
      ) : (
        children
      )}
    </li>
  );
};

export default MenuItem;
