import React, { useState, useEffect } from 'react';
import './styleSendO.css';
import Navbar from "../../components/navbar/index.jsx";
import {useLocation, useNavigate} from 'react-router-dom';
import {parseJwt} from "../../utils/authService.jsx";
import axios from "axios";



const SendOrder = () => {
    const [deliveryMethod, setDeliveryMethod] = useState("PERSONAL");
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [addressType, setAddressType] = useState("existing");
    const [selectedAddressId, setSelectedAddressId] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const { price } = location.state || {};

    const navigate = useNavigate();

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

    const handleAddressSelect = (address) => {
        setSelectedAddressId(address);
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


    // ======= API: POST ORDER =======
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(price)

        const dateTime = new Date(Date.now());
        const dateOnly = dateTime.toISOString().split('T')[0];        try {
            const response = await axios.post(
                `http://localhost:8080/api/in/user/order/addOrder/${clientEmail}`, {
                     addressId: selectedAddressId,
                     deliveryMethod: deliveryMethod,
                     dateAndTime: dateOnly,
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
                alert("Your order was sent!")
                navigate("/")
            }
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="send-order-container">
                <div className="send-order-box">
                    <h2 className="send-order-header">Order Details</h2>
                    {loading && <p>Loading...</p>}
                    <form className="send-order-form" onSubmit={handleSubmit}>
                        <div className="order-form-group">
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
                            <p className="order-delivery-cost">Delivery Cost: ${deliveryCost}</p>
                        )}

                        <div className="order-form-group">
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
                                <div className="order-form-group">
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
                                    <div className="order-existing-addresses">
                                        {addresses.map((addressItem) => (
                                            <div key={addressItem.addressId} className="order-address-option">
                                                <input
                                                    type="radio"
                                                    name="address"
                                                    value={addressItem.addressId}
                                                    checked={selectedAddressId === addressItem.addressId}
                                                    onChange={() => handleAddressSelect(addressItem.addressId)}
                                                />
                                                <label className="order-address-label">{addressItem.address}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {addressType === "new" && (
                                    <div className="order-form-group">
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
                                            className="order-save-address-button"
                                            onClick={fetchAddNewAdress}
                                        >
                                            Save Address
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        <button type="submit" className="order-submit-button" disabled={loading}>
                            Submit Order
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SendOrder;
