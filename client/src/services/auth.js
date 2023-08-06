import axios from "axios";
import { API } from "../config/config.json";

const login = (data) => axios.post(API + "auth/login", data);

const register = (data) => axios.post(API + "auth/register", data);

const getHome = () => axios.get(API, { headers: { Authorization: localStorage.getItem("token") } });

const getProfile = () => axios.get(API + "profile", { headers: { Authorization: localStorage.getItem("token") } });

export { login, register, getProfile, getHome };