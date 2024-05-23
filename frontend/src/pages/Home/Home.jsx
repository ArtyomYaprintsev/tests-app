import React, { useEffect } from "react";
import { useLazyGetResultsListQuery } from "../../redux/results/results.api";
import Loader from "../../components/Loader";
import List from "../../components/List";
import { Link } from "react-router-dom";

import styles from "./Home.module.scss";

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

      <List
        data={data ?? []}
        listItemKey={"id"}
        listClassName={styles.results}
        renderItem={(item) => (
          <div>
            <div>
              <Link to={`/results/${item.id}`}>{`Перейти к результату.`}</Link>
            </div>
            <div>
              <Link to={`/tests/${item.test}`}>{`Перейти к тесту.`}</Link>
            </div>

            <div>Идентификатор теста: {item.test}</div>
            <div>Тест пройден: {new Date(item.created).toLocaleString()}</div>
          </div>
        )}
      />
    </div>
  );
};
