import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subcategoryName: null,
  
};

export const subcategorySlice = createSlice({
  name: "subcategory",
  initialState,
   reducers: {
   putSubcategoryName: (state, action) => {
      state.subcategoryName = action.payload;
         },
},
});

export const {
  putSubcategoryName,
} = subcategorySlice.actions;
 export const subcategory = (state) => state.subcategorySlice;
 export default subcategorySlice.reducer;