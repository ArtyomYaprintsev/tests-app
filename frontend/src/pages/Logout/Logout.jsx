import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../redux/personal/personal.api";
import { clearToken } from "../../redux/personal/auth.slice";
import Loader from "../../components/Loader";

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser, { data, isLoading, error }] = useLogoutUserMutation();

  const token = useSelector((state) => state.auth?.token);

  useEffect(() => {
    logoutUser();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(clearToken());
    }
  }, [data, dispatch, clearToken]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className='logout-page page'>
      {isLoading && <Loader />}

      <p>LogoutPage</p>

      {!isLoading && data && <p>Redirect to login page.</p>}

      {error && (
        <p>
          Не удаётся связаться с сервером. Нажмите, чтобы выйти из аккаунта
          вручную.
          <button onClick={() => dispatch(clearToken())} type='button'>
            Выйти
          </button>
        </p>
      )}
    </div>
  );
};
