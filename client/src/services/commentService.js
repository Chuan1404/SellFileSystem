import { API } from "../assets/js/constants";
import { callWithToken } from "../utils/fetchData";

const commentService = {
  getCommentOfFile(fileId) {
    return callWithToken(`${API}comment/?fileId=${fileId}`);
  },
  addComment(fileId, content = "") {
    return callWithToken(`${API}comment/add`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileId,
        content,
      }),
      type: 'json'
    });
  },
};

export default commentService;
