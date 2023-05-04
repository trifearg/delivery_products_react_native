import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.101:3000/api/orders/",
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: `create`,
        method: "POST",
        body: data,
      }),
    }),
    getUserOrders: builder.query({
      query: (id) => ({
        url: `getOrders/${id}`,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetUserOrdersQuery } = ordersApi;
