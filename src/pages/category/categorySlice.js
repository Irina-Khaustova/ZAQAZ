import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
  categoryImage: null,
  categoryImageId: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    putcategory: (state, action) => {
      state.category = action.payload;
    },
    putcategoryImage: (state, action) => {
      state.categoryImage = action.payload;
      console.log(state.category);
    },
    putcategoryImageId: (state, action) => {
      state.categoryImageId = action.payload;
    },
  },
});

export const { putcategory, putcategoryImage, putcategoryImageId } = categorySlice.actions;
export const category = (state) => state.categorySlice;
export default categorySlice.reducer;
