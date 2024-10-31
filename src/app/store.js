import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import auth from "../pages/authorization/AuthSlice";
import { Api } from "../api/Api";
import subcategory from "../pages/subcategory/subcategorySlice";
import   category  from "../pages/category/categorySlice";
import products from "../pages/products/ProductsSlice";

export const store = configureStore({
  reducer: {
     auth: auth,
     subcategory: subcategory,
     category: category,
     products: products,

    [Api.reducerPath]: Api.reducer,
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
});

setupListeners(store.dispatch);
