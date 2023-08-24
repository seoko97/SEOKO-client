import { MailIcon, InstagramIcon, GithubIcon, FacebookIcon } from "@components/icons";

const USER_DETAIL = {
  username: "지석호",
  description:
    "프론트엔드 개발자를 희망하고 있는 지석호입니다. 개발이 취미이며 기록하는 것을 좋아합니다.",
};

const USER_LINKS = [
  {
    name: "GitHub",
    link: "https://github.com/seoko97",
    Icon: GithubIcon,
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

export { USER_DETAIL, USER_LINKS };
