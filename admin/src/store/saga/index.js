import { call, delay, put, takeLatest } from "redux-saga/effects";
import { userService } from "../../services";
import { setInfo } from "../slices/authSlice";
import { closeLoading, openLoading } from "../slices/pageSlice";
// get user info
function* fetchInfo() {
  try {
    yield put(openLoading());
    const response = yield call(userService.getInfo);
    if (!response.error) {
      yield put(setInfo(response));
    } else {
      alert(response.error);
    }
    yield delay(500);
    yield put(closeLoading());
  } catch {
    yield delay(500);
    yield put(closeLoading());
  }
}

function* mySaga() {
  yield takeLatest("FETCH_INFO", fetchInfo);
}

export default mySaga;
