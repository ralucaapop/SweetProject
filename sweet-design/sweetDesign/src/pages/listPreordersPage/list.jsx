import React, { useState, useEffect } from "react";
import "./styleList.css";
import Navbar from "../../components/navbar/index.jsx";
import ProductShow from "../../components/productShow/product.jsx";
import Total from "../../components/totalCard/total.jsx";
import axios from "axios";
import { parseJwt } from "../../utils/authService.jsx";

const List = () => {
    const [preorderItems, setPreorderItems] = useState([]); // Lista precomenzilor
    const [errorMessage, setErrorMessage] = useState(""); // Mesaj de eroare

    const token = localStorage.getItem("token");
    const decodeToken = parseJwt(token);
    const userEmail = decodeToken.email;

    // Funcție pentru a obține produsele utilizatorului din backend
    const fetchPreorderItems = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/in/user/preorder_item/get_user_preorder_products/${userEmail}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Normalizează și mapează datele din API
            const correctedItems = response.data.data.map((item) => ({
                ...item,
                quantity: item.quantity || 0, // Normalizează câmpul quantity
                productPreorderId: item.productCartId || null, // Folosim productCartId ca fallback
            }));

            console.log("Fetched Preorder Items:", correctedItems);
            setPreorderItems(correctedItems); // Actualizează lista cu produsele precomandate
        } catch (error) {
            console.error("Error fetching preorder items:", error);
            setErrorMessage("Failed to load preorder items. Please try again later.");
        }
    };

    useEffect(() => {
        fetchPreorderItems();
    }, []);

    // Funcția pentru a crește cantitatea unui produs
    const incrementQuantity = async (preorderItem) => {
        try {
            const productCartId = preorderItem.productPreorderId; // Folosim productPreorderId
            const quantity = preorderItem.quantity + 1;

            if (!productCartId) {
                console.error("Error: Missing productPreorderId in preorder item:", preorderItem);
                return;
            }

            const payload = {
                productId: preorderItem.productId,
                quantity: quantity,
                userEmail: userEmail,
                observations: preorderItem.observations || "",
            };

            console.log("Payload for increment:", payload);

            await axios.put(
                `http://localhost:8080/api/in/user/preorder_item/updateProductQuantity/${productCartId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await fetchPreorderItems(); // Reîncarcă lista după actualizare
        } catch (error) {
            console.error("Error incrementing quantity:", error.response || error.message);
        }
    };

    // Funcția pentru a scădea cantitatea unui produs
    const decrementQuantity = async (preorderItem) => {
        try {
            const productCartId = preorderItem.productPreorderId; // Folosim productPreorderId
            const quantity = preorderItem.quantity - 1;

            if (!productCartId) {
                console.error("Error: Missing productPreorderId in preorder item:", preorderItem);
                return;
            }

            if (quantity > 0) {
                const payload = {
                    productId: preorderItem.productId,
                    quantity: quantity,
                    userEmail: userEmail,
                    observations: preorderItem.observations || "",
                };

                console.log("Payload for decrement:", payload);

                await axios.put(
                    `http://localhost:8080/api/in/user/preorder_item/updateProductQuantity/${productCartId}`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                await fetchPreorderItems(); // Reîncarcă lista după actualizare
            }
        } catch (error) {
            console.error("Error decrementing quantity:", error.response || error.message);
        }
    };

    // Funcția pentru a șterge un produs din lista de precomenzi
    const deletePreorderProduct = async (preorderItemId) => {
        try {
            if (!preorderItemId) {
                console.error("Error: Missing preorderItemId");
                return;
            }

            console.log(`Attempting to delete preorder item with ID: ${preorderItemId}`);
            await axios.delete(
                `http://localhost:8080/api/in/user/preorder_item/deleteProductFromPreorderList/${preorderItemId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            console.log("Preorder item deleted successfully");
            await fetchPreorderItems(); // Reîncarcă lista după ștergere
        } catch (error) {
            console.error("Error deleting preorder product:", error);
        }
    };

    // Calcularea costului total
    const calculateTotalCost = () => {
        const productCost = preorderItems.reduce((total, item) => {
            const itemTotal = (item.price || 0) * (item.quantity || 0);
            return total + itemTotal;
        }, 0).toFixed(2);

        const deliveryCost = 10.0;
        return {
            productCost,
            totalPrice: (parseFloat(productCost) + deliveryCost).toFixed(2),
        };
    };

    const { productCost, totalPrice } = calculateTotalCost();

    return (
        <>
            <Navbar />
            <div className="list-container">
                <h1 className="list-title">Your Preorders</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="list-items">
                    <div className="list-products">
                        {preorderItems.length > 0 ? (
                            preorderItems.map((item) => (
                                <ProductShow
                                    key={item.productPreorderId || item.productCartId} // Folosim cheia existentă
                                    productCart={item}
                                    name={item.productName}
                                    description={item.description || "No description available"}
                                    price={item.price}
                                    image={item.photoFilePath}
                                    quantity={item.quantity}
                                    onDelete={() => deletePreorderProduct(item.productPreorderId || item.productCartId)}
                                    onIncrement={() => incrementQuantity(item)}
                                    onDecrement={() => decrementQuantity(item)}
                                />
                            ))
                        ) : (
                            <p className="no-items-message">No items in your preorder list.</p>
                        )}
                    </div>
                    {preorderItems.length > 0 && (
                        <div className="list-total">
                            <Total
                                productCost={productCost}
                                totalPrice={totalPrice}
                                page="list"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default List;
