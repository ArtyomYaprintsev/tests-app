import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRetrieveTestQuery } from "../../redux/tests/tests.api";
import List from "../../components/List";
import { useForm } from "react-hook-form";
import { useCreateResultMutation } from "../../redux/results/results.api";
import Loader from "../../components/Loader";

export const TestInstance = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useRetrieveTestQuery(testId);
  const [
    createResult,
    { data: result, isLoading: resultIsLoading, error: resultError },
  ] = useCreateResultMutation();

  const { handleSubmit, register } = useForm();

  useEffect(() => {
    if (result && result.id) {
      navigate(`/results/${result.id}`);
    }
  }, [result]);

  return (
    <div className='test-instance-page page'>
      <h2>{`Тест "${data ? data.name : "#" + testId}"`}</h2>

      {data && (
        <>
          <div>Описание: {data.description ?? "Описание отсутствует"}</div>

          <div>Создан: {new Date(data.created).toLocaleString()}</div>
          <div>
            Последнее обновление: {new Date(data.modified).toLocaleString()}
          </div>
        </>
      )}

      {(isLoading || resultIsLoading) && <Loader />}

      <form
        onSubmit={handleSubmit((data) => {
          data["user_points"] = Object.entries(data)
            .filter(([key]) => key.startsWith("question-"))
            .reduce((acc, [, value]) => {
              acc += +value;
              return acc;
            }, 0);
          createResult(data);
        })}
      >
        <input type='hidden' value={testId} {...register("test")} />

        {data && data.question_set && (
          <List
            data={data.question_set}
            renderItem={(question, index) => (
              <div>
                <div>{`Вопрос ${index + 1}: ${question.text}.`}</div>

                <div>
                  {["Нет", "Скорее нет", "Не знаю", "Скорее да", "Да"].map(
                    (choice, index) => (
                      <div key={index}>
                        <input
                          type='radio'
                          value={index}
                          id={`question-${question.id}-${index}`}
                          {...register(`question-${question.id}`, {
                            required: true,
                          })}
                        />
                        <label htmlFor={`question-${question.id}-${index}`}>
                          {choice}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          />
        )}

        {data && data.question_set && (
          <input type='submit' value='Подтвердить' />
        )}
      </form>
    </div>
  );
};
