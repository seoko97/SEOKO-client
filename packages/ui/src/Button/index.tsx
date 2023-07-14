import React, { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { css, Theme, useTheme } from "@emotion/react";

interface IProps {
  type?: "button" | "submit";
  primary?: "primary" | "secondary";
  size?: TButtonSize;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

type TButtonSize = keyof typeof BUTTON_SIZES;

const BUTTON_SIZES = {
  small: css`
    font-size: 0.8rem;
    padding: 0.6rem 1rem;
  `,
  medium: css`
    font-size: 0.9rem;
    padding: 0.8rem 1.2rem;
  `,
  large: css`
    font-size: 1rem;
    padding: 0.8rem 1.4rem;
  `,
};

const BUTTON_STYLES = {
  primary: (theme: Theme) => css`
    color: ${theme.grey50};
    background-color: ${theme.green400};
  `,
  secondary: (theme: Theme) => css`
    color: ${theme.grey900};
    background-color: ${theme.red200};
    box-shadow: ${theme.BOX_SHADOW.primary};
  `,
};

const Button: React.FC<PropsWithChildren<IProps>> = (props) => {
  const {
    type = "button",
    children,
    className,
    onClick,
    primary = "primary",
    size = "medium",
  } = props;

  const theme = useTheme();

  return (
    <Container
      type={type}
      className={className}
      onClick={onClick}
      css={[BUTTON_SIZES[size], BUTTON_STYLES[primary](theme)]}
    >
      {children}
    </Container>
  );
};

const Container = styled.button<Pick<IProps, "primary" | "size">>`
  background-color: ${({ theme }) => theme.background3};
  padding: 0.8rem 1rem;

  border: none;
  border-radius: 0.4rem;
`;

export default Button;
