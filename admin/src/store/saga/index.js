import { call, delay, put, takeLatest } from "redux-saga/effects";
import { authService, userService } from "../../services";
import { setInfo, signIn } from "../slices/authSlice";
import { closeLoading, openLoading } from "../slices/pageSlice";
// get user info
function* fetchInfo() {
  try {
    yield put(openLoading());
    const response = yield call(userService.getInfo);
    if (!response.error) {
      yield put(setInfo(response));
    } else {
      // alert(response.error);
    }
    yield delay(500);
    yield put(closeLoading());
  } catch {
    yield delay(500);
    yield put(closeLoading());
  }
}
function* oAuth2(action) {
  const response = yield call(authService.google, action.payload);
  if (!response.error) {
    yield put(signIn(response))
    yield put({ type: "FETCH_INFO" });
  } else {
    alert(response.error)
  }
}
function* mySaga() {
  yield takeLatest("FETCH_INFO", fetchInfo);
  yield takeLatest("OAUTH2", oAuth2);
}

export default mySaga;
