import React from "react";

import SigninForm from "@components/ui/SigninForm";

const Signin = () => {
  return (
    <div className="frame flex h-[calc(100vh-16rem)] items-center justify-center text-primary">
      <SigninForm />
    </div>
  );
};

export default Signin;
