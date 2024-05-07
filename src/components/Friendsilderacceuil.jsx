import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { Config } from '../config';
function FriendsSlider() {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${Config.LOCAL_URL}/api/user`);
                if (!response.ok) {
                    throw new Error('Failed to fetch users error');
                }
                const data = await response.json();
                setAgents(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const friendSettings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        centerMode: false,
        variableWidth: true,
    };

    const sliderRef = React.createRef();

    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };

    return (
        <div className="flex flex-col mt-6 w-[100%] px-3 md:px-0  md:w-[85%] bg-white rounded-md shadow-sm">
           
            <div className="flex flex-row  items-center  mt-2 ">
                <button onClick={prevSlide} className="prev-slide-button w-[10%] -ml-2    md:px-1  font-bold text-3xl">&#10094;</button>  
                <Slider ref={sliderRef} style={{ width: '90%' ,marginLeft: "5px", paddingLeft: "5px"}} {...friendSettings}>
                    {agents.map((value, index) => (
                        <div key={index} className=" w150 md:w-[50%] d-block border-0 bg-gray-100  rounded-3 overflow-hidden mb-3 me-3 ">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center w-100 ps-3 pe-3 pb-4 text-center">
                                <Link to={`/profile/${value.user.id}`}>
                                    <figure className="avatar mb-1  d-flex justify-content-center align-items-center">
                                        <img src={value.user.image} alt="avater" className="shadow-sm rounded-circle w-16 h-16" />
                                    </figure>
                                </Link>
                                <h4 className="fw-700 font-xssss mt-3 mb-1 d-block w-100"> {value.user.nom} {value.user.prenom} </h4>
                                <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-2">{value.user.profil}</p>
                                <a href={`/profile/${value.user.id}`} className=" justify-center px-6 py-2  text-white text-center bg-blue-600 rounded-[30px] max-md:px-5">Voir Profil</a>
                            </div>
                        </div>
                    ))}
                </Slider>

                <button onClick={nextSlide} className="next-slide-button w-[10%] font-bold px-1.5 text-3xl">&#10095;</button>
            </div>
        </div>
    );
}

export default FriendsSlider;
