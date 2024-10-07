import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import auth from "../pages/authorization/AuthSlice";
import { Api } from "../api/Api";

export const store = configureStore({
  reducer: {
    // auth: auth,

    [Api.reducerPath]: Api.reducer,
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
});

setupListeners(store.dispatch);
