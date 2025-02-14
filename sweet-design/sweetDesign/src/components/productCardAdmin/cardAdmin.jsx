import React from 'react';
import './styleCardAdmin.css';

/*aceasta componenta reprezinta fiecare produs disponibil in pagina de admin*/
const ProductCardAdmin = ({ image, price, name, ingredients, isArchived, onToggleStatus, onClick }) => {
    return (
        <div className="admin-product-card" onClick={onClick}>
            <div className="admin-product-image-container">
                <img src={image} alt={name} className="admin-product-image" />
                <div className="admin-product-price">{price}</div>
            </div>
            <div className="admin-product-info">
                <h3 className="admin-product-name">{name}</h3>
                <p className="admin-product-ingredients">{ingredients}</p>
                <button
                    className="admin-product-status-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleStatus();
                    }}
                >
                    {isArchived ? 'Activate' : 'Archive'}
                </button>
            </div>
        </div>
    );
};

export default ProductCardAdmin;
