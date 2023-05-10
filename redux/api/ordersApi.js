import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {API_URL} from "../../assets/environment";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + "api/orders/",
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
