import { useEffect, useState } from "react";
import { getDoctors, addDoctor, deleteDoctor, getHospitals, getServices } from "../../../services/admin";
import { API } from "../../../config/config.json";
import { toast } from "react-toastify";
import Preloader from "../../../components/Preloader";
import "./Doctors.css";

function Doctors() {
  const [doctors, setDoctors] = useState();
  const [hospitals, setHospitals] = useState();
  const [services, setServices] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(e) {
    setServices();

    try {
      const { data } = await getDoctors();
      setDoctors(data.doctors);
      const { data: data2 } = await getHospitals();
      setHospitals(data2.hospitals);
      const { data: data3 } = await getServices();
      if (e?.target?.value) {
        const services = data3.services.filter((item) => item?.hospital?._id == e?.target?.value);
        setServices(services);
      };
    } catch (error) {
      toast.error(error.response?.data?.message || error.response);
    };
  };

  async function doctorAdd(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.forEach((value, key) => {
      if (key.includes("workDays") && value == "on") {
        formData.set(key, true);
      };
    });

    try {
      const { data } = await addDoctor(formData);
      toast.success(data?.message || "Qo'shildi!");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || error.response);
    };
  };

  async function doctorDelete(id) {
    try {
      const { data } = await deleteDoctor(id);
      toast.success(data?.message || "O'chirildi!");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || error.response);
    };
  };

  // async function hospitalSelected(e) {

  // };

  return (
    <div className='admin_doctors admin_page_item'>
      <form onSubmit={doctorAdd}>
        <h4>Shifokor qo'shish</h4>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">Ismi</label>
              <input type="text" className="form-control" name="name" minLength={"2"} maxLength={"150"} id="exampleFormControlInput1" placeholder="Ismi" required />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label for="exampleFormControlInput2" className="form-label">Familiyasi</label>
              <input type="text" className="form-control" name="surname" minLength={"2"} maxLength={"150"} id="exampleFormControlInput2" placeholder="Familiyasi" required />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label for="exampleFormControlInput3" className="form-label">Username</label>
              <input type="text" className="form-control" name="username" minLength={"5"} maxLength={"50"} id="exampleFormControlInput3" placeholder="Username" required />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label for="exampleFormControlInput4" className="form-label">Telefon (example: 931234567)</label>
              <input type="number" className="form-control" minLength={"9"} maxLength={"9"} name="phone" id="exampleFormControlInput4" placeholder="Telefon" required />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label for="exampleFormControlInput5" className="form-label">Parol</label>
              <input type="password" className="form-control" name="password" id="exampleFormControlInput5" minLength={"6"} placeholder="Parol" required />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label for="exampleFormControlInput6" className="form-label">Tajribasi (example: 7 yil)</label>
              <input type="text" className="form-control" name="experience" id="exampleFormControlInput6" placeholder="Tajribasi" required />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label for="floorNumber" className="form-label">Etaj</label>
              <input type="number" className="form-control" name="floorNumber" id="floorNumber" placeholder="Etaj" required />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label for="roomNumber" className="form-label">Xona raqami</label>
              <input type="number" className="form-control" name="roomNumber" id="roomNumber" placeholder="Xona raqami" required />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label for="workTimeFrom" className="form-label">Ish boshlanish vaqti (example: 07:00)</label>
              <input type="text" className="form-control" name="workTime.from" id="workTimeFrom" placeholder="Ish boshlanish vaqti" required />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label for="workTimeTo" className="form-label">Ish tugash vaqti (example: 20:00)</label>
              <input type="text" className="form-control" name="workTime.to" id="workTimeTo" placeholder="Ish tugash vaqti" required />
            </div>
          </div>
          <div className="col">
            <div class="mb-3">
              <label for="formFile" class="form-label">Rasm</label>
              <input class="form-control" type="file" name="image" id="formFile" required />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label for="formHospital" className="form-label" required>Shifoxona</label>
              <select class="form-select" onInput={fetchData} name="hospital" id="formHospital" required>
                <option selected>Tanlash</option>
                {hospitals?.length ? hospitals.map((item) => {
                  return (
                    <option value={item._id}>{item.name}</option>
                  );
                }) : null}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label for="formService" className="form-label" required>Xizmat</label>
              <select class="form-select" name="service" id="formService" required>
                {services?.length ? services.map((item) => {
                  return (
                    <option value={item._id}>{item.name}</option>
                  );
                }) : null}
              </select>
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label for="dailyQueue" className="form-label">Kuniga nechta mijozga xizmat qiladi?</label>
              <input type="number" className="form-control" name="dailyQueue" id="dailyQueue" placeholder="Kunlik mijozlar" required />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Ish kunlari</label>
          <div>
            <label for="workdaysmo" className="form-label" >Dushanba</label>
            <input type="checkbox" id="workdaysmo" name="workDays.mo" />
          </div>
          <div>
            <label for="workdaystu" className="form-label">Seshanba</label>
            <input type="checkbox" id="workdaystu" name="workDays.tu" />
          </div>
          <div>
            <label for="workdaysswe" className="form-label">Chorshanba</label>
            <input type="checkbox" id="workdaysswe" name="workDays.we" />
          </div>
          <div>
            <label for="workdaysth" className="form-label">Payshanba</label>
            <input type="checkbox" id="workdaysth" name="workDays.th" />
          </div>
          <div>
            <label for="workdaysfr" className="form-label">Juma</label>
            <input type="checkbox" id="workdaysfr" name="workDays.fr" />
          </div>
          <div>
            <label for="workDayssa" className="form-label">Shanba</label>
            <input type="checkbox" id="workDayssa" name="workDays.sa" />
          </div>
          <div>
            <label for="workDayssu" className="form-label">Yakshanba</label>
            <input type="checkbox" id="workDayssu" name="workDays.su" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div className="admin_doctors_items">
        <div className="admin_page_title">
          <h2>Shifoxonalar</h2>
        </div>
        <div className="row">
          {doctors?.length > 0 ? doctors.map(item => <div className="col-md-3">
            <div className="admin_doctors_item">
              <div className="admin_doctors_item_logo">
                <img src={API + "uploads/" + item.image} alt="not found!" />
              </div>
              <div className="admin_doctors_item_info">
                <h5>{item?.name} {item?.surname}</h5>
                <h5>{item?.phone}</h5>
                <h5>{item?.username}</h5>
                <h5>{item?.experience ? item?.experience + " tajriba" : null}</h5>
                <h5>{item?.workTime?.from} - {item?.workTime?.to}</h5>
                <h5>{item?.hospital?.name}</h5>
                <h5>{item?.service?.name}</h5>
                <button className="btn btn-danger" onClick={() => doctorDelete(item._id)}>Delete</button>
              </div>
            </div>
          </div>) : doctors ? <h4>Hech qanday shifoxona yo'q</h4> : <Preloader />}
        </div>
      </div>
    </div>
  )
}

export default Doctors