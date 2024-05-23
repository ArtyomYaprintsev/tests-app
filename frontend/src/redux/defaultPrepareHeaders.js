import Cookies from "js-cookie";

const defaultPrepareHeaders = (headers, { getState }) => {
  const token = getState().auth?.token;

  if (token) {
    headers.set("authorization", `Token ${token}`);
  }

  headers.set("X-CSRFToken", Cookies.get("csrftoken"));

  return headers;
};

export default defaultPrepareHeaders;
