import React, { forwardRef } from "react";

import styles from "./Input.module.scss";

export const Input = forwardRef(
  (
    {
      fieldId,
      formError,
      fetchError,
      type = "text",
      label = "default-label",
      labelTitle = "",
      isRequired = false,
      isTextarea = false,
      showAsRow = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={[
          styles.input__container,
          isRequired ? styles.required : "",
          showAsRow ? styles.row : "",
        ]
          .join(" ")
          .trim()}
      >
        <label title={labelTitle} htmlFor={fieldId}>
          {label}
        </label>

        {isTextarea ? (
          <textarea id={fieldId} ref={ref} {...props} />
        ) : (
          <input type={type} id={fieldId} ref={ref} {...props} />
        )}

        {formError && (
          <span role='alert' className='validation'>
            {formError.message}
          </span>
        )}

        {fetchError &&
          (Array.isArray(fetchError) ? (
            <>
              {formError.map((error, index) => (
                <span role='alert' key={index} className='fetch'>
                  {error}
                </span>
              ))}
            </>
          ) : (
            <span role='alert' className='fetch'>
              {formError.message}
            </span>
          ))}
      </div>
    );
  }
);
