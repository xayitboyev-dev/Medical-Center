import { Link, useNavigate } from "react-router-dom";
import { getAll } from "../services/hospitals";
import { useEffect, useState } from "react";
import CircleProgress from "../containers/Loading/CircleProgress/CircleProgress";
import { API } from "../config/config.json";

function Hospitals(props) {
    const [hospitals, setHospitals] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await getAll();
                let hospitalsList = data.hospitals;
                if (!props.getAll) hospitalsList = hospitalsList.slice(0, 4);
                    setHospitals(hospitalsList);
            } catch (error) {
                console.log("ERROR OCCURED ON GET SERVICES:", error);
            };
        };
        fetchData();
    }, []);

    return (
        <section className="department_section layout_padding">
            <div className="department_container">
                <div className="container ">
                    <div className="heading_container heading_center left">
                        <h2>Shifoxonalar ro'yxati</h2>
                        <p>Saytimiz orqali shifoxonalardagi xizmatlar haqida malumot oling!</p>
                    </div>
                    <div className={"row" + (props.getAll ? "" : " justify-content-center")}>
                        {
                            hospitals?.length > 0 ? hospitals?.map((item) => (<div key={item._id} className="col-md-3">
                                <div className="box" style={{ cursor: "pointer" }} onClick={() => {
                                    sessionStorage.setItem("hospital", JSON.stringify(item));
                                    navigate("/services")
                                }}>
                                    <div className="img-box">
                                        <img src={API + "uploads/" + item.logo} alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <h2>{item.name}</h2>
                                        <p>{item.address}</p>
                                    </div>
                                </div>
                            </div>)) : hospitals ? <div className='empty' style={{ width: "100%", height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}><h3 style={{ opacity: "0.5", fontSize: "18px" }}>Hech qanday xizmatlar topilmadi!</h3></div> : <CircleProgress height="300px" />
                        }
                    </div>
                    {!props.getAll ? <div className="btn-box">
                        <Link to="/hospitals">View All</Link>
                    </div> : null}
                </div>
            </div>
        </section >
    )
}

export default Hospitals