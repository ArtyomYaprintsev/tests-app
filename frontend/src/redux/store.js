import { configureStore } from "@reduxjs/toolkit";

import testsApi from "./tests/tests.api";
import resultsApi from "./results/results.api";
import personalApi from "./personal/personal.api";
import authSlice from "./personal/auth.slice";

const store = configureStore({
  reducer: {
    [testsApi.reducerPath]: testsApi.reducer,
    [resultsApi.reducerPath]: resultsApi.reducer,
    [personalApi.reducerPath]: personalApi.reducer,

    auth: authSlice,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      testsApi.middleware,
      resultsApi.middleware,
      personalApi.middleware
    );
  },
});

export default store;
