import React from "react";

import Info from "@components/ui/molecules/Profile/Detail";
import Avatar from "@components/ui/core/Avatar";

const Profile = () => {
  return (
    <section>
      <Avatar width={160} height={160} />
      <Info />
    </section>
  );
};

export default Profile;
