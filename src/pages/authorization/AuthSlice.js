import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    putAuth: (state, action) => {
      state.authToken = action.payload;
    },
  },
});

export const { putAuth } = authSlice.actions;
export const auth = (state) => state.authSlice;
export default authSlice.reducer;
