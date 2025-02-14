import React, {useEffect, useState} from 'react';
import Navbar from "../../components/navbar/index.jsx";
import OrderCard from "../../components/orderCard/order.jsx";
import cakeImage from '../../images/cake-image.jpeg';
import cupcakeImage from '../../images/cake-image.jpeg';
import cookieImage from '../../images/cookie-image.jpeg';
import sweetsImage from '../../images/sweets-image.jpeg';
import './styleOrdersAdmin.css';
import axios from "axios";

const OrdersAdmin = () => {
    const [ordersData, setOrdersData] = useState([]);
    const [currentSection, setCurrentSection] = useState('ARRIVED');
    const [currentOrderIndex, setCurrentOrderIndex] = useState(0);

    const filteredOrders = ordersData
        .filter(o => o.orderStatus === currentSection)
        .sort((a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime));

    const handlePrev = () => {
        if (filteredOrders.length === 0) return;
        if (currentOrderIndex === 0) {
            setCurrentOrderIndex(filteredOrders.length - 1);
        } else {
            setCurrentOrderIndex(currentOrderIndex - 1);
        }
    };

    const getAllOrders = async () =>{
        try {
            const response = await axios.get(`http://localhost:8080/api/in/user/order/get_all_orders`);
            console.log("Produse obținute de la API:", response.data.data);
            setOrdersData(response.data.data); // Stocăm toate produsele
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleNext = () => {
        if (filteredOrders.length === 0) return;
        if (currentOrderIndex === filteredOrders.length - 1) {
            setCurrentOrderIndex(0);
        } else {
            setCurrentOrderIndex(currentOrderIndex + 1);
        }
    };

    const currentOrder = filteredOrders[currentOrderIndex];

    const changeOrderStatus = async (newStatus) => {

        if (!currentOrder) return;
        const movedOrderId = currentOrder.orderId;
        console.log(currentOrder)
        try{
            console.log(newStatus)
            const response = await axios.post(`http://localhost:8080/api/in/user/order/change_order_status/${movedOrderId}/${newStatus}`,
                {
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            if(response.status===200){
                console.log(response)
                setCurrentSection(newStatus);
                getAllOrders()
                const newFilteredOrders = ordersData
                    .filter(o => o.status === newStatus)
                    .sort((a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime));

                const newIndex = newFilteredOrders.findIndex(o => o.id === movedOrderId);

                setCurrentOrderIndex(newIndex !== -1 ? newIndex : 0);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }


    };

    useEffect(() => {
        getAllOrders();
    }, []);

    return (
        <>
            <Navbar />
            <div className="orders-admin-page">
                <h1 className="orders-page-title">Orders Management</h1>
                <div className="orders-section-buttons">
                    <button
                        className={`section-button ${currentSection === 'ARRIVED' ? 'active' : ''}`}
                        onClick={() => { setCurrentSection('ARRIVED'); setCurrentOrderIndex(0); }}
                    >
                        Placed Orders
                    </button>
                    <button
                        className={`section-button ${currentSection === 'READY' ? 'active' : ''}`}
                        onClick={() => { setCurrentSection('READY'); setCurrentOrderIndex(0); }}
                    >
                        Finished Orders
                    </button>
                    <button
                        className={`section-button ${currentSection === 'SHIPPED' ? 'active' : ''}`}
                        onClick={() => { setCurrentSection('SHIPPED'); setCurrentOrderIndex(0); }}
                    >
                        Order History
                    </button>
                </div>

                <div className="orders-admin-wrapper">
                    <div className="orders-admin-button-container">
                        <button className="orders-admin-nav-button" onClick={handlePrev} disabled={filteredOrders.length === 0}>
                            ← Prev
                        </button>
                    </div>

                    <div className="orders-admin-card-container">
                        {filteredOrders.length > 0 ? (
                            <div className="order-card-actions">
                                <OrderCard order={currentOrder} />
                                {currentSection === 'ARRIVED' && (
                                    <button
                                        className="orders-admin-status-button"
                                        onClick={() => changeOrderStatus('READY')}
                                    >
                                        Move to Finished
                                    </button>
                                )}
                                {currentSection === 'READY' && (
                                    <button
                                        className="orders-admin-status-button"
                                        onClick={() => changeOrderStatus('SHIPPED')}
                                    >
                                        Move to History
                                    </button>
                                )}
                            </div>
                        ) : (
                            <p className="no-orders-message">No orders in this section.</p>
                        )}
                    </div>

                    <div className="orders-admin-button-container">
                        <button className="orders-admin-nav-button" onClick={handleNext} disabled={filteredOrders.length === 0}>
                            Next →
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrdersAdmin;
