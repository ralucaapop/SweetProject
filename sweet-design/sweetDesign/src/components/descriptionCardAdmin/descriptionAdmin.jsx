import React, { useState, useEffect } from "react";
import "./styleDescriptionAdmin.css";
import Popup from "../popUp/pop.jsx";
import axios from "axios";

const AdminDescriptionCard = ({
                                  image,
                                  price,
                                  name,
                                  ingredients,
                                  description,
                                  allergy,
                                  productId,
                                  type,
                                  onDeleteProduct,
                              }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const [editedName, setEditedName] = useState(name || "");
    const [editedDescription, setEditedDescription] = useState(description || "");
    const [editedType, setEditedType] = useState(type || "STOCK");
    const [editedIngredients, setEditedIngredients] = useState(ingredients || "");
    const [editedAllergy, setEditedAllergy] = useState(allergy || "");
    const [editedPrice, setEditedPrice] = useState(price || "");

    useEffect(() => {
        setEditedName(name || "");
        setEditedDescription(description || "");
        setEditedType(type || "STOCK");
        setEditedIngredients(ingredients || "");
        setEditedAllergy(allergy || "");
        setEditedPrice(price || "");
    }, [name, description, type, ingredients, allergy, price]);

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    const handleEditProduct = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = async () => {
        if (!productId) {
            setPopupMessage("Product ID is missing.");
            setIsPopupVisible(true);
            return;
        }

        const token = localStorage.getItem("token");
        const payload = {
            name: editedName,
            descriptions: editedDescription,
            category: editedType,
            ingredients: editedIngredients,
            allergyInfo: editedAllergy,
            price: editedPrice,
            productImgUrl: image,
        };

        console.log("Token:", token);
        console.log("Payload:", payload);
        console.log("URL:", `http://localhost:8080/api/in/products/updateProduct/${productId}`);

        try {
            const response = await axios.post(
                `http://localhost:8080/api/in/products/updateProduct/${productId}`,
                {
                    name: editedName,
                    descriptions: editedDescription,
                    category: editedType,
                    ingredients: editedIngredients,
                    allergyInfo: editedAllergy,
                    price: editedPrice,
                    productImgUrl: image,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Response:", response);

            if (response.status === 200) {
                setPopupMessage("Product updated successfully!");
                setIsPopupVisible(true);
                setIsEditing(false);
            } else {
                setPopupMessage("Unexpected server response.");
                setIsPopupVisible(true);
            }
        } catch (error) {
            console.error("Error updating product:", error);
            setPopupMessage("Failed to update product.");
            setIsPopupVisible(true);
        }
    };

    const handleCancelEdit = () => {
        setEditedName(name || "");
        setEditedDescription(description || "");
        setEditedType(type || "STOCK");
        setEditedIngredients(ingredients || "");
        setEditedPrice(price || "");
        setIsEditing(false);
    };

    const handleDeleteProduct = async () => {
        const token = localStorage.getItem("token");

        console.log("Token for delete:", token);
        console.log("URL for delete:", `http://localhost:8080/api/in/products/deleteProduct/${productId}`);

        try {
            const response = await axios.delete(
                `http://localhost:8080/api/in/products/deleteProduct/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Delete Response:", response);
            console.log(response.status);
            if (response.status === 200) {
                setPopupMessage("Product deleted successfully!");
                setIsPopupVisible(true);
                if (onDeleteProduct) onDeleteProduct(productId);
            }
            else {
                setPopupMessage("Unexpected server response.");
                setIsPopupVisible(true);
            }
        } catch (error) {
        if(error.status === 400){
                setPopupMessage("This products can't be deleted");
                setIsPopupVisible(true);
            }
        else {
            console.error("Error deleting product:", error.status);
            setPopupMessage("Failed to delete product.");

            setIsPopupVisible(true);
        }
        }
    };

    return (
        <div className="admin-description-card-container">
            <div className="admin-description-card-image-background">
                <img
                    src={image || "defaultImage.jpeg"}
                    alt={editedName || "Product"}
                    className="admin-description-card-product-image"
                />
                {!isEditing && (
                    <>
                        <button
                            className="admin-description-card-edit-btn"
                            onClick={handleEditProduct}
                        >
                            Edit Product
                        </button>
                        <button
                            className="admin-description-card-delete-btn"
                            onClick={handleDeleteProduct}
                        >
                            Delete Product
                        </button>
                    </>
                )}
            </div>
            <div className="admin-description-card-details-section">
                {!isEditing ? (
                    <>
                        <h2>{editedName}</h2>
                        <p>{editedDescription || "No description available."}</p>
                        <h4>Type:</h4>
                        <p>{editedType || "No type specified."}</p>
                        <h4>Ingredients:</h4>
                        <p>{editedIngredients || "No ingredients listed."}</p>
                        <h4>Pricing: {editedPrice || "N/A"}</h4>
                    </>
                ) : (
                    <div className="admin-edit-form">
                        <h2>Edit Product</h2>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                            />
                        </label>
                        <label>
                            Type (STOCK, PREORDER, MIX):
                            <select
                                value={editedType}
                                onChange={(e) => setEditedType(e.target.value)}
                            >
                                <option value="STOCK">STOCK</option>
                                <option value="PREORDER">PREORDER</option>
                                <option value="MIX">MIX</option>
                            </select>
                        </label>
                        <label>
                            Ingredients:
                            <input
                                type="text"
                                value={editedIngredients}
                                onChange={(e) => setEditedIngredients(e.target.value)}
                            />
                        </label>
                        <label>
                            Pricing:
                            <input
                                type="text"
                                value={editedPrice}
                                onChange={(e) => setEditedPrice(e.target.value)}
                            />
                        </label>
                        <div className="admin-edit-form-buttons">
                            <button onClick={handleSaveChanges}>Save Changes</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
            <Popup isVisible={isPopupVisible} onClose={handleClosePopup} message={popupMessage} />
        </div>
    );
};

export default AdminDescriptionCard;
