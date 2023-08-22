import React from "react";

import MenuItem from "@components/ui/core/MenuItem";

interface IProps {
  username: string | null;
  signOut: () => void;
}

const UserMenu: React.FC<IProps> = ({ username, signOut }) => {
  return (
    <div className="menu">
      <MenuItem>{username} 님</MenuItem>
      <MenuItem href="/write/post">새 글쓰기</MenuItem>
      <MenuItem href="/write/project">프로젝트 추가</MenuItem>
      <MenuItem onClick={signOut}>로그아웃</MenuItem>
    </div>
  );
};

export default UserMenu;
