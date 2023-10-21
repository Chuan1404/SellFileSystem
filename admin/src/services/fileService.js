import { ADMIN_API, API } from "../assets/js/constants";
import { callWithToken, getData } from "../utils/fetchData";

const fileService = {
  getFiles(search = "") {
    if (search == "") search = "?";
    return callWithToken(`${ADMIN_API}/file/${search}`);
  },

  updateFiles(id, form) {
    return callWithToken(`${API}/file/update/${id}`, {
      method: "POST",
      body: form,
    })
  },

  deleteFile(id, form) {
    return callWithToken(`${API}/file/delete/${id}`, {
      method: "DELETE",
    })
  }
};

export default fileService;
