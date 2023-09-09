import { API } from "../assets/js/constants";
import { callWithToken } from "../utils/fetchData";

const userService = {
  getInfo() {
    return callWithToken(`${API}user/info`);
  },
};

export default userService;
