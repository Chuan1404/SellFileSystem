import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popup: {
    isLoading: false,
    isFormShow: false,
  },
  form: {}
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    openLoading: (state) => {
      state.popup.isLoading = true;
    },
    closeLoading: (state) => {
      state.popup.isLoading = false;
    },
    openForm: (state, action) => {
      state.popup.isFormShow = true;
      state.form = action.payload
    },
    closeForm: (state) => {
      state.popup.isFormShow = false;
    },
    closePopup: (state) => {
      Object.keys(state.popup).forEach((key) => {
        state.popup[key] = false;
      });
    },
  },
});

export const { openLoading, closeLoading, openForm, closeForm, closePopup } =
  pageSlice.actions;
export default pageSlice.reducer;
