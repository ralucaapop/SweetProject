import React, { useState } from 'react';
import './styleOrder.css';

const OrderCard = ({ order }) => {
    const { orderId, dateAndTime, deliveryMethod, price, products, phoneNumber, addressVal } = order;
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const isCourier = deliveryMethod && deliveryMethod.toLowerCase() === 'courier';

    return (
        <div className="admin-order-card-container">
            <div className="admin-order-card-header">
                <h2 className="admin-order-card-id">Order #{orderId}</h2>
            </div>
            <div className="admin-order-card-details-section">
                <div className="admin-order-card-info">
                    <p><strong> Order Date:</strong> {dateAndTime}</p>
                    <p><strong> Phone:</strong> {phoneNumber}</p>
                    <p><strong> Delivery:</strong> {deliveryMethod}</p>
                    {isCourier && (
                        <p><strong> Address:</strong> {addressVal}</p>
                    )}
                    <p><strong> Total Price:</strong> {price} $</p>
                </div>

                <h3 className="admin-order-card-section-title">Ordered Products</h3>
                <div className="admin-order-card-product-list">
                    {products.map(prod => (
                        <div
                            key={prod.id}
                            className="admin-order-card-product-item"
                            onClick={() => handleProductClick(prod)}
                        >
                            <div className="admin-order-card-product-info">
                                <h4 className="admin-order-card-product-name">{prod.name}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedProduct && (
                <div className="admin-order-card-modal-overlay">
                    <div className="admin-order-card-modal-content">
                        <h4 className="admin-order-card-modal-title">Product Details</h4>
                        <img
                            src={selectedProduct.productImgUrl}
                            alt={selectedProduct.name}
                            className="admin-order-card-modal-image"
                        />
                        <p><strong>Name:</strong> {selectedProduct.name}</p>
                        <p><strong>Price:</strong> {selectedProduct.price} $</p>
                        <p><strong>Category:</strong> {selectedProduct.productCategory}</p>
                        <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
                        {selectedProduct.ingredients && (
                            <p><strong>Ingredients:</strong> {selectedProduct.ingredients}</p>
                        )}
                        {selectedProduct.mentions && <p><strong>Mentions:</strong> {selectedProduct.mentions}</p>}

                        <button onClick={handleCloseModal} className="admin-order-card-close-btn">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderCard;
