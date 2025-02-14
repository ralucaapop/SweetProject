import React, { useState, useEffect } from 'react';
import './styleRequestAdmin.css';
import Navbar from "../../components/navbar/index.jsx";
import RequestCard from "../../components/tastingRequest/request.jsx";
import axios from "axios";
import {parseJwt} from "../../utils/authService.jsx";

const RequestAdmin = () => {
    const [tastings, setTastings] = useState([]);

    const getAllRequests = async ()=> {
        const token = localStorage.getItem("token");
        const decodeToken = parseJwt(token);
        const userEmail = decodeToken.email;

        try {
            const response = await axios.get(
                "http://localhost:8080/api/in/tastingRequest/getAllRequests",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            console.log("Response:", response.data);
            if (response.status === 200) {
                setTastings(response.data.data)
            }
        } catch (error) {
            console.error('Eroare la preluarea solicitarilor:', error);

        }
    }
    useEffect(() => {
        getAllRequests()
    }, []);

    return (
        <>
            <Navbar />
            {
                tastings.length > 0 ? (
                    <div className="request-list">
                    {tastings.map((tasting, index) => (
                        <RequestCard
                            key={index}
                            tasting={tasting}
                            requestNumber={index + 1}

                        />
                    ))}
                </div>): (
                    <h2 style={{textAlign: 'center', marginTop: '20vh'}}>
                        There are no requests yet.
                    </h2>)
            }

        </>
    );
};

export default RequestAdmin;
