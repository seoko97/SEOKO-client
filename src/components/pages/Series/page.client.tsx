"use client";

import React from "react";

import Link from "next/link";

import { dateTimeParser } from "@utils/dateTimeParser";
import { useGetSeriesQueries } from "@hooks/query/series";
import Image from "@components/ui/core/Image";

const Series = () => {
  const { data: seriesList } = useGetSeriesQueries();

  if (!seriesList) return null;

  return (
    <div className="grid w-full grid-cols-3 items-start gap-x-5 gap-y-8 sm:!grid-cols-1 md:grid-cols-2">
      {seriesList.map((series) => (
        <Link key={series._id} href={`/series/${series.nid}`}>
          <div
            key={series._id}
            className="flex cursor-pointer flex-col items-center justify-start gap-3 text-primary transition-[color]"
          >
            <div className="w-full flex-1 rounded-b-md rounded-t-md">
              <Image src={series.thumbnail ?? "/main.jpg"} alt={series.name} priority />
            </div>
            <div className="flex w-full flex-col gap-2">
              <h3 className="truncate text-base font-semibold">{series.name}</h3>
              <div className="truncate text-sm text-primary text-slate-500">
                <span className="text-primary transition-[color]">
                  {series.postCount}개의 포스트
                </span>
                <span className="mx-1">·</span>
                <span>마지막 업데이트 {dateTimeParser(series.updatedAt)}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Series;
