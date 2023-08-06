import { useEffect, useState } from "react";
import { getByDoctor } from "../../services/queue";
import "./Queue.css";
import CircleProgress from "../../containers/Loading/CircleProgress/CircleProgress";
import { cancelOne } from "../../services/queue";
import { toast } from "react-toastify";

function Queue(props) {
    const [queue, setQueue] = useState();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            let { data } = await getByDoctor(props.id);
            setQueue(data.queue);
        } catch (error) {
            setQueue("empty");
        };
    };

    const statuses = {
        waiting: "Kutilmoqda",
        looking: "Davolanmoqda",
        completed: "Bajarilgan",
    };

    async function cancelQueue() {
        try {
            await cancelOne(queue._id);
            toast.success("Muvvaffaqqiyatli bekor qilindi!");
            setQueue("empty");
        } catch (error) {
            toast.error(error.response?.data?.message || error.response);
        };
    };

    return (
        <section className="queue_page">
            <div className="container">
                <div className="queue">
                    {
                        queue == "empty" ? <div className="empty"><h3>Bugun navbat omagansiz!</h3></div> : queue?.date ? (
                            <div className={"queue_info " + queue.status}>
                                <h3>Navbat olingan - {new Date(queue.date).toLocaleDateString()}</h3>
                                <p>Etaj: {queue.doctor?.floorNumber}</p>
                                <p>Xona: {queue.doctor?.roomNumber}</p>
                                <p>Holat: <span className={"queue_info_status " + queue.status}>{statuses[queue.status]}</span></p>
                                {queue?.durationTime ? <p>Davolashga ketgan vaqt: {queue.durationTime}</p> : null}
                                <p>Navbatchilari soni: {queue.customersCount}</p>
                                <p>Navbatingiz raqami: {queue.number}</p>
                                <p>Chek olingan vaqt: {new Date(queue?.date).toLocaleString()}</p>
                                {queue.status === "waiting" ? <button type="button" className="btn btn-danger" style={{ marginTop: "10px" }} onClick={cancelQueue}>Bekor qilish</button> : null}
                            </div>
                        ) : <CircleProgress height={"100"} />
                    }
                </div>
            </div>
        </section >
    )
}

export default Queue;