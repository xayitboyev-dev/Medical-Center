import axios from "axios";
import { API } from "../config/config.json";

const getAll = () => axios.get(API + "hospitals");

export { getAll };