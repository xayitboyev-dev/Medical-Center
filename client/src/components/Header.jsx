import { useContext } from "react";
import { TITLE } from "../config/config.json";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function Header(props) {
    const { user } = useContext(UserContext);

    async function logout(e) {
        e.preventDefault();
        localStorage.clear();
        location.href = "/";
    };

    return (
        <div className={"hero_area" + (props.onlyNav ? " onlyNav" : "")}>
            <div className="hero_bg_box">
                <img src="images/hero-bg.png" alt="" />
            </div>
            <header className="header_section">
                <div className="container">
                    <nav className="navbar navbar-expand-lg custom_nav-container ">
                        <Link className="navbar-brand" to={"/"}><span>{TITLE}</span></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className=""> </span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                {user?._id ?
                                    <>
                                        {
                                            user?.role == "doctor" ?
                                                (
                                                    <>
                                                        <li className="nav-item">
                                                            <Link className="nav-link" to={"/doctor/"}>Dashboard</Link>
                                                        </li>
                                                    </>
                                                ) : (
                                                    <>
                                                        <li className="nav-item">
                                                            <Link className="nav-link" to={"/"}>Asosiy</Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link className="nav-link" to={"/hospitals"}>Shifoxonalar</Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href={"https://t.me/medical_center_bot?start=" + user?._id}>Telegram ulash</a>
                                                        </li>
                                                    </>
                                                )
                                        }
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/profile">Profile</Link>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/" onClick={logout}>Chiqish</a>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/"}>Asosiy</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/hospitals"}>Shifoxonalar</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/about"}>Biz haqimizda</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/auth/login"}>Kirish</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/auth/register"}>Ro'yxatdan o'tish</Link>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
            <section className="slider_section ">
                <div className="container ">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="detail-box">
                                <h1>BIZ SALOMATLIK XIZMATINI TA'MINLAYMIZ</h1>
                                <p>Biz, kasalhonalardagi harhil bo'limda xizmat korsatadigan doktorlarimiz uchun qulay va tezlashtirilgan onlayn navbat olish tizimini taqdim etishda hursandmiz. Bizga tashrif buyurishingiz va sog'ligingizni muhofaza qilishda bizning xizmatlarimizdan foydalanishingizni umid qilamiz.</p>
                                <div className="btn-box">
                                    <a href="" className="btn1">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}

export default Header