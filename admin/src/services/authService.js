import { API } from "../assets/js/constants";
import { postData } from "../utils/fetchData";

const authService = {
  async signIn(form) {
    const response = await fetch(`${API}/auth/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    return response.status !== 200
      ? {
          error: (await response.json()).error,
        }
      : {
          ...(await response.json()),
        };
  },

  refreshToken(form) {
    return postData(`${API}/auth/refresh-token`, form);;
  },
};

export default authService;
