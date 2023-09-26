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
    "프론트엔드 개발자를 희망하고 있는 지석호입니다. 꾸준히 공부하며 발전하는 것과 실천하는 것을 좋아합니다. 이를 통해 발전하며 누군가의 멘토가 되는것을 목표로 하고 있습니다.",
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

const ABOUT_INFOS = [
  {
    count: "1️⃣",
    title: "성장을 즐기는 개발자",
    description:
      "저는 취미가 개발입니다. 꾸준히 공부하고 개발하며 어제보다 성장한 저를 발견하는 것에 즐거움을 느낍니다. 새로운 기술들을 공부하고 이를 나의 것으로 만들며 끊임없이 고민하고 성장합니다.",
  },
  {
    count: "2️⃣",
    title: "기록하는 개발자",
    description:
      "공부한 내용을 정리하거나 프로젝트를 진행하며 마주쳤던 문제들의 해결과정을 기록하고 있습니다. '왜'를 중시하는 문서화를 통해 체계적이고 효율적으로 개발하기 위해 노력하고 있습니다.",
  },
  {
    count: "3️⃣",
    title: "소통하는 개발자",
    description:
      "개발자에게 협업은 필수입니다. 이를 위해 소통하는 것을 중요하게 생각합니다. 꾸준한 코드리뷰와 회의 등을 통해 협업을 진행하면서 소통능력을 향상시키기 위해 노력하고 있습니다.",
  },
];

export { USER_DETAIL, USER_LINKS, AUTH_ERROR, ABOUT_INFOS };
