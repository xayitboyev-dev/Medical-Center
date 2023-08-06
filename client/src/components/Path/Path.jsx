import { useNavigate } from "react-router-dom";
import "./Path.css";

function Path(props) {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    };

    return (
        <div className="current_path">
            <div className="back" onClick={goBack} style={{ cursor: "pointer" }}>
                <img className="back_img" width={"14px"} height={"14px"} src="/images/back.png" alt="not found!" />
            </div>
            <p style={{ paddingTop: "2px", margin: "0", marginLeft: "10px" }}>{props.items?.join(" / ")}</p>
        </div>
    )
}

export default Path;