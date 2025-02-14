import React, { useState, useEffect } from 'react';
import './styleCheckout.css';
import Navbar from "../../components/navbar/index.jsx";
import ProductShow from "../../components/productShow/product.jsx";
import Total from "../../components/totalCard/total.jsx";
import axios from 'axios';
import {parseJwt} from "../../utils/authService.jsx";

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const token = localStorage.getItem("token")
    const decodeToken = parseJwt(token)
    const userEmail = decodeToken.email;

    // Fetch user cart items from the backend
    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/in/user/cart/get_user_cart_products/${userEmail}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCartItems(response.data.data); // Update cart items with the API data
            console.log(response.data.data)
        } catch (error) {
            console.error("Error fetching cart items:", error);
            setErrorMessage("Failed to load cart items. Please try again later.");
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/in/user/cart/get_user_cart_products/${userEmail}`);
                console.log("Produse obținute de la API:", response.data.data);
                const allCartItems = response.data.data
                setCartItems(response.data.data); // Stocăm toate produsele
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Increment product quantity
    const incrementQuantity = async (productCart) => {
        try {
            console.log(productCart)
            const productCartId = productCart.productCartId
            const quantity = productCart.quantity + 1
            const response = await axios.put(
                `http://localhost:8080/api/in/user/cart/updateProductQuantity/${productCartId}`,
                { quantity: quantity },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            console.log(response)
            await fetchCartItems(); // Refresh the cart
        } catch (error) {
            console.error("Error incrementing quantity:", error);
        }
    };

    // Decrement product quantity
    const decrementQuantity = async (productCart) => {
        try {
            console.log(productCart)
            const productCartId = productCart.productCartId
            const quantity = productCart.quantity - 1
            const response = await axios.put(
                `http://localhost:8080/api/in/user/cart/updateProductQuantity/${productCartId}`,
                { quantity: quantity },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            console.log(response)
            await fetchCartItems(); // Refresh the cart
        } catch (error) {
            console.error("Error incrementing quantity:", error);
        }
    };

    // Delete a product from the cart
    const deleteProduct = async (productCartId) => {
        try {
            await axios.delete(
                `http://localhost:8080/api/in/user/cart/deleteProductFromCart/${productCartId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            await fetchCartItems(); // Refresh the cart
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Calculate total cost dynamically
    const calculateTotalCost = () => {
        const productCost = cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0).toFixed(2);
        const deliveryCost = 5.00; // Fixed delivery cost
        return {
            productCost,
            totalPrice: (parseFloat(productCost)).toFixed(2)
        };
    };

    const { productCost, totalPrice } = calculateTotalCost();

    return (
        <>
            <Navbar />
            <div className="checkout-container">
                <h1 className="checkout-title">Your Cart</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="checkout-items">
                    <div className="checkout-products">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <ProductShow
                                    key={item.productCart}
                                    productCart={item}
                                    name={item.productName}
                                    description={item.descriptions}
                                    price={item.price}
                                    image={item.photoFilePath}
                                    quantity={item.quantity}
                                    onDelete={() => deleteProduct(item.productCartId)}
                                    onIncrement={() => incrementQuantity(item)}
                                    onDecrement={() => decrementQuantity(item)}
                                />
                            ))
                        ) : (
                            <p className="no-items-message">No items in your cart.</p>
                        )}
                    </div>
                    {cartItems.length > 0 && (
                        <div className="total-card">
                            <Total
                                productCost={productCost}
                                totalPrice={totalPrice}
                                page="checkout"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Checkout;
