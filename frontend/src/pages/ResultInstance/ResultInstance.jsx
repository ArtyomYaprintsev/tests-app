import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRetrieveResultQuery } from "../../redux/results/results.api";
import Loader from "../../components/Loader";

export const ResultInstance = () => {
  const { resultId } = useParams();

  const { data, isLoading, error } = useRetrieveResultQuery(resultId);

  useEffect(() => {
    if (error && ![401].includes(error.status)) {
      alert(JSON.stringify(error, null, 2));
    }
  }, [error]);

  return (
    <div className='result-instance-page page'>
      <h2>Выш результат за тест.</h2>

      {isLoading && <Loader />}

      {data &&
        (data.user_points > 10 ? (
          <div>Show good illustration.</div>
        ) : data.user_points > 5 ? (
          <div>Show normal illustration.</div>
        ) : (
          <div>Show bad illustration.</div>
        ))}

      {data && (
        <div>
          <div>
            <a href={`/tests/${data.test}`}>{`Перейти к тесту.`}</a>
          </div>

          <div>Идентификатор теста: {data.test}</div>
          <div>Тест пройден: {new Date(data.created).toLocaleString()}</div>

          {data.result && (
            <>
              <div>Результат: {data.result.summary}</div>
              <div>
                Описание: {data.result.description ?? "Описание отсутствует"}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
