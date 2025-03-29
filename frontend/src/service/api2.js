import axios from "axios";

export const Host = "http://localhost:3000";
export const USER_ROUTE = "/api/v1/users";

export const SIGNUP_ROUTE = `${USER_ROUTE}/signup`;
export const LOGIN_ROUTE = `${USER_ROUTE}/login`;
export const LOGOUT_ROUTE = `${USER_ROUTE}/logout`;
export const GET_USER_ROUTE = `${USER_ROUTE}/current-user`;
export const PASSWORD_CHANGE = `${USER_ROUTE}/change/password`;



export const apiCLient = axios.create({
    baseURL: Host,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  