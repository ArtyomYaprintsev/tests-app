import React from "react";
import { useGetUserDataQuery } from "../../redux/personal/personal.api";

export const Header = () => {
  const { data } = useGetUserDataQuery();

  return (
    <div className='header'>
      <nav>
        <a href='/home'>Главная</a>
        <a href='/tests'>Тесты</a>
        {data && (
          <a href='/logout' className='warning'>
            Выйти
          </a>
        )}
      </nav>

      {data && <div>{data.username}</div>}
    </div>
  );
};
