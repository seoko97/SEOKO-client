import { redirect } from "next/navigation";

import SigninClient from "@components/pages/Signin/page.client";
import { getUserOrNull } from "@/apis/user";

const Signin = async () => {
  const user = await getUserOrNull();

  if (user) return redirect("/");

  return (
    <div className="frame flex h-[calc(100vh-16rem)] items-center justify-center text-primary">
      <SigninClient />
    </div>
  );
};

export default Signin;
