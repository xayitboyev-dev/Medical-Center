import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Services from "../../components/Services";

function ServicesPage() {
    return (
        <>
            <Header onlyNav={true}/>
            <Services getAll={true} />
            <Footer />
        </>
    );
};

export default ServicesPage;