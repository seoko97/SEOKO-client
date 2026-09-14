import { USER_DETAIL, USER_LINKS } from "@utils/constant/user";
import Avatar from "@components/ui/core/Avatar";
import HomeClient from "@components/ui/client/home";
import Hydrate from "@components/pages/Post/Hydrate";
import { IGetPostsInput } from "@/types";

type TProps = Pick<PageProps<"/">, "searchParams">;

const getStringParam = (value: string | string[] | undefined) =>
  typeof value === "string" ? value : undefined;

const getNumberParam = (value: string | string[] | undefined) => {
  const stringValue = getStringParam(value);

  if (!stringValue) {
    return;
  }

  const numberValue = Number(stringValue);

  return Number.isNaN(numberValue) ? undefined : numberValue;
};

const normalizeSearchParams = (
  searchParams: Awaited<PageProps<"/">["searchParams"]>,
): IGetPostsInput => ({
  series: getStringParam(searchParams.series),
  skip: getNumberParam(searchParams.skip),
  limit: getNumberParam(searchParams.limit),
  tag: getStringParam(searchParams.tag),
  text: getStringParam(searchParams.text),
  sort: getNumberParam(searchParams.sort),
});

const Post = async ({ searchParams }: TProps) => {
  const params = normalizeSearchParams(await searchParams);

  return (
    <main className="frame flex flex-col items-center justify-center">
      <section className="3-16 flex w-[theme(screens.md.max)] items-center justify-center gap-7 px-0 py-16 text-primary md:w-full md:flex-col md:gap-4 md:px-0 md:pb-12 md:pt-8">
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
      <Hydrate params={params}>
        <HomeClient params={params} />
      </Hydrate>
    </main>
  );
};

export default Post;
