import React, {useState} from 'react';
import './styleTasting.css';
import Navbar from "../../components/navbar/index.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const TastingsPage = () => {
    const token = localStorage.getItem("token");
    const [email, setEmail] = useState("");
    const [eventType, setEventType] = useState("");
    const [guestNumber, setGuestNumber] = useState(0);
    const [eventDate, setEventDate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const navigate = useNavigate();
    const handleSendRequest = async (e) =>{
        try {
            e.preventDefault()
            const response = await axios.post(
                "http://localhost:8080/api/in/tastingRequest/addNewRequest",
                {
                    emailUser:email,
                    eventType: eventType,
                    guestNumber: guestNumber,
                    eventDate: eventDate,
                    phoneNumber: phoneNumber
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Response:", response.data);
            if (response.status === 200) {
                alert("Your request was sent.");
                navigate("/")
            }
        } catch (error) {
            alert("Failed to accept a request.");
        }
    }

    return (
        <>
            <Navbar/>
            <div className="taste-container">
                <div className="taste-box">
                    <h2 className="taste-header">Tasting request</h2>
                    <form className="taste-form" onSubmit={handleSendRequest}>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input  onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email" placeholder="Email" />
                        </div>

                        <div>
                            <label htmlFor="eventType">Type of Event:</label>
                            <input onChange={(e) => setEventType(e.target.value)} value={eventType} type="text" id="eventType" placeholder="Type of Event" />
                        </div>

                        <div>
                            <label htmlFor="guestsNb">Guests Number:</label>
                            <input onChange={(e) => setGuestNumber(e.target.value)} value={guestNumber} type="number" id="guestsNb" placeholder="Number of Guests" />
                        </div>

                        <div>
                            <label htmlFor="eventDate">Event Date:</label>
                            <input value={eventDate} type="date" id="eventDate" onChange={(e) => setEventDate(e.target.value)}/>
                        </div>

                        <div>
                            <label htmlFor="phone">Phone Number:</label>
                            <input value={phoneNumber} type="tel" id="phone" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>

                        <button type="submit" className="taste-button">Submit Request</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default TastingsPage;
