import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./slices/pageSlice";
import authSlice from "./slices/authSlice";
import createSagaMiddleWare from "redux-saga";
import mySaga from "./saga";
import cartSlice, { getCart } from "./slices/cartSlice";

const sagaMiddleWare = createSagaMiddleWare();
const store = configureStore({
  reducer: {
    page: pageSlice,
    auth: authSlice,
    cart: cartSlice,
  },
  middleware: [sagaMiddleWare],
});

sagaMiddleWare.run(mySaga);

const token = JSON.parse(localStorage.getItem("token"));

if (token) {
  store.dispatch({
    type: "FETCH_INFO",
  });
}
store.dispatch(getCart());

export default store;
