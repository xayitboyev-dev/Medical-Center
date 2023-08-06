import axios from "axios";
import { API } from "../config/config.json";

const queueAdd = (id, description) => axios.post(API + `queue/${id}/add`, { applicationText: description }, { headers: { Authorization: localStorage.getItem("token") } });

const getAllQueues = () => axios.get(API + `queue`, { headers: { Authorization: localStorage.getItem("token") } });

const getByDoctor = (id) => axios.get(API + ("queue/" + id), { headers: { Authorization: localStorage.getItem("token") } });

const cancelOne = (id) => axios.delete(API + ("queue/cancel/" + id), { headers: { Authorization: localStorage.getItem("token") } });

export { queueAdd, getAllQueues, getByDoctor, cancelOne };