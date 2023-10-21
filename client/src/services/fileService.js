import { API } from "../assets/js/constants";
import { callWithToken, getData } from "../utils/fetchData";
import queryLocation from "../utils/queryLocation";

const fileService = {
  getFiles(search = "") {
    if (search == "") search = "?";
    return getData(`${API}file/${search}`);
  },
  getFile(id) {
    return getData(`${API}file/${id}`);
  },
  downloadFile(url, definition = {}) {
    let query = queryLocation.toString(definition)
    return callWithToken(`${API}file/download/${url}?${query}`, {type: 'text'})
  }
};

export default fileService;