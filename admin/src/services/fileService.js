import { API } from "../assets/js/constants";
import { callWithToken, getData } from "../utils/fetchData";

const fileService = {
  getFiles(search = "") {
    if (search == "") search = "?";
    return getData(`${API}/file/${search}`);
  },

  updateFiles(id, form) {
    return callWithToken(`${API}/file/update/${id}`, {
      method: "POST",
      body: form,
    })
  }
};

export default fileService;
