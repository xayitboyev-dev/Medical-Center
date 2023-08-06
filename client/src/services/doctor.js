import axios from "axios";
import { API } from "../config/config.json";

const getCustomers = () => axios.get(API + "doctor/customers", { headers: { Authorization: localStorage.getItem("token") } });

const getQueues = (id) => axios.get(API + "doctor/customers/" + id, { headers: { Authorization: localStorage.getItem("token") } });

const startQueue = (id) => axios.post(API + `doctor/customers/${id}/start`, null, { headers: { Authorization: localStorage.getItem("token") } });

const completeQueue = (id, diagnosis) => axios.post(API + `doctor/customers/${id}/complete`, { diagnosis }, { headers: { Authorization: localStorage.getItem("token") } });

const cancelQueue = (id) => axios.delete(API + `doctor/customers/${id}/cancel`, { headers: { Authorization: localStorage.getItem("token") } });

export { getCustomers, getQueues, startQueue, completeQueue, cancelQueue };