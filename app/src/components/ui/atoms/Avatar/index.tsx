import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";

interface IProps {
  src?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

const Avatar: React.FC<IProps> = (props) => {
  const { src = "/main.jpg", width = 30, height = 30, onClick } = props;

  return (
    <Container onClick={onClick}>
      <Image width={width} height={height} alt="avatar" src={src} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  overflow: hidden;
  border-radius: 50%;

  & > img {
    object-fit: cover;
  }
`;

export default Avatar;
