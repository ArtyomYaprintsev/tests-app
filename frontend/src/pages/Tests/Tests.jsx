import React, { useEffect } from "react";
import { useGetTestsListQuery } from "../../redux/tests/tests.api";
import List from "../../components/List";
import Loader from "../../components/Loader";

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
        renderItem={(item) => (
          <div>
            <div>
              <a
                href={`/tests/${item.id}`}
              >{`Перейти к тесту: "${item.name}".`}</a>
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
