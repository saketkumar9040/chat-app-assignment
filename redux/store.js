import { configureStore } from "@reduxjs/toolkit";


export const Store = configureStore({
    auth:authReducer,
    user:userReducer,
    chat:chatReducer,
    message:messageReducer
})