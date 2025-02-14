import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importă useNavigate
import './styleServices.css';
import Navbar from "../../components/navbar/index.jsx";
import tastingImage from '../../images/tastings.jpeg';
import eventImage from '../../images/events.jpeg';
import {isTokenValid, parseJwt} from "../../utils/authService.jsx";

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token && isTokenValid(token);
};

const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = parseJwt(token);
        return decodedToken.role;
    }
    return null;
};

const Services = () => {
    const navigate = useNavigate();
    const userRole=getUserRole();
    const handleTastingClick = () => {
        console.log("Tasting clicked!");
        navigate('/tastings');
    };

    const handleEventClick = () => {
        console.log("Event clicked!");
        navigate('/events');
    };

    return (
        <>
            <Navbar />
            <div className="services-container">
                <div className={`services-grid ${userRole !== "CUSTOMER" ? 'single-item-center' : ''}`}>
                    {(userRole === "CUSTOMER" && isAuthenticated()) && (
                        <div className="services-item">
                            <button className="services-button" onClick={handleTastingClick}>
                                <img src={tastingImage} alt="Tastings" className="services-image"/>
                                <div className="services-caption">Tastings</div>
                            </button>
                        </div>
                    )}

                    <div className="services-item">
                        <button className="services-button" onClick={handleEventClick}>
                            <img src={eventImage} alt="Events" className="services-image"/>
                            <div className="services-caption">Events</div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Services;
