import axios from "axios";

export async function authenticateUser(email, password) {
  const response = await axios.post("/users/login", { email, password });
  const { token } = response.data;
  //set a global property value(authorization header) for every call
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return token;
}

// handle all the api calls and returns data property from axios.
export async function notes({ method, data, id }) {
  const response = await axios({
    method,
    url: `/notes${id ? `/${id}` : ""}`,
    ...(data ? { data } : {}),
  });
  return response.data;
}
