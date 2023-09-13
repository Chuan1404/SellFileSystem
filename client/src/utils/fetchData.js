import authService from "../services/authService";

export const postData = (api, data = {}, options = {}) => {
  return fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    ...options,
  }).then((res) => res.json());
};

export const getData = async (api, options = {}) => {
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  return response.json();
};

export const callWithToken = async (api, options = {type: 'json'}) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token)
    return {
      status: 403,
      error: "Forbiden",
    };

  options = {
    ...options,
    method: options.method ? options.method : "GET",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      ...options.headers,
    },
    body: options.body ? options.body : null,
  };
  let response = await fetch(api, options);
  if (response.status != 200) {
    response = await authService.refreshToken({
      token: token.refreshToken,
    });
    if (!response.error) {
      options.headers.Authorization = `Bearer ${response.accessToken}`;
      localStorage.setItem("token", JSON.stringify(response));
      response = await fetch(api, options);
    } else {
      localStorage.removeItem("token");
      return {
        status: 403,
        error: "Forbiden",
      };
    }
  }
  return options.type === 'json'? response.json() : response.arrayBuffer();
};
