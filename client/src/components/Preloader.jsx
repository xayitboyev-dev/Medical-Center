import CircleProgress from "../containers/Loading/CircleProgress/CircleProgress";

export default function Preloader() {
    return (
        <>
            <div className="preloader" style={{ height: "100vh" }}>
                <CircleProgress height={"100%"} />
            </div>
        </>
    )
}