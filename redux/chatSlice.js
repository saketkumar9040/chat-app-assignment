import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name:"chat",
    initialState:{
        chatList :null
    },
    reducers :{
        setChatList : (state,action) => {
           state.chatList = action.payload.chatList
        }
    }
})

export const chatReducer = chatSlice.reducer;
export const setChatList = chatSlice.actions.setChatList;