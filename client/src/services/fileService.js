import { API } from "../assets/js/constants";
import { getData } from "../utils/fetchData";

const fileService = {
  getFiles(search = "") {
    if (search == "") search = "?";
    return getData(`${API}file/${search}`);
  },
  getFile(id) {
    return getData(`${API}file/${id}`);
  }
};

export default fileService;