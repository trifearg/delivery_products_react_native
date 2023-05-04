import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customersApi = createApi({
  reducerPath: "customersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.101:3000/api/customers/",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: `register`,
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: `login`,
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = customersApi;
