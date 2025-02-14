import React, { useState } from 'react';
import './stylePreorder.css';

const PreorderCard = ({ preorder }) => {
    const { orderId, dateAndTime, deliveryMethod, price, products, phoneNumber, addressVal } = preorder;
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const isCourier = deliveryMethod && deliveryMethod.toLowerCase() === 'courier';

    return (
        <div className="admin-preorder-card-container">
            <div className="admin-preorder-card-header">
                <h2 className="admin-preorder-card-id">Preorder #{orderId}</h2>
            </div>
            <div className="admin-preorder-card-details-section">
                <div className="admin-preorder-card-info">
                    <p><strong> Deadline:</strong> {dateAndTime}</p>
                    <p><strong> Phone:</strong> {phoneNumber}</p>
                    <p><strong> Delivery:</strong> {deliveryMethod}</p>
                    {isCourier && (
                        <p><strong> Address:</strong> {addressVal}</p>
                    )}
                    <p><strong> Total Price:</strong> {price} $</p>
                </div>

                <h3 className="admin-preorder-card-section-title">Preordered Products</h3>
                <div className="admin-preorder-card-product-list">
                    {products.map(prod => (
                        <div
                            key={prod.id}
                            className="admin-preorder-card-product-item"
                            onClick={() => handleProductClick(prod)}
                        >
                            <div className="admin-preorder-card-product-info">
                                <h4 className="admin-preorder-card-product-name">{prod.name}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedProduct && (
                <div className="admin-preorder-card-modal-overlay">
                    <div className="admin-preorder-card-modal-content">
                        <h4 className="admin-preorder-card-modal-title">Product Details</h4>
                        <img
                            src={selectedProduct.productImgUrl}
                            alt={selectedProduct.name}
                            className="admin-preorder-card-modal-image"
                        />
                        <p><strong>Name:</strong> {selectedProduct.name}</p>
                        <p><strong>Price:</strong> {selectedProduct.price} $</p>
                        <p><strong>Category:</strong> {selectedProduct.productCategory}</p>
                        <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
                        {selectedProduct.ingredients && (
                            <p><strong>Ingredients:</strong> {selectedProduct.ingredients}</p>
                        )}
                        {selectedProduct.mentions && <p><strong>Mentions:</strong> {selectedProduct.mentions}</p>}

                        <button onClick={handleCloseModal} className="admin-preorder-card-close-btn">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PreorderCard;
