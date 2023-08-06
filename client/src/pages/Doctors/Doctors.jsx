import { useEffect, useState } from 'react';
import { getFilter } from '../../services/doctors';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Item from './Item/Item';
import { useSearchParams } from "react-router-dom";
import Search from '../../containers/Loading/Search/Search';
import Path from '../../components/Path/Path';
import "./Doctors.css";

function Doctors() {

    const [doctors, setDoctors] = useState();
    const [page, setPage] = useState({ current: 1 });
    const [searchParams] = useSearchParams();
    const hospital = searchParams.get("hospital");
    const service = searchParams.get("service");

    // params getting
    let params = {};
    if (hospital) params.hospital = hospital;
    if (service) params.service = service;
    else {
        sessionStorage.removeItem("service");
    };

    function pageSetter(data) {
        setPage({
            current: data.currentPage,
            nextPage: data.currentPage < data.totalPages ? data.currentPage + 1 : null,
            prevPage: data.currentPage > 1 ? data.currentPage - 1 : null,
            items: data.totalItems,
            total: data.totalPages,
        });
    };

    useEffect(() => {
        toSearch();

    }, []);

    async function toSearch(page = 1) {
        setDoctors(null);
        const search = document.querySelector(".search_box input").value || "";
        console.log(search);
        const { data } = await getFilter({ search, page, ...params });
        setDoctors(data.items);
        pageSetter(data);
    };

    function paginationPrev() {
        if (page.current <= 1) return;
        toSearch(page.current - 1);
    };

    function paginationNext() {
        if (page.current >= page.total) return;
        toSearch(page.current + 1);
    };

    function getServiceFromStorage() {
        if (sessionStorage.getItem("service")) {
            const service = JSON.parse(sessionStorage.getItem("service"));
            return service.name + " shifokorlar ro'yxati";
        };
        return null
    }

    function getPath() {
        return { hospital: JSON.parse(sessionStorage.getItem("hospital") || "{}"), service: JSON.parse(sessionStorage.getItem("service") || "{}") };
    };

    return (
        <div className='doctors_page'>
            <Header onlyNav={true} />
            <div className="container">
                <div className="row" style={{ paddingBottom: "30px" }}>
                    <div className="col-12">
                        {getPath().service?.name ? <Path items={[getPath().hospital?.name, getPath().service?.name]} /> : <Path items={["Shifokorlar"]} />}
                    </div>
                    <div className="col-md-8">
                        <div className="doctors_page_title">
                            <h2>{getServiceFromStorage() || "Barcha shifokorlar"}</h2>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="search_box">
                            <form className='search_box_form' onSubmit={(e) => {
                                e.preventDefault();
                                toSearch();
                            }}>
                                <input type="text" placeholder='Qidirish' name="search" />
                                <button type='submit'>
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {doctors?.length > 0 ? doctors?.map((item) => <Item key={item._id} data={item} />) : doctors ? <div className='empty' style={{ width: "100%", height: "150px", padding: "100px 0", display: "flex", justifyContent: "center", alignItems: "center" }}><h3 style={{ opacity: "0.5", fontSize: "18px" }}>Hech qanday shifokorlar topilmadi!</h3></div> : <Search height="350px" />}
                    <div className="col-12">
                        <div className="doctors_pagination">
                            <div className="doctors_pagination_item prev" onClick={paginationPrev}>
                                <span>{"<"}</span>
                            </div>
                            {
                                <>
                                    {page.prevPage ? <div className="doctors_pagination_item" onClick={paginationPrev}>
                                        <span>{page?.prevPage}</span>
                                    </div> : ""}
                                    <div className="doctors_pagination_item current">
                                        <span>{page?.current}</span>
                                    </div>
                                    {page.nextPage ? <div className="doctors_pagination_item" onClick={paginationNext}>
                                        <span>{page?.nextPage}</span>
                                    </div> : ""}
                                </>
                            }
                            <div className="doctors_pagination_item next" onClick={paginationNext}>
                                <span>{">"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Doctors;