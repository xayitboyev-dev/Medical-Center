import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Hospitals from "../../components/Hospitals";

function HospitalsPage() {
    return (
        <>
            <Header onlyNav={true} />
            <Hospitals getAll={true} />
            <Footer />
        </>
    );
};

export default HospitalsPage;