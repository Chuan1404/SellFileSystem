import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popup: {
    auth: false,
    image: false,
    cart: false,
    message: false,
  },
  alert: {
    message: "",
    type: "success",
    isOpen: false,
  }
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    openAuth: (state) => {
      state.popup.auth = true;
    },
    closeAuth: (state) => {
      state.popup.auth = false;
    },
    openAlert: (state, action) => {
      state.alert.isOpen = true;
      state.alert.message = action.payload.message;
      state.alert.type = action.payload.type;
    },
    closeAlert: (state) => {
      state.alert.isOpen = false;
    },
    closePopup: (state) => {
      Object.keys(state.popup).forEach((key) => {
        state.popup[key] = false;
      });
    },
  },
});

export const { openAuth, closeAuth, closePopup, openAlert, closeAlert } =
  pageSlice.actions;
export default pageSlice.reducer;
