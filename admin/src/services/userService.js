import { ADMIN_API, API } from "../assets/js/constants";
import { callWithToken, getData, postData } from "../utils/fetchData";

const userService = {
  getInfo() {
    return callWithToken(`${API}/user/info`);
  },
  getUsers(search = '', role) {
    if(search == '') search = '?'
    return getData(`${ADMIN_API}/user/${search}&role=${role}`)
  },
  deleteUser(id) {
    return getData(`${ADMIN_API}/user/delete/${id}`)
  },
  updateUser(id, form) {
    return callWithToken(`${ADMIN_API}/user/update/${id}`, {
      method: "POST",
      body: form,
    })
  }
};

export default userService;
