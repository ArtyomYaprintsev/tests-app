import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import defaultPrepareHeaders from "../defaultPrepareHeaders";

const resultsApi = createApi({
  reducerPath: "resultsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api/results/`,
    prepareHeaders: defaultPrepareHeaders,
  }),
  endpoints: (builder) => ({
    getResultsList: builder.query({
      query: () => ({
        url: "",
      }),
    }),
    createResult: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
    retrieveResult: builder.query({
      query: (testId) => ({
        url: `${testId}/`,
      }),
    }),
  }),
});

export const {
  useLazyGetResultsListQuery,
  useCreateResultMutation,
  useRetrieveResultQuery,
} = resultsApi;

export default resultsApi;
