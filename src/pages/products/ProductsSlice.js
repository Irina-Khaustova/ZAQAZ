import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalEdit: {
  isOpenModalEdit: false,
  productIsEditId: null,
  },
  newUrl: '',
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    putIsOpenModalEdit: (state, action) => {
      state.modalEdit.isOpenModalEdit = action.payload.isOpen;
      state.modalEdit.productIsEditId = action.payload.id
    },
    putUrl: (state, action) => {
      console.log(action.payload)
      state.url = action.payload;
      
    },
  },
});

export const { putIsOpenModalEdit, putUrl } = productsSlice.actions;
export const products = (state) => state.productsSlice;
export default productsSlice.reducer;
