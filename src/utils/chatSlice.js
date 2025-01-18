import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
};

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        addMessage : (state, action) => {
            state.messages.unshift(action.payload);

            if(state.messages.length>100)
            {
                state.messages.shift();
            }
        }
    }
});

export const {addMessage} = chatSlice.actions;
export default chatSlice.reducer;
