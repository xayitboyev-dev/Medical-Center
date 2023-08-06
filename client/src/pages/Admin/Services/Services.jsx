import { useEffect, useState } from "react";
import { getServices, getHospitals, addService, deleteService } from "../../../services/admin";
import { API } from "../../../config/config.json";
import { toast } from "react-toastify";
import Preloader from "../../../components/Preloader";
import "./Services.css";

function Services() {
  const [services, setServices] = useState();
  const [hospitals, setHospitals] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data } = await getServices();
      setServices(data.services);
      const { data: data2 } = await getHospitals();
      setHospitals(data2.hospitals);
    } catch (error) {
      toast.error(error.response?.data?.message || error.response);
    };
  };

  async function serviceAdd(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const object = {};
    formData.forEach((value, key) => object[key] = value);

    try {
      const { data } = await addService(object);
      toast.success(data?.message || "Qo'shildi!");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || error.response);
    };
  };

  async function serviceDelete(id) {
    try {
      const { data } = await deleteService(id);
      toast.success(data?.message || "O'chirildi!");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || error.response);
    };
  };

  return (
    <div className='admin_services admin_page_item'>
      <form onSubmit={serviceAdd}>
        <h4>Xizmat qo'shish</h4>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" id="exampleFormControlInput1" placeholder="Xizmat nomi" required />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput2" className="form-label">Narxi</label>
          <input type="text" className="form-control" name="price" id="exampleFormControlInput2" placeholder="Narxi" required />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput3" className="form-label" required>Shifoxona</label>
          <select class="form-select" name="hospital" id="exampleFormControlInput3" aria-label="Default select example" required>
            {hospitals?.length ? hospitals.map((item) => {
              return (
                <option value={item._id}>{item.name}</option>
              );
            }) : null}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div className="admin_services_items">
        <div className="admin_page_title">
          <h2>Shifoxonalar</h2>
        </div>
        <div className="row">
          {services?.length > 0 ? services.map(item => <div className="col-md-3">
            <div className="admin_services_item">
              <div className="admin_services_item_info">
                <h4>{item.name}</h4>
                <h5>{item.price}</h5>
                <h5>{item?.hospital?.name}</h5>
                <button className="btn btn-danger" onClick={() => serviceDelete(item._id)}>Delete</button>
              </div>
            </div>
          </div>) : services ? <h4>Hech qanday shifoxona yo'q</h4> : <Preloader />}
        </div>
      </div>
    </div>
  )
}

export default Services