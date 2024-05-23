import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useLoginUserMutation } from "../../redux/personal/personal.api";
import { uploadToken } from "../../redux/personal/auth.slice";
import Loader from "../../components/Loader";
import Input from "../../components/Input";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, { data, isLoading, error }] = useLoginUserMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data && data.token) {
      dispatch(uploadToken(data.token));
      navigate("/home");
    }
  }, [data, dispatch, navigate, uploadToken]);

  useEffect(() => {
    if (error && ![401, 400].includes(error.status)) {
      alert(JSON.stringify(error, null, 2));
    }
  }, [error]);

  return (
    <div className='login-page page'>
      <main>
        <form className='login__form' onSubmit={handleSubmit(loginUser)}>
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
            autoComplete='current-password'
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
              Введён неверный логин или пароль.
            </span>
          )}

          <input type='submit' value='Авторизоваться' disabled={isLoading} />
        </form>
      </main>
    </div>
  );
};
