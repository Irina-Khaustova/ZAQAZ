import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
  
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
   reducers: {
   putcategory: (state, action) => {
      state.category = action.payload;
         },
},
});

export const {
  putcategory,
} = categorySlice.actions;
 export const category = (state) => state.categorySlice;
 export default categorySlice.reducer;