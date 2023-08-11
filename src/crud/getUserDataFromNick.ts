import axios from "axios";
import API_URL from "./configuration";

export const getUserDataFromNick = (username: string) => {
  const user = JSON.parse(localStorage.getItem("PoznajmySie") || "{}");
  console.log("konsole log", `${API_URL}/User/${username}`);
  return axios({
    method: "GET",
    url: `${API_URL}/User/userName?userName=${username}`,
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  });
};
