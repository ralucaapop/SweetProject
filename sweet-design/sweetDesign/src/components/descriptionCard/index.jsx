import React, { useState } from "react";
import "./styleDescription.css";
import Popup from "../popUp/pop.jsx";
import axios from "axios";
import { parseJwt } from "../../utils/authService.jsx";
import { useLocation } from "react-router-dom";

const DescriptionCard = ({
                             image,
                             price,
                             name,
                             ingredients,
                             description,
                             allergy,
                             productId,
                             isPreorder,
                            isFavourite
                         }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const location = useLocation(); // Detectează pagina curentă

    const addToCart = async () => {
        const token = localStorage.getItem("token");
        const decodeToken = parseJwt(token);
        const userEmail = decodeToken.email;

        try {
            const response = await axios.post(
                "http://localhost:8080/api/in/user/cart/addProductToCart",
                {
                    productId: productId,
                    quantity: 1,
                    userEmail: userEmail,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            console.log("Response:", response.data);
            if (response.status === 200) setPopupMessage("Product added to cart successfully!");
        } catch (error) {
            setPopupMessage("Failed to add product to cart. Please try again.");
        }

        setIsPopupVisible(true);
    };

    const addToPreorder = async () => {
        const token = localStorage.getItem("token");
        const decodeToken = parseJwt(token);
        const userEmail = decodeToken.email;

        try {
            const response = await axios.post(
                "http://localhost:8080/api/in/user/preorder_item/add_item_to_preorder_list",
                {
                    productId: productId,
                    quantity: 1,
                    userEmail: userEmail,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            console.log("Response:", response.data);
            if (response.status === 200) setPopupMessage("Product added to preorder successfully!");
        } catch (error) {
            setPopupMessage("Failed to add product to preorder. Please try again.");
        }

        setIsPopupVisible(true);
    };

    const addToFavourite = async ()=>{
        const token = localStorage.getItem("token");
        const decodeToken = parseJwt(token);
        const userEmail = decodeToken.email;

        try {
            const response = await axios.post(
                "http://localhost:8080/api/in/user/favourite/addNewProductToFavourite",
                {
                    productId: productId,
                    quantity: 1,
                    userEmail: userEmail,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            console.log("Response:", response.data);
            if (response.status === 200) setPopupMessage("Product added to favourite successfully!");
        } catch (error) {
            setPopupMessage("Failed to add product to favourite. Please try again.");
        }
        setIsPopupVisible(true);

    }

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <div className="description-card-container">
            <div className="description-card-image-background">
                <img src={image} alt={name} className="description-card-product-image" />
                <button
                    className="description-card-add-to-cart-btn"
                    onClick = {isFavourite ? addToFavourite : isPreorder ? addToPreorder : addToCart}
                >
                    {isFavourite
                        ? "Add to favourites"
                        : isPreorder
                            ? "Add to preorder"
                            : "Add to cart"}
                </button>
            </div>
            <div className="description-card-details-section">
                <h2>{name}</h2>
                <p>{description || "No description available."}</p>
                <h4>Ingredients:</h4>
                <p>{ingredients || "No ingredients listed."}</p>
                <h4>Allergy Information:</h4>
                <p>{allergy || "No allergy information available."}</p>
                <h4>Pricing: {price || "N/A"}</h4>
            </div>
            <Popup isVisible={isPopupVisible} onClose={handleClosePopup} message={popupMessage} />
        </div>
    );
};

export default DescriptionCard;
