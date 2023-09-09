import { API } from "../assets/js/constants";
import { postData } from "../utils/fetchData";

const authService = {
  async signUp(form) {
    const response = await fetch(`${API}auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    return response.status === 400
      ? {
          error: (await response.json()).error,
        }
      : {
          message: (await response.json()).message,
        };
  },
  signIn(form) {
    return postData(`${API}auth/sign-in`, form);
  },
  google(form) {
    return postData(`${API}auth/google`, form);
  },
  refreshToken(form) {
    return postData(`${API}auth/refresh-token`, form);
  },
};

export default authService;
