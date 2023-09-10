import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { userReducer } from "./userSlice";
import { chatReducer } from "./chatSlice";
import { messageReducer } from "./messageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user:userReducer,
    chat:chatReducer,
    message:messageReducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
