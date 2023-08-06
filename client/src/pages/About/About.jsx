import Header from "../../components/Header";
import About from "../../components/About";
import Footer from "../../components/Footer";

function AboutPage() {
    return (
        <>
            <Header onlyNav={true} />
            <div style={{ height: 90 }}></div>
            <About />
            <Footer />
        </>
    )
}

export default AboutPage;