import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        chatUsersList : null
    },
    reducers :  {
       setChatUsersList: (state,action) =>{
        state.chatUsersList = action.payload.chatUsersList
       }
    }
});

export const userReducer = userSlice.reducer;
export const setChatUsersList = userSlice.actions.setChatUsersList;
