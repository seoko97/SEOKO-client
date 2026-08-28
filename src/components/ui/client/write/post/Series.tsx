import { useState } from "react";

import Button from "@components/ui/core/Button";
import SeriesList from "@components/modal/series/list";
import { usePostWriteContext } from "@/context/PostWriteContext";

const SeriesEditor = () => {
  const { dataRef, updateData } = usePostWriteContext();

  const [modalState, setModalState] = useState(false);
  const [series, setSeries] = useState(dataRef.current.series);

  const onChangeSeries = (series?: string) => {
    setSeries(series);
    updateData("series", series);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <h3 className="text-xl font-semibold text-primary">시리즈</h3>
        <div className="flex items-center gap-4 text-primary">
          {series && <p>{series}</p>}
          <div className="flex gap-2">
            <Button buttonType="primary" onClick={() => setModalState(true)}>
              {series ? "변경" : "추가"}
            </Button>
            {series && (
              <Button buttonType="danger" onClick={() => onChangeSeries()}>
                제거
              </Button>
            )}
          </div>
        </div>
      </div>
      {modalState && (
        <SeriesList
          onChangeSeries={onChangeSeries}
          onClose={() => setModalState(false)}
          defaultSeries={series}
        />
      )}
    </>
  );
};

export default SeriesEditor;
