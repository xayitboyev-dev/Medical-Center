import { Outlet } from 'react-router-dom';
import "./AuthContainer.css";

function AuthContainer() {
    return (
        <div className='auth_page'>
            <Outlet />
        </div>
    )
}

export default AuthContainer