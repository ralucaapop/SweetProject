import React, { useState, useEffect } from 'react';
import './stylePreorder.css';
import cakeImage from '../../images/cake-image.jpeg';
import cupcakeImage from '../../images/cupcake-image.jpeg';
import cookieImage from '../../images/cookie-image.jpeg';
import sweetsImage from '../../images/sweets-image.jpeg';
import Navbar from "../../components/navbar/index.jsx";
import ProductCard from "../../components/productCard/index.jsx";
import DescriptionCard from "../../components/descriptionCard/index.jsx";
import axios from 'axios';

const Preorder = () => {
    const [currentCategory, setCurrentCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Definirea categoriilor generale și imaginilor asociate
    const categories = [
        { name: 'Cakes', value: 'CAKE', imgSrc: cakeImage },
        { name: 'Cupcakes', value: 'CUPCAKE', imgSrc: cupcakeImage },
        { name: 'Cookies', value: 'COOKIE', imgSrc: cookieImage },
        { name: 'Sweets', value: 'GENERAL', imgSrc: sweetsImage }
    ];

    // Funcția pentru selectarea imaginii potrivite în funcție de categorie
    const getImageForCategory = (category) => {
        switch (category) {
            case "CAKE":
                return cakeImage;
            case "CUPCAKE":
                return cupcakeImage;
            case "COOKIE":
                return cookieImage;
            default:
                return sweetsImage;
        }
    };

    // Obținerea produselor de tip PREORDER de la API (doar cele cu productStatus = ACTIVE)
    useEffect(() => {
        const fetchPreorderProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/in/products/getProducts`);
                console.log("Produse precomandate obținute de la API:", response.data.data);

                // Filtrare pentru produsele de tip PREORDER și productStatus = ACTIVE
                const preorderProducts = response.data.data.filter(product =>
                    product.productType?.trim().toUpperCase() === 'PREORDER' &&
                    product.productStatus?.trim().toUpperCase() === 'ACTIVE'
                );
                console.log("Produse filtrate (PREORDER & ACTIVE):", preorderProducts);
                setProducts(preorderProducts); // Setăm doar produsele filtrate
            } catch (error) {
                console.error('Eroare la preluarea produselor pentru precomandă:', error);
            }
        };
        fetchPreorderProducts();
    }, []);

    // Funcția pentru filtrarea produselor pe baza categoriei selectate
    const filterProductsByCategory = (categoryValue) => {
        return products.filter(product =>
            product.productCategory?.trim().toUpperCase() === categoryValue
        );
    };

    // Când se selectează o categorie generală
    const handleCategoryClick = (categoryValue) => {
        setCurrentCategory(categoryValue);  // Setează categoria curentă
        setSelectedProduct(null);           // Resetează produsul selectat

        const filtered = filterProductsByCategory(categoryValue);
        console.log("Produse filtrate pentru categoria:", categoryValue, filtered);
        setFilteredProducts(filtered); // Actualizăm produsele filtrate
    };

    // Selectarea unui produs specific
    const handleProductClick = (product) => {
        setSelectedProduct(product);   // Setăm produsul selectat
        console.log("Produs selectat:", product);
    };

    return (
        <>
            <Navbar />
            <div className="delivery-notice">
                <p>All products are available for preorder. Please select your items below.</p>
            </div>
            <div className="shop-layout">

                {/* Meniul lateral pentru selectarea categoriilor */}
                {currentCategory && (
                    <div className="shop-sidebar">
                        {categories.map((category, index) => (
                            <div className="shop-item" key={index}>
                                <button className="shop-button" onClick={() => handleCategoryClick(category.value)}>
                                    {category.name}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="shop-main">
                    {/* Afișează grila de categorii generale dacă nu este selectată nicio categorie */}
                    {!currentCategory && (
                        <div className="shop-grid">
                            {categories.map((category, index) => (
                                <div className="shop-item" key={index}>
                                    <button className="shop-button" onClick={() => handleCategoryClick(category.value)}>
                                        <img src={category.imgSrc} alt={category.name} className="shop-image" />
                                        <div className="shop-caption">{category.name}</div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Afișează produsele din categoria selectată */}
                    {currentCategory && !selectedProduct && (
                        <div className="product-grid">
                            {filteredProducts.map((product, index) => (
                                <ProductCard
                                    key={index}
                                    image={product.productImgUrl}
                                    price={product.price}
                                    name={product.name}
                                    ingredients={product.ingredients}
                                    onClick={() => handleProductClick(product)}
                                />
                            ))}
                        </div>
                    )}

                    {/* Mesaj dacă nu există produse în categoria selectată */}
                    {currentCategory && filteredProducts.length === 0 && (
                        <div className="no-products-message-container">
                            <p className="no-products-message">Niciun produs disponibil pentru această categorie.</p>
                        </div>
                    )}

                    {/* Afișează detaliile produsului selectat */}
                    {selectedProduct && (
                        <DescriptionCard
                            image={selectedProduct.productImgUrl}
                            productId={selectedProduct.id}
                            productName={selectedProduct.name}
                            description={selectedProduct.descriptions }
                            ingredients={selectedProduct.ingredients}
                            price={selectedProduct.price}
                            allergy="Contains gluten and dairy"
                            isPreorder={true} // Context specific pentru preorder
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Preorder;
