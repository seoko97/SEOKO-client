"use client";

import React from "react";

import Link from "next/link";

import { useGetSeriesQueries } from "@hooks/query/series";
import Image from "@components/ui/core/Image";
import DateTime from "@components/ui/core/DateTime";

const Series = () => {
  const { data: seriesList } = useGetSeriesQueries();

  if (!seriesList) return null;

  return (
    <div className="grid w-full grid-cols-3 items-start gap-x-5 gap-y-8 sm:!grid-cols-1 md:grid-cols-2">
      {seriesList.map((series) => (
        <Link key={series._id} href={`/series/${series.nid}`}>
          <div
            key={series._id}
            className="group flex cursor-pointer flex-col items-center justify-start gap-3"
          >
            <div className="w-full flex-1 rounded-b-md rounded-t-md">
              <Image src={series.thumbnail ?? "/SEOKO.png"} alt={series.name} priority />
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
                  마지막 업데이트 <DateTime date={series.updatedAt} />
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Series;
