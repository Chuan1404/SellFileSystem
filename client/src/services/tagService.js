import { API } from "../assets/js/constants";
import { getData } from "../utils/fetchData";

const tagService = {
  getByKw(kw) {
    return getData(`${API}tag/?q=${kw}`);
  },
  getTop() {
    return getData(`${API}tag/top`)
  }
};

export default tagService;