import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import defaultPrepareHeaders from "../defaultPrepareHeaders";

const personalApi = createApi({
  reducerPath: "personalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api/`,
    prepareHeaders: defaultPrepareHeaders,
  }),
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (data) => ({
        url: "signup/",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "login/",
        method: "POST",
        body: data,
      }),
    }),
    logoutUser: builder.mutation({
      query: (data) => ({
        url: "logout/",
        method: "POST",
        body: data,
      }),
    }),
    getUserData: builder.query({
      query: () => ({
        url: "me/",
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserDataQuery,
} = personalApi;

export default personalApi;
