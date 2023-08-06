import { ThreeDots } from "react-loader-spinner"
import "./CircleProgress.css";

function CircleProgress(props) {
    return (
        <div className="loading_circle_progress" style={props}>
            <ThreeDots
                height="100"
                width="100"
                radius="9"
                color="#62d2a2"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    )
}

export default CircleProgress