import Header from "../../components/Header";
import Services from "../../components/Services";
import About from "../../components/About";
import Doctors from "../../components/Doctors";
import Clients from "../../components/Clients";
import Footer from "../../components/Footer";
import Hospitals from "../../components/Hospitals";

function Intro() {
    return (
        <div className="intro">
            <Header onlyNav={false} />
            <Hospitals />
            <About />
            <Doctors />
            <Clients />
            <Footer />
        </div>
    )
}

export default Intro