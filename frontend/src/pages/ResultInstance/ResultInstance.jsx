import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useRetrieveResultQuery } from "../../redux/results/results.api";
import Loader from "../../components/Loader";

import image from "../../assets/code.png";

import styles from "./ResultInstance.module.scss";

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
          // <div>
          //   <img
          //     src={image}
          //     alt='Example'
          //     style={{ display: "block", margin: "0 auto" }}
          //   />
          // </div>
          <div>Show good illustration.</div>
        ) : data.user_points > 5 ? (
          <div>Show normal illustration.</div>
        ) : (
          <div>Show bad illustration.</div>
        ))}

      {data && (
        <div>
          <div>
            <Link to={`/tests/${data.test}`}>{`Перейти к тесту.`}</Link>
          </div>

          <div>Идентификатор теста: {data.test}</div>
          <div>Тест пройден: {new Date(data.created).toLocaleString()}</div>

          {data.result && (
            <div
              style={{
                borderTop: "1px solid #ccc",
                paddingTop: "1rem",
                marginTop: "1rem",
              }}
            >
              <div>Результат: {data.result.summary}</div>
              <div>
                Описание: {data.result.description ?? "Описание отсутствует"}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
