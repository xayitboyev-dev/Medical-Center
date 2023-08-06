import { useEffect, useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getHome } from "../services/auth";
import Preloader from '../components/Preloader';
import UserContext from '../contexts/UserContext';

function UserContainer() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await getHome();
                const profile = data?.profile;
                if (profile?._id) {
                    setUser(profile);
                    if (profile?.role === "admin") navigate("/admin");
                    else if (profile?.role === "doctor") navigate("/doctor");
                } else {
                    localStorage.clear();
                    setUser(null);
                };
            } catch (error) {
                localStorage.clear();
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    return loading ? (<Preloader />) : <Outlet />;
}

export default UserContainer