import React, {useEffect, useState} from 'react';
import './styleFavourites.css';
import Navbar from "../../components/navbar/index.jsx";
import ProductShow from "../../components/productShow/product.jsx";
import cake from "../../images/cake-image.jpeg";
import Total from "../../components/totalCard/total.jsx";
import {parseJwt} from "../../utils/authService.jsx";
import axios from "axios";

const Favourites = () => {

    const [favItems, setFavItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const token = localStorage.getItem("token")
    const decodeToken = parseJwt(token)
    const userEmail = decodeToken.email;

    // Fetch user cart items from the backend
    const fetchFavItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/in/user/favourite/getAllUserFavourite/${userEmail}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFavItems(response.data.data); // Update cart items with the API data
            console.log(response.data.data)
        } catch (error) {
            console.error("Error fetching fav items:", error);
            setErrorMessage("Failed to load cart items. Please try again later.");
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/in/user/favourite/getAllUserFavourite/${userEmail}`);
                console.log("Produse obținute de la API:", response.data.data);
                setFavItems(response.data.data); // Stocăm toate produsele
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Increment product quantity
    const incrementQuantity = async (productFav) => {
        try {
            console.log(productFav)
            const productFavId = productFav.productFavouriteId
            const quantity = productFav.quantity + 1
            const response = await axios.put(
                `http://localhost:8080/api/in/user/favourite/updateProductQuantity/${productFavId}`,
                { quantity: quantity },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            console.log(response)
            await fetchFavItems(); // Refresh the cart
        } catch (error) {
            console.error("Error incrementing quantity:", error);
        }
    };

    // Decrement product quantity
    const decrementQuantity = async (productFav) => {
        try {
            console.log(productFav)
            const productFavId = productFav.productFavouriteId
            const quantity = productFav.quantity - 1
            const response = await axios.put(
                `http://localhost:8080/api/in/user/favourite/updateProductQuantity/${productFavId}`,
                { quantity: quantity },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            console.log(response)
            await fetchFavItems();
        } catch (error) {
            console.error("Error incrementing quantity:", error);
        }
    };

    // Delete a product from the cart
    const deleteProduct = async (productFavId) => {
        try {
            await axios.delete(
                `http://localhost:8080/api/in/user/favourite/deleteProductFromFavourite/${productFavId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            await fetchFavItems(); // Refresh the cart
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Calculate total cost dynamically
    const calculateTotalCost = () => {
        const productCost = favItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0).toFixed(2);
        const deliveryCost = 5.00; // Fixed delivery cost
        return {
            productCost,
            totalPrice: (parseFloat(productCost) + deliveryCost).toFixed(2)
        };
    };

    const { productCost, totalPrice } = calculateTotalCost();

    return (
        <>
            <Navbar/>
            <div className="favourites-container">
                <h1 className="favourites-title">Your favourites</h1>
                <div className="favourites-items">
                    <div className="favourites-products">
                        {favItems.length > 0 ? (
                            favItems.map((item) => (
                                <ProductShow
                                    key={item.productCart}
                                    productCart={item}
                                    name={item.productName}
                                    description={item.description}
                                    price={item.price}
                                    image={item.photoFilePath}
                                    quantity={item.quantity}
                                    onDelete={() => deleteProduct(item.productFavouriteId)}
                                    onIncrement={() => incrementQuantity(item)}
                                    onDecrement={() => decrementQuantity(item)}
                                />
                            ))
                        ) : (
                            <p className="no-items-message">No items in your favourite list.</p>
                        )}
                    </div>
                    {favItems.length > 0 && (
                        <div className="list-total">
                            <Total
                                productCost={`$${productCost}`}
                                totalPrice={`$${totalPrice}`}
                                page="favourites"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Favourites;
