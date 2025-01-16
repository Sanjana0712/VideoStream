import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

enableMapSet();

const CACHE_CAPACITY=5;
const searchSlice =  createSlice({
    name: "search",
    initialState: new Map(),
    reducers: {
        cacheResults: (state, action) => {

            //LRU Cache
            for (const [key, value] of Object.entries(action.payload)) {
               //add or update the key-value pair. 
               //if it already exists, the value will be updated and moved to the end
                state.set(key, value); 
            }

            if(state.size > CACHE_CAPACITY)
            {
                //removes the first key-least recently used
                state.delete(state.keys().next().value); 
            }
            
            //Merges the payload into the existing state
            // Using Object: Object.assign(state, action.payload);
        }
    }
})

export default searchSlice.reducer;
export const {cacheResults} = searchSlice.actions; 
