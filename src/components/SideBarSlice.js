import { createSlice } from "@reduxjs/toolkit";

const initialState = {
storeHouse: null,
};

export const sideBarSlice = createSlice({
name: "sideBar",
initialState,
reducers: {
putStoreHouse: (state, action) => {
state.storeHouse = action.payload;
},
},
});

export const {
putStoreHouse,
} = sideBarSlice.actions;
export const sideBar = (state) => state.sideBarSlice;
export default sideBarSlice.reducer;