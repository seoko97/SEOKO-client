import React from "react";

import Image from "next/image";

import { ABOUT_INFOS, USER_DETAIL, USER_LINKS } from "@utils/constant/user";
import Skill from "@components/ui/client/about/Skill";
import Experience from "@components/ui/client/about/Experience";
import Hydrate from "@components/pages/About/Hydrate";

const About = () => {
  return (
    <section className="frame mx-auto my-8 flex flex-col items-center justify-start gap-20">
      <div className="flex w-full flex-col gap-3 px-10 py-3 text-primary transition-[color] md:px-0">
        <div className="flex grow items-center justify-center">
          <h1 className="grow text-5xl font-light md:text-3xl">
            안녕하세요 <br /> 개발자 <strong className="font-bold">{USER_DETAIL.username}</strong>
            입니다.
          </h1>
          <Image
            priority={true}
            src="/main.jpg"
            alt="main"
            width={200}
            height={200}
            className="rounded-md md:hidden"
          />
        </div>
        <p className="font-light">{USER_DETAIL.description}</p>
        <div className="mt-6 flex w-full items-center justify-center gap-5">
          {USER_LINKS.map(({ name, link, Icon }) => (
            <a key={name} href={link} target="_blank" rel="noopener noreferrer" aria-label={name}>
              <Icon className="h-6 w-6 fill-[theme(textColor.secondary)] transition-[fill] hover:fill-[theme(textColor.effect1)]" />
            </a>
          ))}
        </div>
      </div>
      <div className="flex w-full gap-6 md:flex-col">
        {ABOUT_INFOS.map(({ count, title, description }) => (
          <div
            key={title}
            className="flex flex-col items-start justify-start gap-3 rounded-lg bg-secondary p-6 text-primary shadow-md transition-[background-color,color]"
          >
            <div className="flex w-full flex-col items-start gap-3 md:flex-row md:items-center">
              <h3 className="text-2xl">{count}</h3>
              <span className="whitespace-pre-line break-keep text-lg font-bold">{title}</span>
            </div>
            <p className="text-sm font-normal text-slate-500 dark:text-slate-400">{description}</p>
          </div>
        ))}
      </div>
      <Hydrate>
        <Skill />
        <Experience />
      </Hydrate>
    </section>
  );
};

export default About;
