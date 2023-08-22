import React from "react";

import MailIcon from "@/icons/MailIcon";
import InstagramIcon from "@/icons/InstagramIcon";
import GitHubIcon from "@/icons/GitHubIcon";
import FacebookIcon from "@/icons/FacebookIcon";

const USER_LINKS = [
  {
    name: "GitHub",
    link: "https://github.com/seoko97",
    Icon: GitHubIcon,
  },
  {
    name: "Mail",
    link: "mailto:seokoji97@gmail.com",
    Icon: MailIcon,
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/profile.php?id=100002987223791",
    Icon: FacebookIcon,
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/sukho1007",
    Icon: InstagramIcon,
  },
];

const Icons = () => {
  return (
    <div>
      {USER_LINKS.map(({ name, link, Icon }) => (
        <a key={name} href={link} target="_blank" rel="noopener noreferrer" aria-label={name}>
          <Icon />
        </a>
      ))}
    </div>
  );
};

export default Icons;
