import { configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "./bookSlice";
import { userAuthReducer } from "./userAuthAlice";
import { categoryReducer } from "./categorySlice";
import { authApi, authorApi, bookApi, categoryApi } from "../../Apis";

const store = configureStore({
  reducer: {
    bookStore: bookReducer,
    userAuthStore: userAuthReducer,
    categoryStore: categoryReducer,

    [bookApi.reducerPath]: bookApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [authorApi.reducerPath]: authorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bookApi.middleware)
      .concat(authApi.middleware)
      .concat(categoryApi.middleware)
      .concat(authorApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
