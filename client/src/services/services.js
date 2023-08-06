import axios from "axios";
import { API } from "../config/config.json";

const getAll = () => axios.get(API + "services");

const getFilter = (hospitalId) => axios.get(API + "services/filter", { params: { hospital: hospitalId } });

export { getAll, getFilter };