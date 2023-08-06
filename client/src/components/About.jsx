import { Link } from "react-router-dom"

function About() {
    return (
        <section className="about_section layout_margin-bottom">
            <div className="container  ">
                <div className="row">
                    <div className="col-md-6 ">
                        <div className="img-box">
                            <img src="images/about-img.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="detail-box">
                            <div className="heading_container">
                                <h2>
                                    Biz <span>Haqimizda</span>
                                </h2>
                            </div>
                            <p>Biz, kasalhonalardagi harhil bo'limda xizmat korsatadigan doktorlarimiz uchun qulay va tezlashtirilgan onlayn navbat olish tizimini taqdim etishda hursandmiz. Bizga tashrif buyurishingiz va sog'ligingizni muhofaza qilishda bizning xizmatlarimizdan foydalanishingizni umid qilamiz.</p>
                            <Link to="/intro">
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About