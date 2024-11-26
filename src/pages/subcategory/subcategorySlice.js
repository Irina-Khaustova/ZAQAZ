import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subcategory: null,
  
};

export const subcategorySlice = createSlice({
  name: "subcategory",
  initialState,
   reducers: {
   putSubcategory: (state, action) => {
    console.log(action.payload)
      state.subcategory = action.payload;
         },
},
});

export const {
  putSubcategory,
} = subcategorySlice.actions;
 export const subcategory = (state) => state.subcategorySlice;
 export default subcategorySlice.reducer;