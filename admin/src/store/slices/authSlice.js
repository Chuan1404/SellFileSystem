import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action) {
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    setInfo(state, action) {
      state.user = action.payload;
    },
    signOut(state, action) {
      localStorage.removeItem("token");
      state.user = {}
    },
  },
});

export const { signIn, signOut, setInfo } = authSlice.actions;
export default authSlice.reducer;