import { MailIcon, InstagramIcon, GithubIcon, FacebookIcon } from "@components/icons";

const AUTH_ERROR = {
  NO_SIGN: "로그인이 필요합니다.",
  EXPIRED_TOKEN: "인증 시간이 만료되었습니다.",
  INVALID_TOKEN: "유효하지 않은 정보입니다.",
  UNAUTHORIZED: "인증오류가 발생했습니다.",
};

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

export { USER_DETAIL, USER_LINKS, AUTH_ERROR };
