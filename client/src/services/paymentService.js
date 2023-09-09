import { API } from "../assets/js/constants";
import { getData, postData } from "../utils/fetchData";

const paymentService = {
  pay(method, data) {
    return postData(`${API}pay/${method}`, data);
  },
  check(method, search) {
    return getData(`${API}pay/${method}/check${search}`)
  }
};

export default paymentService;