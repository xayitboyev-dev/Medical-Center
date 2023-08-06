import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer className="footer_section">
            <div className="container">
                <div className="row justify-content-between">

                    <div className="col-md-6 col-lg-3 footer_col">
                        <div className="footer_detail">
                            <h4>
                                Biz haqimizda
                            </h4>
                            <p>Hush kelibsiz! Bizning yangi va qulay veb-saytimizga xush kelibsiz. Biz, sizning kasalhona tashkilotidagi harhil bolimlarida xizmat korsatayotgan sifatli va mutaxassis doktorlarimiz uchun navbat oladigan innovatsion veb-saytimizni taklif qilamiz.</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-2 mx-auto footer_col">
                        <div className="footer_link_box">
                            <h4>
                                Sahifalar
                            </h4>
                            <div className="footer_links">
                                <Link className="active" to="/">Asosiy</Link>
                                <Link to="/about">Biz haqimizda</Link>
                                <Link to="/doctors">Shifokorlar</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 footer_col">
                        <div className="footer_contact">
                            <h4>Bog'lanish</h4>
                            <div className="contact_link_box">
                                <Link to="/intro">
                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                    <span>
                                        Location
                                    </span>
                                </Link>
                                <Link to="/intro">
                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                    <span>
                                        Call +998931303006
                                    </span>
                                </Link>
                                <Link to="/intro">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                    <span>
                                        info@medicalct.uz
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="footer_social">
                            <Link to="/intro">
                                <i className="fa fa-facebook" aria-hidden="true"></i>
                            </Link>
                            <Link to="/intro">
                                <i className="fa fa-twitter" aria-hidden="true"></i>
                            </Link>
                            <Link to="/intro">
                                <i className="fa fa-linkedin" aria-hidden="true"></i>
                            </Link>
                            <Link to="/intro">
                                <i className="fa fa-instagram" aria-hidden="true"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="footer-info">
                    <p>
                        &copy; <span id="displayYear">{new Date().getFullYear()}</span> Barcha huquqlar himoyalangan!
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer