import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalEdit: {
  isOpenModalEdit: false,
  productIsEditId: null,
  }
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    putIsOpenModalEdit: (state, action) => {
      state.modalEdit.isOpenModalEdit = action.payload.isOpen;
      state.modalEdit.productIsEditId = action.payload.id
    },
  },
});

export const { putIsOpenModalEdit } = productsSlice.actions;
export const products = (state) => state.productsSlice;
export default productsSlice.reducer;
