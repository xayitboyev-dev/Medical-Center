import { Link, useNavigate } from "react-router-dom";
import { getFilter } from "../services/services";
import { useEffect, useState } from "react";
import CircleProgress from "../containers/Loading/CircleProgress/CircleProgress";
import Path from "./Path/Path";

function Services(props) {
    const [services, setServices] = useState();
    const navigate = useNavigate();

    function getHospital() {
        return JSON.parse(sessionStorage.getItem("hospital") || "{}");
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await getFilter(getHospital()._id);
                let servicesList = data.services;
                if (!props.getAll) servicesList = servicesList.slice(0, 4);
                    setServices(servicesList);
            } catch (error) {
                console.log("ERROR OCCURED ON GET SERVICES:", error);
            };
        };
        fetchData();
    }, []);

    return (
        <section className="department_section layout_padding custom">
            <div className="department_container">
                <div className="container ">
                    <div className={"row" + (props.getAll ? "" : " justify-content-center")}>
                        <div className="col-12">
                            <div className="heading_container heading_center left">
                                {getHospital() ? <Path items={[getHospital().name]} /> : <Path items={["Xizmatlar"]} />}
                                <h2>{getHospital()?.name ? `${getHospital().name} xizmatlari` : "Xizmatlar"}</h2>
                                <p>Saytimiz orqali shifoxonalardagi xizmatlar haqida malumot oling!</p>
                            </div>
                        </div>
                        {
                            services?.length > 0 ? services?.map((item, index) => (<div key={item._id} className="col-md-3">
                                <div className={"box service"} style={{ cursor: "pointer" }} onClick={() => {
                                    sessionStorage.setItem("service", JSON.stringify(item));
                                    navigate("/doctors?service=" + item._id)
                                }}>
                                    <div className="img-box">
                                        <img src={props.getAll ? "images/s4.png" : `images/s${index + 1}.png`} alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <h2>{item.name}</h2>
                                        <p>{item.price} UZS</p>
                                    </div>
                                </div>
                            </div>)) : services ? <div className='empty' style={{ width: "100%", height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}><h3 style={{ opacity: "0.5", fontSize: "18px" }}>Hech qanday xizmatlar topilmadi!</h3></div> : <CircleProgress height="300px" />
                        }
                    </div>
                    {!props.getAll ? <div className="btn-box">
                        <Link to="/services">View All</Link>
                    </div> : null}
                </div>
            </div>
        </section >
    )
}

export default Services