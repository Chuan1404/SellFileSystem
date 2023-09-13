import { API } from "../assets/js/constants";
import { callWithToken, getData } from "../utils/fetchData";

const fileService = {
  getFiles(search = "") {
    if (search == "") search = "?";
    return getData(`${API}file/${search}`);
  },
  getFile(id) {
    return getData(`${API}file/${id}`);
  },
  downloadFile(url) {
    return callWithToken(`${API}file/download/${url}`, {type: 'text'})
  }
};

export default fileService;