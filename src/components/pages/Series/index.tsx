import Link from "next/link";

import { seriesQueryKeys } from "@utils/query/queryKeys";
import getQueryClient from "@utils/query/getQueryClient";
import Image from "@components/ui/core/Image";
import DateTime from "@components/ui/core/DateTime";
import { getSeriesAll } from "@/apis/series";

const SeriesList = async () => {
  const queryClient = getQueryClient();

  const seriesList = await queryClient.query({
    queryKey: seriesQueryKeys.root,
    queryFn: getSeriesAll,
  });

  const referenceTime = queryClient.getQueryState(seriesQueryKeys.root)?.dataUpdatedAt;

  return (
    <section className="frame mb-8 flex flex-col items-center">
      <div className="w-[theme(screens.md.max)] px-0 py-4 sm:mb-4 md:w-full">
        <h1 className="mb-2 text-4xl font-bold text-primary transition-[color]">
          SERIES
          <span className="ml-4 align-top text-sm font-normal">{seriesList.length} series</span>
        </h1>
        <p className="text-slate-500 transition-[color] dark:text-slate-400">
          연재된 시리즈 목록입니다.
        </p>
      </div>
      <div className="mb-8 mt-4 h-1 w-[300px] bg-slate-300 sm:hidden" />
      <div className="grid w-full grid-cols-3 items-start gap-x-5 gap-y-8 sm:!grid-cols-1 md:grid-cols-2">
        {seriesList.map((series) => (
          <Link key={series._id} href={`/series/${series.nid}`}>
            <div
              key={series._id}
              className="group flex cursor-pointer flex-col items-center justify-start gap-3"
            >
              <div className="relative aspect-default w-full overflow-hidden rounded-md">
                <Image
                  fill
                  src={series.thumbnail ?? "/SEOKO.png"}
                  alt={series.name}
                  sizes="(max-width: 480px) calc(100vw - 32px), (max-width: 768px) calc((100vw - 52px) / 2), (max-width: 1024px) calc((100vw - 72px) / 3), 328px"
                  className="rounded-md"
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <h3 className="truncate font-semibold text-primary transition-[color] group-hover:text-effect1">
                  {series.name}
                </h3>
                <div className="truncate text-sm text-slate-500 dark:text-slate-400">
                  <span className="text-primary transition-[color]">
                    {series.postCount}개의 포스트
                  </span>
                  <span className="mx-1">·</span>
                  <span>
                    마지막 업데이트{" "}
                    {referenceTime && (
                      <DateTime date={series.updatedAt} referenceTime={referenceTime} />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SeriesList;
