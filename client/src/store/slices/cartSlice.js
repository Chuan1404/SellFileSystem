import { createSlice } from "@reduxjs/toolkit";

const initialState = { values: {} };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart(state) {
      let cart = localStorage.getItem("cart") || "{}";
      state.values = JSON.parse(cart);
    },
    addFile(state, action) {
      const { userId, file } = action.payload;
      if (!state.values[userId]) state.values[userId] = [];
      if (state.values[userId].findIndex((item) => item.id == file.id) == -1) {
        state.values[userId] = [...state.values[userId], file];
      }

      localStorage.setItem("cart", JSON.stringify(state.values));
    },
    deleteFile(state, action) {
      const { userId, fileId } = action.payload;
      state.values[userId] = state.values[userId].filter(
        (item) => item.id != fileId
      );
      localStorage.setItem("cart", JSON.stringify(state.values));
    },

    clear(state, action) {
      const { userId } = action.payload;
      delete state.values[userId];
      localStorage.setItem("cart", JSON.stringify(state.values));
    },
  },
});

export const { getCart, addFile, deleteFile, clear } = cartSlice.actions;
export default cartSlice.reducer;
