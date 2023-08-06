import { API } from "../../../config/config.json";
import { useNavigate } from "react-router-dom";
import "./Item.css";

function Item(props) {
    const weekDays = { mo: "DU", tu: "SE", we: "CHO", th: "PA", fr: "JU", sa: "SHA", su: "YA" }
    const navigate = useNavigate();

    return (
        <div className="col-md-4">
            <div className="doctor_item" style={{ cursor: "pointer" }} onClick={() => {
                sessionStorage.setItem("doctor", JSON.stringify(props.data));
                navigate("/doctors/" + props.data?._id)
            }}>
                <div className="doctor_item_img">
                    <img src={API + "uploads/" + props.data?.image} alt="Image not found!" />
                </div>
                <div className="doctor_item_info">
                    <div className="doctor_item_info_item">
                        <b>Ismi: </b>
                        <span>{props.data?.name}</span>
                    </div>
                    <div className="doctor_item_info_item">
                        <b>Familiyasi: </b>
                        <span>{props.data?.surname}</span>
                    </div>
                    <div className="doctor_item_info_item">
                        <b>Xizmati: </b>
                        <span>{props.data?.service?.name}</span>
                    </div>
                    <div className="doctor_item_info_item">
                        <b>Shifoxonasi: </b>
                        <span>{props.data?.hospital?.name}</span>
                    </div>
                    <div className="doctor_item_info_item">
                        <b>Telefon: </b>
                        <span>{props.data?.phone}</span>
                    </div>
                    <div className="doctor_item_info_item">
                        <b>Ish vaqti: </b>
                        <span>{props.data?.workTime?.from} - {props.data?.workTime?.to}</span>
                    </div>
                    <div className="doctor_item_info_item">
                        <b>Ish kunlari: </b>
                        <ul className="doctor_item_info_item_workDay">
                            {
                                Object.keys(props.data?.workDays || {}).map((item) => {
                                    return (<li><span className={"doctor_item_info_item_workDay_item" + (props.data?.workDays[item] ? " work" : "")}>{weekDays[item]}</span></li>)
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Item