import { useEffect, useState } from "react";
import { getHospitals, addHospital, deleteHospital } from "../../../services/admin";
import { API } from "../../../config/config.json";
import { toast } from "react-toastify";
import Preloader from "../../../components/Preloader";
import "./Hospitals.css";

function Hospitals() {
  const [hospitals, setHospitals] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data } = await getHospitals();
      setHospitals(data.hospitals);
    } catch (error) {
      toast.error(error.response?.data?.message || error.response);
    };
  };

  async function hospitalAdd(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const { data } = await addHospital(formData);
      toast.success(data?.message || "Qo'shildi!");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || error.response);
    };
  };

  async function hospitalDelete(id) {
    try {
      const { data } = await deleteHospital(id);
      toast.success(data?.message || "O'chirildi!");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || error.response);
    };
  };

  return (
    <div className='admin_hospitals admin_page_item'>
      <form onSubmit={hospitalAdd}>
        <h4>Shifoxona qo'shish</h4>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" id="exampleFormControlInput1" placeholder="Shifoxona nomi" required />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput2" className="form-label">Manzil</label>
          <input type="text" className="form-control" name="address" id="exampleFormControlInput2" placeholder="Manzil" required />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput3" className="form-label">Contact</label>
          <input type="text" className="form-control" name="contact" id="exampleFormControlInput3" placeholder="telegram, telefon, website" required />
        </div>
        <div class="mb-3">
          <label for="formFile" class="form-label">Logo</label>
          <input class="form-control" type="file" name="logo" id="formFile" required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div className="admin_hospitals_items">
        <div className="admin_page_title">
          <h2>Shifoxonalar</h2>
        </div>
        <div className="row">
          {hospitals?.length > 0 ? hospitals.map(item => <div className="col-md-3">
            <div className="admin_hospitals_item">
              <div className="admin_hospitals_item_logo">
                <img src={API + "uploads/" + item.logo} alt="not found!" />
              </div>
              <div className="admin_hospitals_item_info">
                <h4>{item.name}</h4>
                <button className="btn btn-danger" onClick={() => hospitalDelete(item._id)}>Delete</button>
              </div>
            </div>
          </div>) : hospitals ? <h4>Hech qanday shifoxona yo'q</h4> : <Preloader />}
        </div>
      </div>
    </div>
  )
}

export default Hospitals