import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { cancelQueue, getCustomers, getQueues, startQueue, completeQueue } from "../../../services/doctor";
import { useEffect, useState, useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import CircleProgress from "../../../containers/Loading/CircleProgress/CircleProgress";
import "./Dashboard.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [customers, setCustomers] = useState();
  const [history, setHistory] = useState();
  const [current, setCurrent] = useState();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    if (user?.role != "doctor") navigate("/");
  }, []);


  async function fetchData() {
    setCurrent();
    setHistory();
    setCurrent();

    try {
      let { data } = await getCustomers();
      data = (data?.customers || []).filter((item) => ["waiting", "looking"].includes(item.status));
      setCustomers(data);
      setCurrent(data[0] || "empty");
      const { data: data2 } = await getQueues(data[0]?.customer?._id);
      setHistory(data2.queues);
    } catch (error) {
      console.log(error.message);
    };
  };

  async function cancelOne(id) {
    try {
      if (confirm("Navbatni rostanham o'chirmoqchimisiz?")) {
        await cancelQueue(id);
        toast.success("Muvvaffaqqiyatli bekor qilindi!");
        fetchData();
      };
    } catch (error) {
      toast.error(error.response?.data?.message || error.response);
    };
  };

  async function startOne(id) {
    try {
      await startQueue(id);
      toast.success("Navbat muvvaffaqqiyatli boshlandi!");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || error.response);
    };
  };

  async function completeOne(id, e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const { data } = await completeQueue(id, formData.get("diagnosis"));
      toast.success(`${data?.queue?.durationTime} da tugatildi!`);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || error.response);
    };
  };

  const statuses = {
    waiting: "Kutilmoqda",
    looking: "Davolanmoqda",
    completed: "Bajarilgan",
  };

  return (
    <>
      <Header onlyNav={true} />
      <section className="doctor_dashboard">
        <div className="doctor_current" style={customers?.length == 0 ? { display: "none" } : null}>
          <div className="container">
            {
              current ?
                (
                  <div className="doctor_current_queues">
                    <h2 className="title" style={{ fontWeight: "bold" }}>Hozirgi navbat</h2>
                    <div className="doctor_details">
                      <p><strong>Ism:</strong> {current?.customer?.name} {current?.customer?.surname}</p>
                      <p><strong>Telefon:</strong> {current?.customer?.phone}</p>
                      <p><strong>Chek olingan vaqt:</strong> {new Date(current?.date).toLocaleString()}</p>
                      {current.startTime ? <p><strong>Boshlangan vaqt:</strong> {new Date(current?.startTime).toLocaleString()}</p> : null}
                      <p><strong>Murojat:</strong> {current?.applicationText}</p>
                    </div>

                    <div className="accordion" id="accordionExample">
                      {
                        history?.length > 0 ?
                          history.map((item, index) => {
                            return (
                              <>
                                <div key={item._id} className="accordion-item">
                                  <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + index} aria-expanded="false" aria-controls={"#collapse" + index}>
                                      Ko'rik #{index + 1}
                                    </button>
                                  </h2>
                                  <div id={"collapse" + index} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                      <p><strong>Davolashga ketgan vaqt:</strong> {item.durationTime}</p>
                                      <p><strong>Sana:</strong> {new Date(item.date).toLocaleDateString()}</p>
                                      <p><strong>Murojat:</strong> {item.applicationText}</p>
                                      <p><strong>Tashxis:</strong> {item.diagnosis}</p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )
                          }) : history ?
                            <div className="empty">
                              <h3>Oldin ko'rikka kelmagan!</h3>
                            </div> : null
                      }
                    </div>

                    <div className={"doctor_actions " + current?.status}>
                      <button type="button" className="btn btn-primary start" onClick={() => startOne(current?._id)}>Boshlash</button>
                      <button type="button" className="btn btn-danger cancel" onClick={() => cancelOne(current?._id)}>Bekor qilish</button>
                      <form className="success" onSubmit={(e) => completeOne(current?._id, e)}>
                        <textarea name="diagnosis" placeholder="* Tashxis" cols="40" rows="5" minLength="10" maxLength="200" required></textarea>
                        <button type="submit" className="btn btn-success durationTimee">Tugatish</button>
                      </form>
                    </div>
                  </div>
                ) : <CircleProgress height="200px" />
            }
          </div>
        </div>
        <div className="doctor_queues">
          <div className="container">
            <div className="row">
              {
                customers?.length > 0 ? customers.map((item) =>
                  <div className="col-12" key={item._id}>
                    <div className={"doctor_customers_item " + item.status}>
                      <div className="doctor_item_left">
                        <p>Mijoz: <span>{item.customer?.name} {item.customer?.surname}</span></p>
                        <p>Chek olgan vaqti: <span>{new Date(item.date).toLocaleString()}</span></p>
                        <p>Holati: <span>{statuses[item.status]}</span></p>
                      </div>
                      <div className="doctor_item_right">
                        <button type="button" className="btn btn-danger" onClick={() => cancelOne(item._id)}>O'chirish</button>
                      </div>
                    </div>
                  </div>
                ) : customers ?
                  <div className="col-12">
                    <img style={{ display: "block", transform: "translateY(80px)", margin: "auto", width: "200px" }} src="/images/empty-box.png" alt="" />
                    <h3 style={{ margin: "100px 0", fontSize: "20px", opacity: "0.5", textAlign: "center" }}>Hech qanday mijozlaringiz yo'q!</h3>
                  </div> : null
              }
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Dashboard