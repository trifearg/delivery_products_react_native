import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { productsApi } from "./api/productsApi";
import { customersApi } from "./api/customersApi";
import { ordersApi } from "./api/ordersApi";
import { cartSlice } from "./slices/cartSlice";
import { userSlice } from "./slices/userSlice";
import { appSlice } from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    app: appSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(customersApi.middleware)
      .concat(ordersApi.middleware),
});

setupListeners(store.dispatch);
