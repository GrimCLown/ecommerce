import jwtDecode from "jwt-decode";
import apiClient from "../utils/api-client";

export async function signup(user, profile) {
  const body = new FormData();
  body.append("name", user.name);
  body.append("email", user.email);
  body.append("password", user.password);
  body.append("deliveryAddress", user.deliveryAddress);
  body.append("profilePic", user.profile);

  const { data } = await apiClient.post("/user/signup", body);
}

export async function login(user) {
  const { data } = await apiClient.post("/user/login", user);
  localStorage.setItem("token", data.token);
}

// export async function logout() {
//   localStorage.removeItem("token");
// }

export function getuser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }

  localStorage.setItem("token", data.token);
}

export function getJwt() {
  return localStorage.getItem("token");
}
