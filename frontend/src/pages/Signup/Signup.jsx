import React from "react";
import { useForm } from "react-hook-form";

import { useSignupUserMutation } from "../../redux/personal/personal.api";

import Input from "../../components/Input";
import Loader from "../../components/Loader";

export const Signup = () => {
  const [signupUser, { data, isLoading, error }] = useSignupUserMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (data) reset();
  }, [data]);

  useEffect(() => {
    if (error && ![401, 400].includes(error.status)) {
      alert(JSON.stringify(error, null, 2));
    }
  }, [error]);

  return (
    <div className='login-page page'>
      <main>
        {data && (
          <div>
            <h3>Пользователь успешно зарегистрирован</h3>
            Вы можете перейти на страницу <a href='/login'>входа</a>.
          </div>
        )}

        <form className='login__form' onSubmit={handleSubmit(signupUser)}>
          <h2>Авторизация</h2>

          <Input
            isRequired
            id='username'
            type='text'
            label='Имя пользователя'
            autoComplete='username'
            formError={errors.username}
            fetchError={error?.data?.username}
            {...register("username", {
              required: "Имя пользователя - обязательное поле",
              maxLength: {
                value: 100,
                message:
                  "Имя пользователя должно включать не более 100 символов.",
              },
            })}
          />

          <Input
            isRequired
            id='password'
            type='password'
            label='Пароль'
            autoComplete='none'
            formError={errors.password}
            fetchError={error?.data?.password}
            {...register("password", {
              required: "Пароль - обязательное поле.",
              maxLength: {
                value: 128,
                message: "Пароль должен включать не более 128 символов.",
              },
            })}
          />

          {isLoading && <Loader />}

          {error?.data?.detail && (
            <span role='alert' className='fetch'>
              {error?.data?.detail}
            </span>
          )}

          <input type='submit' value='Авторизоваться' disabled={isLoading} />
        </form>
      </main>
    </div>
  );
};
