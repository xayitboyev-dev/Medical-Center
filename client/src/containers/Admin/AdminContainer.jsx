import Navbar from "../../components/Admin/Navbar/Navbar"
import Sidebar from "../../components/Admin/Sidebar/Sidebar"
import { Outlet } from "react-router-dom"
import "./AdminContainer.css";

function AdminContainer() {
    return (
        <section className="admin_page" style={{ height: "100vh" }}>
            <Navbar />
            <main className="admin_main" style={{ height: "calc(100% - 60px)", display: "flex" }}>
                <Sidebar />
                <Outlet />
            </main>
        </section>
    )
}

export default AdminContainer