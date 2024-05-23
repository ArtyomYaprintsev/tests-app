import React, { useEffect } from "react";
import { useLazyGetResultsListQuery } from "../../redux/results/results.api";
import Loader from "../../components/Loader";
import List from "../../components/List";

export const Home = () => {
  const [getResults, { data, isLoading, error }] = useLazyGetResultsListQuery();

  useEffect(() => {
    getResults();
  }, [getResults]);

  useEffect(() => {
    if (error && ![401].includes(error.status)) {
      alert(JSON.stringify(error, null, 2));
    }
  }, [error]);

  return (
    <div className='home-page page'>
      <h2>Выши предыдущие результаты.</h2>

      {isLoading && <Loader />}

      <div>
        <a href='/tests'>Перейти к списку тестов.</a>
      </div>

      <List
        data={data ?? []}
        listItemKey={"id"}
        renderItem={(item) => (
          <div>
            <div>
              <a href={`/results/${item.id}`}>{`Перейти к результату.`}</a>
            </div>
            <div>
              <a href={`/tests/${item.test}`}>{`Перейти к тесту.`}</a>
            </div>

            <div>Идентификатор теста: {item.test}</div>
            <div>Тест пройден: {new Date(item.created).toLocaleString()}</div>
          </div>
        )}
      />
    </div>
  );
};
