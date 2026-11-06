import { configureStore } from "@reduxjs/toolkit";
import { digApi } from "./digApi";

export const store = configureStore({
  reducer: {
    [digApi.reducerPath]: digApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(digApi.middleware),
});
