import Header from '../../components/Header'
import Footer from '../../components/Footer'
import "./Profile.css";

function Profile() {
    return (
        <>
            <Header onlyNav={true} />
            <div className="profile_page">
                <h1>Vaqt yetmay qoldi!</h1>
            </div>
            <Footer />
        </>
    )
}

export default Profile