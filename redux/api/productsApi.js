import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.101:3000/api/products/",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `all`,
        responseHandler: (response) => response.json(),
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
