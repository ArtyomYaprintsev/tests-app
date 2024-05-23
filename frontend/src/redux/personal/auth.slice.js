import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const TOKEN_COOKIE_NAME = "auth-token";
const LOCAL_STORAGE_UPLOAD_DATA_KEY = "token-upload-date";
const WEEK_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;

const _getInitialState = () => {
  const _initialState = {
    token: null,
    upload_date: null,
  };

  const token = Cookies.get(TOKEN_COOKIE_NAME);
  const uploadDate = localStorage.getItem(LOCAL_STORAGE_UPLOAD_DATA_KEY);

  if (token) {
    if (!uploadDate || new Date() - new Date(uploadDate) > WEEK_MILLISECONDS) {
      Cookies.remove(TOKEN_COOKIE_NAME);
      localStorage.removeItem(LOCAL_STORAGE_UPLOAD_DATA_KEY);

      return _initialState;
    }

    return { token, upload_date: uploadDate };
  }

  return _initialState;
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: _getInitialState(),
  reducers: {
    uploadToken: (state, action) => {
      state.token = action.payload;
      state.upload_date = new Date().toISOString();

      Cookies.set(TOKEN_COOKIE_NAME, state.token);
      localStorage.setItem(LOCAL_STORAGE_UPLOAD_DATA_KEY, state.upload_date);
    },

    clearToken: (state) => {
      state.token = null;
      state.upload_date = null;

      Cookies.remove(TOKEN_COOKIE_NAME);
      localStorage.removeItem(LOCAL_STORAGE_UPLOAD_DATA_KEY);
    },
  },
});

export const { uploadToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
