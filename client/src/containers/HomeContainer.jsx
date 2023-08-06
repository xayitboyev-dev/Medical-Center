import { Outlet, Link } from 'react-router-dom'

function HomeContainer() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/auth/login">Login</Link>
                        <Link to="/auth/register">Register</Link>
                        <Link to="/home/dashboard">Dashbord</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
            <footer>
                <h1>Medical center</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque a tempora ut nihil mollitia debitis, fugit iure blanditiis, error animi quaerat. Dicta, sapiente quod ducimus velit nesciunt assumenda doloremque ipsum. Dicta qui consectetur tempore nemo, veniam atque fugiat ex praesentium similique in neque reiciendis tenetur, saepe amet, laboriosam obcaecati deserunt?</p>
            </footer>
        </>
    )
}

export default HomeContainer