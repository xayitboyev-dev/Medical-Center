import { useState, useEffect, useContext } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getOne } from "../../../services/doctors";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../../config/config.json";
import UserContext from "../../../contexts/UserContext";
import { queueAdd } from "../../../services/queue";
import Queue from "../../../components/Queue/Queue";
import CircleProgress from "../../../containers/Loading/CircleProgress/CircleProgress";
import Path from "../../../components/Path/Path";
import { toast } from "react-toastify";
import "./GetOne.css";

function GetOne() {
    const [doctor, setDoctor] = useState();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const params = useParams();
    const weekDays = { mo: "DU", tu: "SE", we: "CHO", th: "PA", fr: "JU", sa: "SHA", su: "YA" };

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const { data } = await getOne(params.id);
        setDoctor(data);
    };

    async function queuePost(e) {
        e.preventDefault();
        if (user?.role == "user") {
            const form = new FormData(e.target);
            try {
                await queueAdd(doctor?.doctor?._id, form.get("description"));
                toast.success("Muvaffaqqiyatli navbat olindi!");
                setTimeout(() => {
                    location.reload();
                }, 1000);
            } catch (error) {
                let msg = error.response?.data?.message || error.message;
                let message = "Allaqachon navbat olingan!";
                if (msg.includes("full")) message = "Shifokorning kunlik navbatlar soni to'lgan!";
                if (msg.includes("not work")) message = "Bugun shifokor ishlamaydi!";
                toast.error(message);
            };
        } else navigate("/auth/login");
    };

    function getPath() {
        return { hospital: JSON.parse(sessionStorage.getItem("hospital") || "{}"), service: JSON.parse(sessionStorage.getItem("service") || "{}"), doctor: JSON.parse(sessionStorage.getItem("doctor") || "{}") };
    };

    return (
        <>
            <Header onlyNav={true} />
            <section className='doctors_getone'>
                <div className="container">
                    {getPath().service?.name ? <Path items={[getPath().hospital?.name, getPath().service?.name, getPath().doctor?.name]} /> : <Path items={["Shifokorlar"]} />}
                    <div className="doctor_info">
                        {
                            doctor?.doctor ?
                                <>
                                    <div className="doctor_info_img">
                                        <img src={API + "uploads/" + doctor?.doctor?.image} alt="" />
                                    </div>
                                    <div className="doctor_info_details">
                                        <p>
                                            <h2>{doctor?.doctor?.name} {doctor?.doctor?.surname}</h2>
                                        </p>
                                        <p>
                                            <strong>Telefon: </strong>
                                            <span>{doctor?.doctor?.phone}</span>
                                        </p>
                                        <p>
                                            <strong>Manzil: </strong>
                                            <span>{doctor?.doctor?.hospital?.address}</span>
                                        </p>
                                        <p>
                                            <strong>Ish vaqti: </strong>
                                            <span>{doctor?.doctor?.workTime?.from} - {doctor?.doctor?.workTime?.to}</span>
                                        </p>
                                        <p>
                                            <strong>Tajribasi: </strong>
                                            <span>{doctor?.doctor?.experience}</span>
                                        </p>
                                        {doctor?.currentQueue > 0 ? <p>
                                            <strong>Xozirgi bemor: </strong>
                                            <span>{doctor?.currentQueue}</span>
                                        </p> : null}
                                        {doctor?.prevDuration?.queueNumber ? <p>
                                            <strong>{doctor?.prevDuration?.queueNumber} - bemor: </strong>
                                            <span>{doctor?.prevDuration?.time}</span>
                                        </p> : null}
                                        <p>
                                            <strong>Etaj raqami: </strong>
                                            <span>{doctor?.doctor?.floorNumber}</span>
                                        </p>
                                        <p>
                                            <strong>Xona raqami: </strong>
                                            <span>{doctor?.doctor?.roomNumber}</span>
                                        </p>
                                        <p>
                                            <strong>Xizmati: </strong>
                                            <span>{doctor?.doctor?.service?.name}</span>
                                        </p>
                                        <p>
                                            <strong>Shifoxonasi: </strong>
                                            <span>{doctor?.doctor?.hospital?.name}</span>
                                        </p>
                                        <p style={{ display: "flex", gap: "10px" }}>
                                            <strong>Ish kunlari:</strong>
                                            <div className="doctor_item_info_item_workDay">
                                                {
                                                    Object.keys(doctor?.doctor?.workDays || {}).map((item, index) => {
                                                        return (
                                                            <span key={index} className={"doctor_item_info_item_workDay_item" + (doctor?.doctor?.workDays[item] ? " work" : "")}>{weekDays[item]}</span>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </p>
                                    </div>
                                </>
                                : <CircleProgress height={"400px"} />
                        }
                    </div>
                </div>
            </section>
            <div className={"doctors_getone_queue " + (user?._id ? "" : "custom")}>
                <div className="container">
                    <div className="doctors_getone_queue_form">
                        <h2>Navbat olish</h2>
                        <form onSubmit={queuePost}>
                            <textarea name="description" cols="10" rows="5" placeholder="* Sog'lig'ingizdagi muammo haqida yozing!" required minLength={10} maxLength={200}></textarea>
                            <button type="submit" className="submit_button">Navbat olish</button>
                        </form>
                    </div>
                </div>
            </div>
            {user ? (doctor?.doctor?._id ? <Queue doctor={doctor} id={params.id} /> : <CircleProgress height="200px" />) : null}
            <Footer />
        </>
    )
}

export default GetOne;