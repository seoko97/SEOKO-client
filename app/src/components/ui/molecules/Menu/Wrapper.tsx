import React from "react";
import styled from "@emotion/styled";

import { hideAnimation, showAnimation } from "@components/ui/molecules/Menu/styles";

type TProps = React.PropsWithChildren<{
  className?: string;
  onAnimationEnd: () => void;
}>;

const Wrapper: React.FC<TProps> = (props) => {
  const { className, children, onAnimationEnd } = props;

  return (
    <Container className={className} onAnimationEnd={onAnimationEnd}>
      {children}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;

  top: 60px;
  right: 0;

  &.is-show {
    animation: ${showAnimation} 150ms 0s 1 ease-in-out forwards;
  }

  &.is-hide {
    animation: ${hideAnimation} 150ms 0s 1 ease-in-out forwards;
  }

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    right: 16px;
  }
`;

export default Wrapper;
