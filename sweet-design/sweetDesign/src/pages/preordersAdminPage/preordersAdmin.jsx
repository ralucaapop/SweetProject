import React, {useEffect, useState} from 'react';
import Navbar from "../../components/navbar/index.jsx";
import PreorderCard from "../../components/preorderCard/preorder.jsx";
import cakeImage from '../../images/cake-image.jpeg';
import cupcakeImage from '../../images/cake-image.jpeg';
import cookieImage from '../../images/cookie-image.jpeg';
import sweetsImage from '../../images/sweets-image.jpeg';
import './stylePreordersAdmin.css';
import axios from "axios";

const initialPreorders = [
    {
        id: 'P1',
        date: '2024-12-10',
        deadline: '2024-12-15',
        deliveryMethod: 'Courier',
        status: 'placed',
        totalPrice: 200.00,
        phoneNumber: '123-456-7890',
        address: '123 Main Street, Timisoara',
        products: [
            {
                id: 'prod-cookie1',
                name: 'Chocolate cookie',
                price: 5,
                category: 'cookies',
                quantity: 5,
                image: cookieImage,
                ingredients: 'Flour, Sugar, Chocolate',
                mentions: 'No nuts'
            }
        ]
    },
    {
        id: 'P2',
        date: '2024-12-11',
        deadline: '2024-12-18',
        deliveryMethod: 'Pickup',
        status: 'placed',
        totalPrice: 150.00,
        phoneNumber: '111-222-3333',
        address: '45 Short Road, Cluj',
        products: [
            {
                id: 'prod-cake1',
                name: 'Strawberry Cake',
                price: 50,
                category: 'cakes',
                quantity: 3,
                image: cakeImage,
                ingredients: 'Flour, Eggs, Strawberries, Cream',
                mentions: ''
            }
        ]
    },
    {
        id: 'P3',
        date: '2024-12-12',
        deadline: '2024-12-19',
        deliveryMethod: 'Courier',
        status: 'placed',
        totalPrice: 80.00,
        phoneNumber: '222-333-4444',
        address: '10 Cookie Ave, Oradea',
        products: [
            {
                id: 'prod-cookie2',
                name: 'Vanilla Cookies',
                price: 4,
                category: 'cookies',
                quantity: 10,
                image: cookieImage,
                ingredients: 'Flour, Sugar, Vanilla',
                mentions: 'Gluten-free'
            }
        ]
    },
    {
        id: 'P4',
        date: '2024-12-13',
        deadline: '2024-12-20',
        deliveryMethod: 'Pickup',
        status: 'placed',
        totalPrice: 300.00,
        phoneNumber: '333-444-5555',
        address: '89 Dessert Street, Brasov',
        products: [
            {
                id: 'prod-cupcake1',
                name: 'Chocolate Cupcakes',
                price: 10,
                category: 'cupcakes',
                quantity: 10,
                image: cupcakeImage,
                ingredients: 'Flour, Eggs, Chocolate, Buttercream',
                mentions: 'Extra chocolate topping'
            }
        ]
    },
    {
        id: 'P5',
        date: '2024-12-14',
        deadline: '2024-12-22',
        deliveryMethod: 'Courier',
        status: 'placed',
        totalPrice: 60.00,
        phoneNumber: '444-555-6666',
        address: '77 Sweet Lane, Timisoara',
        products: [
            {
                id: 'prod-sweets1',
                name: 'Assorted Lollipops',
                price: 2,
                category: 'sweets',
                quantity: 30,
                image: sweetsImage,
                ingredients: 'Sugar, Fruit flavors',
                mentions: ''
            }
        ]
    },

    {
        id: 'F1',
        date: '2024-12-15',
        deadline: '2024-12-22',
        deliveryMethod: 'Pickup',
        status: 'finished',
        totalPrice: 120.00,
        phoneNumber: '098-765-4321',
        address: '456 Another Road, Bucharest',
        products: [
            {
                id: 'prod-cake2',
                name: 'Strawberry Cake',
                price: 50,
                category: 'cakes',
                quantity: 2,
                image: cakeImage,
                ingredients: 'Flour, Eggs, Strawberries, Cream',
                mentions: 'Birthday decoration'
            }
        ]
    },
    {
        id: 'F2',
        date: '2024-12-16',
        deadline: '2024-12-24',
        deliveryMethod: 'Courier',
        status: 'finished',
        totalPrice: 90.00,
        phoneNumber: '555-666-7777',
        address: '999 Candy Boulevard, Iasi',
        products: [
            {
                id: 'prod-cookie3',
                name: 'Hazelnut Cookies',
                price: 3,
                category: 'cookies',
                quantity: 20,
                image: cookieImage,
                ingredients: 'Flour, Sugar, Hazelnut',
                mentions: ''
            }
        ]
    }
];

const PreordersAdmin = () => {
    const [preordersData, setPreordersData] = useState([]);
    const [currentSection, setCurrentSection] = useState('ARRIVED');
    const [currentPreorderIndex, setCurrentPreorderIndex] = useState(0);

    const filteredPreorders = preordersData
        .filter(o => o.orderStatus === currentSection)
        .sort((a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime));

    const handlePrev = () => {
        if (filteredPreorders.length === 0) return;
        if (currentPreorderIndex === 0) {
            setCurrentPreorderIndex(filteredPreorders.length - 1);
        } else {
            setCurrentPreorderIndex(currentPreorderIndex - 1);
        }
    };

    const handleNext = () => {
        if (filteredPreorders.length === 0) return;
        if (currentPreorderIndex === filteredPreorders.length - 1) {
            setCurrentPreorderIndex(0);
        } else {
            setCurrentPreorderIndex(currentPreorderIndex + 1);
        }
    };

    const currentPreorder = filteredPreorders[currentPreorderIndex];

    const changePreorderStatus = async (newStatus) => {
        if (!currentPreorder) return;
        const movedPreorderId = currentPreorder.orderId;

        try{
            console.log(newStatus)
            const response = await axios.post(`http://localhost:8080/api/in/user/preorder/change_preorder_status/${movedPreorderId}/${newStatus}`,
                {
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            if(response.status===200)
            {
                getAllPreorders()
                setCurrentSection(newStatus);
                const newFilteredPreorders = preordersData
                    .filter(o => o.orderStatus === newStatus)
                    .sort((a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime));

                const newIndex = newFilteredPreorders.findIndex(o => o.orderId === movedPreorderId);

                setCurrentPreorderIndex(newIndex !== -1 ? newIndex : 0);
                }
            }
            catch (error) {
                console.error('Error fetching products:', error);
            }
        };
    const getAllPreorders = async () =>{
        try {
            const response = await axios.get(`http://localhost:8080/api/in/user/preorder/get_all_preorders`);
            console.log("Produse obținute de la API:", response.data.data);
            setPreordersData(response.data.data); // Stocăm toate produsele
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };




    useEffect(() => {
        getAllPreorders();
    }, []);

    return (
        <>
            <Navbar />
            <div className="preorders-admin-page">
                <h1 className="preorders-page-title">Preorders Management</h1>
                <div className="preorders-section-buttons">
                    <button
                        className={`section-button ${currentSection === 'ARRIVED' ? 'active' : ''}`}
                        onClick={() => { setCurrentSection('ARRIVED'); setCurrentPreorderIndex(0); }}
                    >
                        Placed Preorders
                    </button>
                    <button
                        className={`section-button ${currentSection === 'READY' ? 'active' : ''}`}
                        onClick={() => { setCurrentSection('READY'); setCurrentPreorderIndex(0); }}
                    >
                        Finished Preorders
                    </button>
                    <button
                        className={`section-button ${currentSection === 'SHIPPED' ? 'active' : ''}`}
                        onClick={() => { setCurrentSection('SHIPPED'); setCurrentPreorderIndex(0); }}
                    >
                        Preorder History
                    </button>
                </div>

                <div className="preorders-admin-wrapper">
                    <div className="preorders-admin-button-container">
                        <button className="preorders-admin-nav-button" onClick={handlePrev} disabled={filteredPreorders.length === 0}>
                            ← Prev
                        </button>
                    </div>

                    <div className="preorders-admin-card-container">
                        {filteredPreorders.length > 0 ? (
                            <div className="preorder-card-actions">
                                <PreorderCard preorder={currentPreorder} />
                                {currentSection === 'ARRIVED' && (
                                    <button
                                        className="preorders-admin-status-button"
                                        onClick={() => changePreorderStatus('READY')}
                                    >
                                        Move to Finished
                                    </button>
                                )}
                                {currentSection === 'READY' && (
                                    <button
                                        className="preorders-admin-status-button"
                                        onClick={() => changePreorderStatus('SHIPPED')}
                                    >
                                        Move to History
                                    </button>
                                )}
                            </div>
                        ) : (
                            <p className="no-preorders-message">No preorders in this section.</p>
                        )}
                    </div>

                    <div className="preorders-admin-button-container">
                        <button className="preorders-admin-nav-button" onClick={handleNext} disabled={filteredPreorders.length === 0}>
                            Next →
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PreordersAdmin;
