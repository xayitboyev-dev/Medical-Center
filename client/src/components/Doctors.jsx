import { getAll } from "../services/doctors";
import { useEffect, useState } from "react";
import { API } from "../config/config.json";
import { Link } from "react-router-dom";

function Doctors() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await getAll();
                const doctorsList = data.doctors.slice(0, 3);
                setDoctors(doctorsList);
            } catch (error) {
                console.log("ERROR OCCURED ON GET DOCTORS:", error);
            };
        };
        fetchData();
    }, []);

    return (
        <section className="doctor_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>Bizning shifokorlar</h2>
                    <p className="col-md-10  px-0">Shifokorlar kasallikka chalingan yoki jarohatlangan odam sogʻligʻini tiklash bilan shugʻullanuvchi kasb egalari</p>
                </div>
                <div className="row justify-content-center">
                    {
                        doctors.length ? doctors.map((item) => <div key={item._id} className="col-sm-6 col-lg-4 mx-auto">
                            <div className="box">
                                <div className="img-box">
                                    <img src={API + "uploads/" + item.image} alt="" />
                                </div>
                                <div className="detail-box">
                                    <div className="social_box">
                                        <a href="">
                                            <i className="fa fa-facebook" aria-hidden="true"></i>
                                        </a>
                                        <a href="">
                                            <i className="fa fa-twitter" aria-hidden="true"></i>
                                        </a>
                                        <a href="">
                                            <i className="fa fa-youtube" aria-hidden="true"></i>
                                        </a>
                                        <a href="">
                                            <i className="fa fa-linkedin" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                    <h5>{item.name} {item.surname}</h5>
                                    <h6 className="">{item.hospital?.name} - {item.service?.name}</h6>
                                </div>
                            </div>
                        </div>) : <h1>Loading...</h1>
                    }
                </div>
                <div className="btn-box">
                    <Link to="/doctors">Ko'proq</Link>
                </div>
            </div>
        </section>
    )
}

export default Doctors