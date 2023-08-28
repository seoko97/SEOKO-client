import React from "react";

import { USER_DETAIL, USER_LINKS } from "@utils/constant/user";
import Avatar from "@components/ui/core/Avatar";

const Home = async () => {
  return (
    <main className="frame flex flex-col items-center justify-center">
      <section className="3-16 flex w-[700px] items-center justify-center gap-7 px-0 py-16 text-primary md:w-full md:flex-col md:gap-4 md:px-0 md:pb-12 md:pt-8">
        <Avatar width={140} height={140} />
        <div className="flex flex-1 flex-col gap-4 transition-[color]">
          <h3 className="text-xl font-medium">👨🏻‍💻 {USER_DETAIL.username}</h3>
          <p className="font-light">{USER_DETAIL.description}</p>
          <div className="flex w-full items-center gap-5">
            {USER_LINKS.map(({ name, link, Icon }) => (
              <a key={name} href={link} target="_blank" rel="noopener noreferrer" aria-label={name}>
                <Icon className="h-6 w-6 fill-[theme(textColor.secondary)] transition-[fill] hover:fill-[theme(textColor.effect1)]" />
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="h-screen"></section>
    </main>
  );
};

export default Home;
