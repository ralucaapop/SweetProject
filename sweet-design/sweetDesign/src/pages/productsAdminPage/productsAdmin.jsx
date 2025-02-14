import React, { useState, useEffect } from 'react';
import './styleProductsAdmin.css';
import cakeImage from '../../images/cake-image.jpeg';
import cupcakeImage from '../../images/cupcake-image.jpeg';
import cookieImage from '../../images/cookie-image.jpeg';
import sweetsImage from '../../images/sweets-image.jpeg';
import Navbar from "../../components/navbar/index.jsx";
import ProductCardAdmin from "../../components/productCardAdmin/cardAdmin.jsx";
import AdminDescriptionCard from "../../components/descriptionCardAdmin/descriptionAdmin.jsx";
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isAddingNewProduct, setIsAddingNewProduct] = useState(false);
    const [selectedTab, setSelectedTab] = useState('active');
    const [isLoading, setIsLoading] = useState(true);

    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newType, setNewType] = useState('STOCK');
    const [newCategory, setNewCategory] = useState('GENERAL');
    const [newIngredients, setNewIngredients] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newImageFile, setNewImageFile] = useState(null);
    const [newImagePreview, setNewImagePreview] = useState(null);
    const [newIsArchived, setNewIsArchived] = useState(false);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/in/products/getProducts');
            const allProducts = response.data.data || [];

            setProducts(allProducts);
            setFilteredProducts(
                allProducts.filter(product =>
                    selectedTab === 'active' ? product.productStatus === 'ACTIVE' : product.productStatus === 'ARCHIVE'
                )
            );
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [selectedTab]);

    const handleArchiveProduct = async (productId) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/in/products/archiveProduct/${productId}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                await fetchProducts();
            }
        } catch (error) {
            console.error('Error archiving product:', error);
        }
    };

    const handleActivateProduct = async (productId) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/in/products/activateProduct/${productId}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                await fetchProducts();
            }
        } catch (error) {
            console.error('Error activating product:', error);
        }
    };

    const handleViewArchivedToggle = (isArchivedView) => {
        setSelectedTab(isArchivedView ? 'archived' : 'active');
        setSelectedProduct(null);
        setIsAddingNewProduct(false);
    };

    const handleAddNewProduct = () => {
        setIsAddingNewProduct(true);
        setSelectedProduct(null);
        setSelectedTab('addProduct');
    };

    const handleCancelNewProduct = () => {
        setIsAddingNewProduct(false);
        setSelectedTab('active');

        setNewName('');
        setNewDescription('');
        setNewType('STOCK');
        setNewIngredients('');
        setNewPrice('');
        setNewImageFile(null);
        setNewImagePreview(null);
        setNewIsArchived(false);
    };

    const handleImageChange = (e) => {

        const file = e.target.files[0];
        setNewImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setNewImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSaveNewProduct = async () => {
        const newProduct = {
            name: newName,
            ingredients: newIngredients,
            descriptions: newDescription,
            calories:"432" ,
            price: parseFloat(newPrice),
            productImgFile: newImageFile.file,
            category: newCategory,
            type: newType,
        };
        const token = localStorage.getItem("token")
        try {
            const formData = new FormData();
            formData.append('name', newName);
            formData.append('ingredients', newIngredients);
            formData.append('descriptions', newDescription);
            formData.append('calories', "432");
            formData.append('price', parseFloat(newPrice));
            formData.append('category', newCategory);
            formData.append('type', newType);
            formData.append('productImgFile', newImageFile); // Adăugăm fișierul

            console.log(newName)
            const response = await axios.post(
                'http://localhost:8080/api/in/products/addProduct',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    },
                }
            );

            if (response.status === 200) {
                console.log('New product added successfully:', response.data);
                setIsAddingNewProduct(false);
                setNewName('');
                setNewDescription('');
                setNewType('STOCK');
                setNewIngredients('');
                setNewPrice('');
                setNewImageFile(null);
                setNewImagePreview(null);
                setNewIsArchived(false);
                fetchProducts();
            }
        } catch (error) {
            console.error('Error adding new product:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="active-archive">
                <button
                    className={`archive-button ${selectedTab === 'active' ? 'active' : ''}`}
                    onClick={() => handleViewArchivedToggle(false)}
                >
                    Active Products
                </button>
                <button
                    className={`archive-button ${selectedTab === 'archived' ? 'active' : ''}`}
                    onClick={() => handleViewArchivedToggle(true)}
                >
                    Archived Products
                </button>
                <button
                    className={`add-product-button ${selectedTab === 'addProduct' ? 'active' : ''}`}
                    onClick={handleAddNewProduct}
                >
                    Add New Product
                </button>
            </div>

            {isLoading ? (
                <p>Loading products...</p>
            ) : (
                <div className="admin-layout">
                    {!selectedProduct && !isAddingNewProduct && (
                        <div className="admin-product-grid">
                            {filteredProducts.map((product) => (
                                <ProductCardAdmin
                                    key={product.id}
                                    image={product.productImgUrl || cupcakeImage}
                                    price={product.price}
                                    name={product.name}
                                    ingredients={product.ingredients}
                                    isArchived={product.productStatus === 'ARCHIVE'}
                                    onClick={() => setSelectedProduct(product)}
                                    onToggleStatus={
                                        selectedTab === 'active'
                                            ? () => handleArchiveProduct(product.id)
                                            : () => handleActivateProduct(product.id)
                                    }
                                />
                            ))}
                        </div>
                    )}

                    {selectedProduct && !isAddingNewProduct && (
                        <AdminDescriptionCard
                            productId={selectedProduct.id}
                            image={selectedProduct.productImgUrl}
                            price={selectedProduct.price}
                            name={selectedProduct.name}
                            ingredients={selectedProduct.ingredients}
                            description={selectedProduct.descriptions}
                            type={selectedProduct.type}
                            onDeleteProduct={(id) => {
                                setProducts(products.filter((product) => product.id !== id));
                                setSelectedProduct(null);
                            }}
                        />
                    )}

                    {isAddingNewProduct && (
                        <div className="admin-add-form">
                            <h2>Add a New Product</h2>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                            </label>
                            <label>
                                Description:
                                <textarea
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                />
                            </label>
                            <label>
                                Type (STOCK, PREORDER, MIX):
                                <select
                                    value={newType}
                                    onChange={(e) => setNewType(e.target.value)}
                                >
                                    <option value="STOCK">STOCK</option>
                                    <option value="PREORDER">PREORDER</option>
                                    <option value="MIX">MIX</option>
                                </select>
                            </label>
                            <label>
                                Category (CAKE, COOKIE, CUPCAKE, GENERAL ):
                                <select
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                >
                                    <option value="CAKE">CAKE</option>
                                    <option value="COOKIE">COOKIE</option>
                                    <option value="CUPCAKE">CUPCAKE</option>
                                    <option value="GENERAL">GENERAL</option>
                                </select>
                            </label>
                            <label>
                                Ingredients:
                                <input
                                    type="text"
                                    value={newIngredients}
                                    onChange={(e) => setNewIngredients(e.target.value)}
                                />
                            </label>

                            <label>
                                Pricing:
                                <input
                                    type="text"
                                    value={newPrice}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                />
                            </label>
                            <label>
                                Image:
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                            {newImagePreview && (
                                <div className="image-preview">
                                    <img src={newImagePreview} alt="Preview" width="100"/>
                                </div>
                            )}
                            <label>
                                Status:
                                <select
                                    value={newIsArchived ? 'archived' : 'active'}
                                    onChange={(e) => setNewIsArchived(e.target.value === 'archived')}
                                >
                                    <option value="active">Active</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </label>
                            <div className="admin-add-form-buttons">
                                <button onClick={handleSaveNewProduct}>Save Product</button>
                                <button onClick={handleCancelNewProduct}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Products;
