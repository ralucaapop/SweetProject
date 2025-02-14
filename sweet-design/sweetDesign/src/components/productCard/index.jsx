import React from 'react';
import './styleProduct.css';
/*aceasta componenta reprezinta fiecare produs disponibil*/
const ProductCard = ({ image, price, name, ingredients, onClick }) => {
    return (
        <div className="product-card" onClick={onClick}>
            <div className="product-image-container">
                <img src={image} alt={name} className="product-image" />
                <div className="product-price">{price}</div>
            </div>
            <div className="product-info">
                <h3 className="product-name">{name}</h3>
                <p className="product-ingredients">{ingredients}</p>
            </div>
        </div>
    );
};

export default ProductCard;
