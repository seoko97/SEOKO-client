"use client";

import PostList from "@components/ui/PostList";
import ContentHeader from "@components/ui/client/home/HomeHeader";
import { IGetPostsInput } from "@/types";

interface IProps {
  params: IGetPostsInput;
}

const HomeClient = ({ params }: IProps) => {
  return (
    <section className="flex w-full flex-col gap-5">
      <ContentHeader text={params.text ?? ""} />
      <PostList params={params} />
    </section>
  );
};

export default HomeClient;
