import React, { useState } from "react";

import { useGetSeriesQueries } from "@hooks/query/series";
import Input from "@components/ui/core/Input";
import Button from "@components/ui/core/Button";
import ModalLayout from "@components/modal/ModalLayout";

interface IProps {
  defaultSeries?: string;
  onChangeSeries: (series: string) => void;
  onClose: () => void;
}

const SeriesList = (props: IProps) => {
  const { defaultSeries, onClose, onChangeSeries } = props;

  const [selectedSeries, setSeries] = useState<string>(defaultSeries || "");
  const { data: series } = useGetSeriesQueries();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    onChangeSeries(selectedSeries);
    onClose();
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    setSeries(target.value);
  };

  return (
    <ModalLayout onClose={onClose}>
      <form
        onSubmit={onSubmit}
        className="z-[60] flex h-fit max-h-[600px] w-[600px] flex-col gap-4 rounded-md bg-tertiary px-5 py-7 shadow-md transition-[background-color] md:w-full"
      >
        <Input value={selectedSeries} onChange={onChangeValue} />
        <ul className="flex flex-col">
          {series?.length === 0 && <h3>시리즈가 없습니다.</h3>}
          {series?.map((item) => (
            <li
              key={item._id + String(Math.random())}
              onClick={() => setSeries(item.name)}
              className={`border-primary/50 flex-1 cursor-pointer border-t px-1 py-2 text-primary transition-colors first:border-none hover:text-effect1 ${
                defaultSeries === item.name && "text-green-500"
              }}`}
            >
              {item.name}
            </li>
          ))}
        </ul>
        {/* 버튼 */}
        <div className="flex gap-4 [&>button]:flex-1">
          <Button type="button" buttonType="danger" onClick={onClose}>
            취소
          </Button>
          <Button type="submit" buttonType="primary">
            확인
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default SeriesList;
