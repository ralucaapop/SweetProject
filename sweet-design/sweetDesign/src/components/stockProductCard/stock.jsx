import React, { useState } from 'react';
import './styleStockkk.css';
import axios from "axios";

const StockProductCard = ({ image, price, name, ingredients, initialStock, stockId }) => {
    const [stock, setStock] = useState(initialStock);

    const increaseStock = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(
                `http://localhost:8080/api/in/stock_products/changeProductStock/${stockId}`,
                { quantity : stock + 1 },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                }
            );
            console.log(`Stock for product ID ${stockId} updated successfully`);
            window.location.reload();
        } catch (error) {
            console.error('Error updating stock:', error);
        }
    };

    const decreaseStock = async  () => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(
                `http://localhost:8080/api/in/stock_products/changeProductStock/${stockId}`,
                { quantity : stock - 1 },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                }
            );
            console.log(`Stock for product ID ${stockId} updated successfully`);
            window.location.reload();
        } catch (error) {
            console.error('Error updating stock:', error);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;

        if (value === "") {
            setStock("");
        } else if (!isNaN(value) && parseInt(value, 10) >= 0) {
            setStock(parseInt(value, 10));
        }
    };

    const handleBlur = () => {
        if (stock === "") {
            setStock(0);
        }
    };

    return (
        <div className="stock-card">
            <div className="stock-card-image-container">
                <img className="stock-card-image" src={image} alt={name} />
                <div className="stock-card-price">{price}</div>
            </div>
            <div className="stock-card-info">
                <h3 className="stock-card-name">{name}</h3>
                <p className="stock-card-ingredients">{ingredients}</p>
            </div>
            <div className="stock-card-controls">
                <button className="stock-card-button" onClick={decreaseStock}>-</button>
                <input
                    type="number"
                    className="stock-card-input"
                    value={stock === "" ? "" : stock} // Permite afișarea șirului gol
                    onChange={handleInputChange}
                    onBlur={handleBlur} // Setează automat la 0 dacă inputul este gol
                    min="0"
                />
                <button className="stock-card-button" onClick={increaseStock}>+</button>
            </div>
        </div>
    );
};

export default StockProductCard;