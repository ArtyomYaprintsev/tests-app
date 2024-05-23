import React, { useEffect } from "react";
import { useGetTestsListQuery } from "../../redux/tests/tests.api";
import List from "../../components/List";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

import styles from "./Tests.module.scss";

export const Tests = () => {
  const { isLoading, data, error } = useGetTestsListQuery();

  useEffect(() => {
    if (error && ![401].includes(error.status)) {
      alert(JSON.stringify(error, null, 2));
    }
  }, [error]);

  return (
    <div className='tests-page page'>
      <h2>Доступные тесты</h2>

      {isLoading && <Loader />}

      <List
        data={data ?? []}
        listItemKey={"id"}
        listClassName={styles.tests}
        renderItem={(item) => (
          <div>
            <div>
              <Link
                to={`/tests/${item.id}`}
              >{`Перейти к тесту: "${item.name}".`}</Link>
            </div>

            <div>{item.description ?? "Описание отсутствует"}</div>

            <div>Создан: {new Date(item.created).toLocaleString()}</div>
            <div>
              Последнее обновление: {new Date(item.modified).toLocaleString()}
            </div>
          </div>
        )}
      />
    </div>
  );
};
