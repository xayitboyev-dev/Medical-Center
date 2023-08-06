import axios from "axios";
import { API } from "../config/config.json";

const getAll = () => axios.get(API + "doctors");

const getFilter = (params) => axios.get(API + "doctors/filter", { params });

const getOne = (id) => axios.get(API + "doctors/" + id);

export { getAll, getFilter, getOne };