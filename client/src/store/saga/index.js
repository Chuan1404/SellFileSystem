import { call, put, takeLatest } from "redux-saga/effects";
import authService from "../../services/authService";
import { setInfo, signIn } from "../slices/authSlice";
import { closeAuth } from "../slices/pageSlice";
import userService from "../../services/userService";

// sign in
function* fetchSignIn(action) {
  const response = yield call(authService.signIn, action.payload);
  if (!response.error) {
    yield put(signIn(response));
    yield put({ type: "FETCH_INFO" });
    yield put(closeAuth());
  } else {
    alert(response.error)
  }
}

// get user info
function* fetchInfo() {
  const response = yield call(userService.getInfo);
  if (!response.error) {
    yield put(setInfo(response));
  } else {
    alert(response.error)
  }
}

function* oAuth2(action) {
  const response = yield call(authService.google, action.payload);
  if (!response.error) {
    yield put(signIn(response));
    yield put({ type: "FETCH_INFO" });
    yield put(closeAuth());
  } else {
    alert(response.error)
  }
}

function* mySaga() {
  yield takeLatest("SIGNIN", fetchSignIn);
  yield takeLatest("OAUTH2", oAuth2)
  yield takeLatest("FETCH_INFO", fetchInfo);
}

export default mySaga;
