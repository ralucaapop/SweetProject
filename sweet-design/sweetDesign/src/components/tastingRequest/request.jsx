import React, { useState } from 'react';
import './styleRequest.css';
import axios from "axios";

const RequestCard = ({ tasting, requestNumber }) => {
    const { emailUser, eventType, guestNumber, eventDate, phoneNumber, tastingRequestId } = tasting;
    const [message, setMessage] = useState("");

    const handleAccept = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                "http://localhost:8080/api/in/tastingRequest/response-request",
                {
                    response: "yes",
                    tastingRequestId: tastingRequestId,
                    email: emailUser,
                    message: message
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
                alert("The response was sent to the customer");
                window.location.reload()
            }
        } catch (error) {
            alert("Failed to accept a request.");
        }
    };

    const handleDecline = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                "http://localhost:8080/api/in/tastingRequest/response-request",
                {
                    response: "no",
                    tastingRequestId: tastingRequestId,
                    email: emailUser,
                    message: message
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
                alert("The response was sent to the customer");
                window.location.reload()
            }
        } catch (error) {
            alert("Failed to decline a request");
        }
    };

    return (
        <div className="admin-tasting-card-container">
            <div className="admin-tasting-card-header">
                <h2 className="request-header">Tasting request #{requestNumber}</h2>
            </div>
            <div className="admin-tasting-card-details-section">
                <div className="admin-tasting-card-info">
                    <p><strong>Email:</strong> {emailUser}</p>
                    <p><strong>Type of Event:</strong> {eventType}</p>
                    <p><strong>Number of Guests:</strong> {guestNumber}</p>
                    <p><strong>Event Date:</strong> {eventDate}</p>
                    <p><strong>Phone:</strong> {phoneNumber}</p>
                </div>
                <div className="admin-tasting-card-actions">
                    <textarea
                        className="admin-tasting-card-message"
                        placeholder="Write a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="admin-tasting-card-buttons">
                        <button className="admin-tasting-card-accept" onClick={handleAccept}>
                            Accept request
                        </button>
                        <button className="admin-tasting-card-decline" onClick={handleDecline}>
                            Decline request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;
