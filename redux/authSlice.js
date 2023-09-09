import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: null,
  },
  reducers: {
    authenticate: (state, action) => {
      state.userData = action.payload.userData;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { authenticate } = authSlice.actions;
