import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const digApi = createApi({
  reducerPath: "digApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  tagTypes: ["Digs"],
  endpoints: (builder) => ({
    getAssets: builder.query({
      query: () => "/assets",
    }),
    getDigs: builder.query({
      query: () => "/digs",
      providesTags: ["Digs"],
    }),
    addDig: builder.mutation({
      query: (newDig) => ({
        url: "/digs",
        method: "POST",
        body: newDig,
      }),
      invalidatesTags: ["Digs"],
    }),
  }),
});

export const { useGetAssetsQuery, useGetDigsQuery, useAddDigMutation } = digApi;
