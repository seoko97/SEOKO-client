import React from "react";

import { USER_DETAIL } from "@utils/constant/user";

import Icons from "./Icons";

// TODO: 유저 정보를 받아와서 랜더링

const Detail = () => {
  const { username, description } = USER_DETAIL;

  return (
    <div>
      <h3>👨🏻‍💻 {username}</h3>
      <p>{description}</p>
      <Icons />
    </div>
  );
};

export default Detail;
