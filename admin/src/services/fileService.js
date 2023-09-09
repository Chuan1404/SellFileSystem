import { ADMIN_API, API } from "../assets/js/constants";
import { getData } from "../utils/fetchData";

const fileService = {
  getFiles(search = "") {
    if (search == "") search = "?";
    return getData(`${API}/file/${search}`);
  },
};

export default fileService;
