import React, { useState, useEffect } from 'react';
import './stylePo.css';
import Navbar from "../../components/navbar/index.jsx";
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
import {parseJwt} from "../../utils/authService.jsx";

const SendPreorder = () => {
    const [deliveryMethod, setDeliveryMethod] = useState("PERSONAL");
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [preorderDate, setPreorderDate] = useState("");
    const [addressType, setAddressType] = useState("existing");
    const [selectedAddress, setSelectedAddress] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();
    const { price } = location.state || {};

    const token = localStorage.getItem("token")
    const decodeToken = parseJwt(token)
    const clientEmail = decodeToken.email;

    const fetchAdresses = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/in/address/getAllClientAddresses/${clientEmail}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                const addressList = response.data.data
                console.log(addressList)
                setAddresses(addressList);
            }
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };

    useEffect(() => {
        fetchAdresses()
    }, []);

    const handleDeliveryMethodChange = (event) => {
        const method = event.target.value;
        setDeliveryMethod(method);
        setDeliveryCost(method === "COURIER" ? 10 : 0);
    };

    const handleAddressSelect = (addressId) => {
        setSelectedAddress(addressId);
    };

    const fetchAddNewAdress = async () => {
        try {
            const response = await axios.post(

                `http://localhost:8080/api/in/address/addNewAddress`, {
                    address: newAddress,
                    userEmail: clientEmail,
                    phoneNumber: phoneNumber
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert("Your new address was saved!")
                fetchAdresses()
                setAddressType("existing");
            }
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(selectedAddress)

        const dateTime = new Date(Date.now());
        const dateOnly = dateTime.toISOString().split('T')[0];
        try {
            const response = await axios.post(
                `http://localhost:8080/api/in/user/preorder/addPreorder/${clientEmail}`, {
                    addressId: selectedAddress,
                    deliveryMethod: deliveryMethod,
                    dateAndTime: preorderDate,
                    price:price,
                    phoneNumber: phoneNumber
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert("Your preorder was sent!")
                navigate("/")
            }
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };


    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + 1);

    const formattedToday = today.toISOString().split("T")[0];
    const formattedMaxDate = maxDate.toISOString().split("T")[0];

    return (
        <>
            <Navbar />
            <div className="send-preorder-container">
                <div className="send-preorder-box">
                    <h2 className="send-preorder-header">Preorder Details</h2>
                    {loading && <p>Loading...</p>}
                    <form className="send-preorder-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="deliveryMethod">Delivery Method:</label>
                            <select
                                id="deliveryMethod"
                                value={deliveryMethod}
                                onChange={handleDeliveryMethodChange}
                            >
                                <option value="PERSONAL">Pickup</option>
                                <option value="COURIER">Home Delivery</option>
                            </select>
                        </div>

                        {deliveryMethod === "COURIER" && (
                            <p className="delivery-cost">Delivery Cost: ${deliveryCost}</p>
                        )}

                        <div className="form-group">
                            <label htmlFor="preorderDate">Preorder Date:</label>
                            <input
                                type="date"
                                id="preorderDate"
                                value={preorderDate}
                                onChange={(e) => setPreorderDate(e.target.value)}
                                min={formattedToday}
                                max={formattedMaxDate}
                            />
                            <p className="date-restriction-message">
                                You can only select a date within one month from today.
                            </p>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                placeholder="Enter your phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        {deliveryMethod === "COURIER" && (
                            <>
                                <div className="form-group">
                                    <label>Address:</label>
                                    <select
                                        value={addressType}
                                        onChange={(e) => setAddressType(e.target.value)}
                                    >
                                        <option value="existing">Use Existing Address</option>
                                        <option value="new">Enter New Address</option>
                                    </select>
                                </div>

                                {addressType === "existing" && (
                                    <div className="existing-addresses">
                                        {addresses.map((addressItem) => (
                                            <div key={addressItem.addressId} className="address-option">
                                                <input
                                                    type="radio"
                                                    name="address"
                                                    value={addressItem.addressId}
                                                    checked={selectedAddress === addressItem.addressId}
                                                    onChange={() => handleAddressSelect(addressItem.addressId)}
                                                />
                                                <label className="address-label">{addressItem.address}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {addressType === "new" && (
                                    <div className="form-group">
                                        <label htmlFor="newAddress">New Address:</label>
                                        <input
                                            type="text"
                                            id="newAddress"
                                            placeholder="Enter your new address"
                                            value={newAddress}
                                            onChange={(e) => setNewAddress(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="save-address-button"
                                            onClick={fetchAddNewAdress}
                                        >
                                            Save Address
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        <button type="submit" className="send-preorder-button" disabled={loading}>
                            Submit Preorder
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SendPreorder;
