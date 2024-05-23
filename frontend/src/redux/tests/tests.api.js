import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import defaultPrepareHeaders from "../defaultPrepareHeaders";

const testsApi = createApi({
  reducerPath: "testsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api/tests/`,
    prepareHeaders: defaultPrepareHeaders,
  }),
  endpoints: (builder) => ({
    getTestsList: builder.query({
      query: () => ({
        url: "",
      }),
    }),
    retrieveTest: builder.query({
      query: (testId) => ({
        url: `${testId}/`,
      }),
    }),
  }),
});

export const { useGetTestsListQuery, useRetrieveTestQuery } = testsApi;

export default testsApi;
