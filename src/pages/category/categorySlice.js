import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
  
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
   reducers: {
   putcategory: (state, action) => {
    console.log(action.payload)
      state.category = action.payload;
      console.log(state.category)
         },
},
});


export const {
  putcategory,
} = categorySlice.actions;
 export const category = (state) => state.categorySlice;
 export default categorySlice.reducer;