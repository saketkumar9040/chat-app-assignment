import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:"message",
    initialState:{
        messageData : null
    },
    reducers : {
        setMessageList : (state,action)=>{
            state.messageData= action.payload.messageData;
        }
    }
});

export const messageReducer = messageSlice.reducer;
export const setMessageList = messageSlice.actions.setMessageList;