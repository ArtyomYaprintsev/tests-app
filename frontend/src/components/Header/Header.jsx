import React from "react";
import { useGetUserDataQuery } from "../../redux/personal/personal.api";

import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

export const Header = () => {
  const { data } = useGetUserDataQuery();

  return (
    <div className={styles.header}>
      {data && <div>{data.username}</div>}
      <nav>
        <Link to='/home'>Главная</Link>
        <Link to='/tests'>Тесты</Link>
        {data && (
          <Link to='/logout' className={styles.warning}>
            Выйти
          </Link>
        )}
      </nav>
    </div>
  );
};
