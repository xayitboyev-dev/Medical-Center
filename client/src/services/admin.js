import axios from "axios";
import { API } from "../config/config.json";

const getHospitals = () => axios.get(API + "admin/hospital", { headers: { Authorization: localStorage.getItem("token") } });

const getServices = () => axios.get(API + "admin/service", { headers: { Authorization: localStorage.getItem("token") } });

const getDoctors = () => axios.get(API + "admin/doctor", { headers: { Authorization: localStorage.getItem("token") } });

const addHospital = (data) => axios.post(API + "admin/hospital/add", data, { headers: { "Content-Type": "multipart/form-data", Authorization: localStorage.getItem("token") } });

const addService = (data) => axios.post(API + "admin/service/add", data, { headers: { Authorization: localStorage.getItem("token") } });

const addDoctor = (data) => axios.post(API + "admin/doctor/add", data, { headers: { "Content-Type": "multipart/form-data", Authorization: localStorage.getItem("token") } });

const deleteHospital = (id) => axios.delete(API + "admin/hospital/delete/" + id, { headers: { Authorization: localStorage.getItem("token") } });

const deleteService = (id) => axios.delete(API + "admin/service/delete/" + id, { headers: { Authorization: localStorage.getItem("token") } });

const deleteDoctor = (id) => axios.delete(API + "admin/doctor/delete/" + id, { headers: { Authorization: localStorage.getItem("token") } });

export { getHospitals, getServices, getDoctors, deleteHospital, deleteService, deleteDoctor, addHospital, addDoctor, addService };