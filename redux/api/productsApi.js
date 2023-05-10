import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {API_URL} from "../../assets/environment";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + "api/products/",
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
