import React, { useState, useEffect } from 'react';
import './styles.css';
import cakeImage from '../../images/cake-image.jpeg';
import cupcakeImage from '../../images/cupcake-image.jpeg';
import cookieImage from '../../images/cookie-image.jpeg';
import sweetsImage from '../../images/sweets-image.jpeg';
import Navbar from "../../components/navbar/index.jsx";
import ProductCard from "../../components/productCard/index.jsx";
import DescriptionCard from "../../components/descriptionCard/index.jsx";
import axios from 'axios';

const Shop = () => {
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

    // Obținerea produselor de la API (filtrate după `productType = STOCK` și `productStatus = ACTIVE`)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/in/products/getProducts`);
                console.log("Produse obținute de la API:", response.data.data);

                // Filtrare pentru produsele de tip STOCK și ACTIVE
                const stockProducts = response.data.data.filter(product =>
                    product.productType?.trim().toUpperCase() === 'STOCK' &&
                    product.productStatus?.trim().toUpperCase() === 'ACTIVE'
                );
                console.log("Produse filtrate (STOCK & ACTIVE):", stockProducts);
                setProducts(stockProducts); // Setăm doar produsele filtrate
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Funcția pentru filtrarea produselor pe baza categoriei selectate
    const filterProductsByCategory = (categoryValue) => {
        return products.filter(product =>
            product.productCategory?.trim().toUpperCase() === categoryValue
        );
    };

    // Când se selectează o categorie generală
    const handleCategoryClick = (categoryValue) => {
        setCurrentCategory(categoryValue);  // Setează categoria selectată
        setSelectedProduct(null);           // Resetează produsul selectat

        // Filtrarea produselor pentru categoria selectată
        const filtered = filterProductsByCategory(categoryValue);
        console.log("Produse filtrate pentru categoria:", categoryValue, filtered);
        setFilteredProducts(filtered); // Actualizăm lista de produse filtrate
    };

    // Selectarea unui produs specific
    const handleProductClick = (product) => {
        setSelectedProduct(product);   // Setează produsul selectat
        console.log("Produs selectat:", product);
    };

    const getImageUrl = (filePath) => {
        console.log(filePath)
        return filePath.startsWith('http')
            ? filePath  // URL extern, îl folosim direct
            : `http://localhost:5173/${filePath}`;  // URL local, adaugă domeniul serveruluitău
    };

    return (
        <>
            <Navbar />
            <div className="delivery-notice">
                <p>All products are delivered within 24 hours. If you'd like a different delivery date, please place a preorder.</p>
            </div>
            <div className="shop-layout">

                {/* Meniul lateral pentru selectarea categoriilor de filtre */}
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
                                    image={getImageUrl(product.productImgUrl)}
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
                            description={selectedProduct.descriptions}
                            ingredients={selectedProduct.ingredients}
                            price={selectedProduct.price}
                            allergy="Contains gluten and dairy"
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Shop;
