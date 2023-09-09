import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // user:userReducer,
    // chat:chatReducer,
    // message:messageReducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
