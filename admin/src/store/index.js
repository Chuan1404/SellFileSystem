import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import createSagaMiddleWare from "redux-saga";
import mySaga from "./saga"
import pageSlice from "./slices/pageSlice";

const sagaMiddleWare = createSagaMiddleWare();
const store = configureStore({
    reducer: {
        auth: authSlice,
        page: pageSlice
    },
    middleware: [sagaMiddleWare]
})

sagaMiddleWare.run(mySaga);
const token = JSON.parse(localStorage.getItem("token"));

if (token) {
  store.dispatch({
    type: 'FETCH_INFO',
  })
}
export default store;