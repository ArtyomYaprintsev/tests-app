import React from "react";

import styles from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <span className={styles.loader}></span>
    </div>
  );
};
