import React from "react";

import SigninClient from "@components/pages/Signin/page.client";

const Signin = () => {
  return (
    <div className="frame flex h-[calc(100vh-16rem)] items-center justify-center text-primary">
      <SigninClient />
    </div>
  );
};

export default Signin;
