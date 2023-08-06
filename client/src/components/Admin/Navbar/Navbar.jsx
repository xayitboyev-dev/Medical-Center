import "./Navbar.css";

function Navbar() {
    function logout() {
        localStorage.clear();
        location.href = "/";
    };

    return (
        <nav className="admin_nav">
            <div className="title">
                <h2>Admin panel</h2>
            </div>
            <div className="tools">
                <h2 className="logout" onClick={logout}>Chiqish</h2>
            </div>
        </nav>
    )
}

export default Navbar