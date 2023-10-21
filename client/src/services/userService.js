import { API } from "../assets/js/constants";
import { callWithToken } from "../utils/fetchData";

const userService = {
  getInfo() {
    return callWithToken(`${API}user/info`)
  },
  getReceipt() {
    return callWithToken(`${API}user/receipt`)
  },

  getPaid() {
    return callWithToken(`${API}user/paid`)
  },
  getFile() {
    return callWithToken(`${API}user/file`)
  }
};

export default userService;
