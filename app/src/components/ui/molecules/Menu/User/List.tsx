import React from "react";

import { Container } from "@components/ui/molecules/Menu/styles";
import MenuItem from "@components/ui/atoms/MenuItem";

interface IProps {
  username: string;
  signOut: () => void;
}

const UserMenu: React.FC<IProps> = ({ username, signOut }) => {
  return (
    <Container>
      <MenuItem>{username} 님</MenuItem>
      <MenuItem href="/write/post">새 글쓰기</MenuItem>
      <MenuItem href="/write/project">프로젝트 추가</MenuItem>
      <MenuItem onClick={signOut}>로그아웃</MenuItem>
    </Container>
  );
};

export default UserMenu;
