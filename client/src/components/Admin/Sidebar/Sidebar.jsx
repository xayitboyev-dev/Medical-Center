import { NavLink } from "react-router-dom"
import UserContext from "../../../contexts/UserContext";
import { useContext, useEffect } from "react";
import "./Sidebar.css";

function Sidebar() {
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user?.role != "admin") {
            location.href = "/";
        };
    }, []);

    return (
        <div className="admin_sidebar">
            <div className="sidebar_header">
                <div className="sidebar_header_avatar">
                    <img src="https://static.vecteezy.com/system/resources/previews/009/636/683/original/admin-3d-illustration-icon-png.png" alt="not found!" />
                </div>
                <div className="sidebar_header_info">
                    <h2>{user?.name} {user?.surname}</h2>
                    <h2>{user?.username}</h2>
                </div>
            </div>
            <div className="sidebar_items">
                <div className="sidebar_item">
                    <NavLink className="sidebar_item_link" to="/admin/dashboard">Dashboard</NavLink>
                </div>
                <div className="sidebar_item">
                    <NavLink className="sidebar_item_link" to="/admin/hospitals">Shifoxonalar</NavLink>
                </div>
                <div className="sidebar_item">
                    <NavLink className="sidebar_item_link" to="/admin/services">Xizmatlar</NavLink>
                </div>
                <div className="sidebar_item">
                    <NavLink className="sidebar_item_link" to="/admin/doctors">Doktorlar</NavLink>
                </div>
            </div>
            <div className="sidebar_info">
                <p>Powered by ChangeTeam</p>
            </div>
        </div>
    )
}

export default Sidebar