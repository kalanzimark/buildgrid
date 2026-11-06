import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const digApi = createApi({
  reducerPath: "digApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    getAssets: builder.query({
      query: () => "/assets",
    }),
    getDigs: builder.query({
      query: () => "/digs",
    }),
  }),
});

export const { useGetAssetsQuery, useGetDigsQuery } = digApi;
