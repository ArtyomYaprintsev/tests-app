import React from "react";

export const List = ({
  // Default
  data = [],
  listClassName = "",
  style = {},
  // Advanced
  renderItem,
  emptyListMessage = "List is empty",
  listItemKey = null,
  forwardedRef = null,
  ...props
}) => {
  if (!renderItem) {
    return <>Отсутствует функция рендера элементов массива.</>;
  }

  return (
    <ul className={listClassName} style={style} ref={forwardedRef} {...props}>
      {data && data.length ? (
        data.map((item, index) => (
          <li key={listItemKey ? item[listItemKey] : index}>
            {renderItem(item, index)}
          </li>
        ))
      ) : (
        <li className='empty-message'>{emptyListMessage}</li>
      )}
    </ul>
  );
};
