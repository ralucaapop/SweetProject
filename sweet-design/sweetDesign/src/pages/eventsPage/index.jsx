import React, { useState } from 'react';
import './styleEvents.css';
import wed from '../../images/wedding.jpeg';
import wed1 from '../../images/wed1.jpeg';
import wed2 from '../../images/wed2.jpeg';
import wed3 from '../../images/wed3.jpeg';
import wed4 from '../../images/wed4.jpeg';
import wed5 from '../../images/wed5.jpeg';

import birth1 from '../../images/birth1.jpeg';
import birth2 from '../../images/birth2.jpeg';
import birth3 from '../../images/birth3.jpeg';

import bapt1 from '../../images/bapt1.jpeg';
import bapt2 from '../../images/bapt2.jpeg';

import rec1 from '../../images/rec1.jpeg';
import rec2 from '../../images/rec2.jpeg';
import rec3 from '../../images/rec3.jpeg';

import birth from '../../images/birthday.jpeg';
import bapt from '../../images/baptizing.jpeg';
import rec from '../../images/reception.jpeg';

import pr1 from '../../images/pr1.jpeg';
import pr2 from '../../images/pr2.jpeg';
import pr3 from '../../images/pr3.jpeg';
import pr4 from '../../images/pr4.jpeg';
import pr5 from '../../images/pr5.jpeg';
import pr6 from '../../images/pr6.jpeg';
import pr7 from '../../images/pr7.jpeg';
import pr8 from '../../images/pr8.jpeg';



import Navbar from "../../components/navbar/index.jsx";
import ProductCard from "../../components/productCard/index.jsx";
import DescriptionCard from "../../components/descriptionCard/index.jsx";
import axios from "axios";

const eventProducts = {
    wedding: [
        { name: 'Biscuits Cupcake', imgSrc: pr1, price: '$300', ingredients: 'Flour, Sugar, Butter', description: 'Elegant wedding cake with custom designs' },
        { name: 'Chocolate strawberries', imgSrc: pr3, price: '$150', ingredients: 'Chocolate, Vanilla, Frosting', description: 'An assortment of cupcakes for wedding guests' },
    ],
    birthday: [
        { name: 'Kinder Bueno', imgSrc: pr8, price: '$50', ingredients: 'Sugar, Eggs, Milk', description: 'Customizable birthday cake for all ages' },
        { name: 'Hazelnut Cupcakes', imgSrc: pr6, price: '$25', ingredients: 'Candy, Toys', description: 'Special gift bags for party guests' },
    ],
    baptizing: [
        { name: 'Fruit Cupcake', imgSrc: pr7, price: '$80', ingredients: 'Buttercream, Eggs', description: 'Simple and elegant cake for baptisms' },
        { name: 'Cookies', imgSrc: pr2, price: '$20', ingredients: 'Butter, Sugar', description: 'Decorative cookies for guests' },
    ],
    reception: [
        { name: 'Reception Platter', imgSrc: pr4, price: '$200', ingredients: 'Cheese, Crackers, Fruits', description: 'A selection of platters for receptions' },
        { name: 'Mini Macaroons', imgSrc: pr5, price: '$60', ingredients: 'Various desserts', description: 'An assortment of mini desserts for receptions' },
    ]
};

const eventGalleries = {
    wedding: [
        {
            imgSrc: wed1,
            text: "Indulge your guests in a delightful wedding candy bar that celebrates the vibrant flavors of fresh strawberries. Our centerpiece features fluffy strawberry cupcakes crowned with a swirl of rich hazelnut cream, complemented by syrupy strawberries for an extra burst of fruity sweetness. Light whipped topping provides the perfect balance to the nutty notes of hazelnut, creating an irresistibly smooth and flavorful experience. Bright, decadent, and brimming with berry goodness, this strawberry-inspired treat station is sure to enchant everyone who takes a bite."
        },
        {
            imgSrc: wed2,
            text: "Delight your guests with a romantic candy bar featuring the delicate charm of white and soft pink marzipan roses. Airy cupcakes crowned with these floral accents steal the show, while a sweet biscuit base adds a delightfully crunchy contrast. The subtle sweetness of marzipan blossoms pairs beautifully with each frosted treat, creating a pastel-inspired display that embodies love and refinement. Give your wedding an elegant touch with this enchanting dessert station, sure to leave a lasting impression on all who indulge."
        },
        {
            imgSrc: wed3,
            text: "Elevate your wedding celebration with an elegant candy bar that embodies the purity and charm of white. Delicate confections, adorned with intricate white details, take center stage—fluffy meringues, snow-kissed cupcakes, and shimmering sugar pearls creating a harmonious palette of sweetness. Each treat is a celebration of love, artfully crafted to complement the timeless elegance of your special day. A symphony of soft textures and refined flavors awaits your guests, ensuring unforgettable moments with every indulgent bite."
        },
        {
            imgSrc: wed4,
            text: "Add a burst of vibrant flavor to your wedding with a fruit-inspired candy bar that celebrates the beauty of nature's sweetness. Juicy strawberries, plump blueberries, tart raspberries, and a medley of forest berries take the spotlight, creating a colorful and refreshing display. Fluffy cupcakes, topped with fresh fruit and creamy swirls, perfectly complement the berry theme, offering a delightful balance of sweetness and tanginess. This fruit-filled dessert station brings a touch of freshness and elegance, ensuring your guests savor every joyful bite."
        },
        {
            imgSrc: wed5,
            text: "Indulge your guests with a heavenly white-themed candy bar, where elegance meets sweetness in every detail. A delightful array of fluffy donuts, glazed to perfection in shades of white, pairs beautifully with an assortment of creamy white beverages. From velvety white chocolate drinks to refreshing vanilla milkshakes, each sip complements the light and airy confections. This sophisticated dessert station, adorned with delicate white accents, creates a timeless and enchanting atmosphere that will leave your guests savoring every blissful moment."
        }
    ],
    birthday: [
        {
            imgSrc: birth1,
            text: "Celebrate in style with a candy bar bursting with charm and flavor, perfect for a memorable birthday! Delicate macaroons in a rainbow of pastel hues take center stage, offering a light, melt-in-your-mouth treat. Syrupy donuts bring a decadent touch, while sandwich-style pastries layered with creamy fillings add a playful twist. Completing the spread are exquisite cupcakes adorned with frosting shaped like blooming flowers, combining artistry and sweetness. This whimsical dessert station is a feast for the eyes and the palate, ensuring your special day is as sweet as can be."
        },
        {
            imgSrc: birth2,
            text: "Make your birthday celebration unforgettable with a candy bar that exudes elegance and sweetness. Syrupy strawberries glisten as the star of the show, adding a burst of fruity indulgence to every bite. Delicate fruit tarts, filled with creamy custard and topped with vibrant berries, bring a fresh and colorful touch. Petite, perfectly crafted macarons complete the spread, offering a light, sophisticated treat in every tiny bite. This delightful dessert station is a harmonious blend of flavor and style, ensuring your special day is both beautiful and delicious."
        },
        {
            imgSrc: birth3,
            text: "Celebrate your special day with a candy bar bursting with vibrant flavors and irresistible charm. Decadent tarts take the spotlight, each adorned with indulgent toppings like syrupy strawberries, rich hazelnut cream, and velvety Kinder Bueno. For a fruity twist, tangy raspberry tarts and tropical mango creations add a refreshing burst of color and sweetness. Delicately crafted with creamy mango filling and fresh mango slices, these tropical delights bring a unique elegance to the table. This carefully curated dessert station promises a memorable feast of flavors, perfect for making your birthday celebration truly extraordinary."
        }
    ],
    baptizing: [
        {
            imgSrc: bapt1,
            text: "Celebrate the joyous occasion of your baby girl's christening with a candy bar as sweet and charming as she is. Awash in shades of soft pink, this delightful spread features elegant pastries personalized with her name, adding a heartfelt touch to the celebration. Delicate macarons in pastel pink bring a touch of sophistication, while fluffy cupcakes adorned with frosting roses create a beautiful, floral-inspired centerpiece. Every treat is crafted with love and care, making this candy bar a stunning and delicious tribute to a truly special day."
        },
        {
            imgSrc: bapt2,
            text: "Celebrate the joyous christening of your baby boy with a candy bar that’s as delightful as it is charming. Featuring a palette of soft blues, this sweet display includes whimsical blue lollipops and adorable bear-shaped pastries that are sure to bring smiles to all. Each treat is thoughtfully crafted to reflect the innocence and joy of this special occasion, creating a magical atmosphere for your guests. Sweet, playful, and utterly enchanting, this candy bar is a perfect way to celebrate your little one’s big day."
        }
    ],
    reception: [
        {
            imgSrc: rec1,
            text: "Elevate your office reception with a sophisticated candy bar designed to impress and indulge. Rich, velvety nut cream served in elegant glasses sets the tone, while chocolate pastries and cocoa cupcakes add a decadent touch to the spread. Perfectly balanced with the crunch of hazelnuts and walnuts, these indulgent treats bring warmth and energy to the occasion. Whether networking or celebrating, this dessert station offers a delightful escape into the world of chocolate and nuts, leaving a lasting impression on all your guests."
        },
        {
            imgSrc: rec2,
            text: "Add a touch of elegance to your office reception with a candy bar that harmoniously blends richness and freshness. Decadent cocoa-infused creations set the stage, complemented by vibrant fruit tarts that bring a burst of color and natural sweetness. Delicate éclairs, filled with velvety creams and glazed to perfection, add a refined touch to the spread. This dessert station combines sophistication and flavor, ensuring your guests enjoy a delightful moment of indulgence during the event."
        },
        {
            imgSrc: rec3,
            text: "Bring a touch of indulgence to your office reception with a candy bar that exudes warmth and charm. Syrupy donuts, perfectly golden and irresistibly sweet, take center stage alongside dainty mini éclairs filled with rich, velvety creams. This delightful combination of classic flavors and bite-sized treats offers a satisfying balance of texture and taste, ensuring every guest finds something to enjoy. Sophisticated yet approachable, this dessert station is the perfect way to sweeten connections and brighten the occasion."
        }
    ]
};

const Events = () => {
    const [currentEvent, setCurrentEvent] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAvailableProducts, setShowAvailableProducts] = useState(false);
    const [allProducts, setAllProducts] = useState([]);


    const events = [
        { name: 'Wedding', value: 'wedding', imgSrc: wed },
        { name: 'Birthday Party', value: 'birthday', imgSrc: birth },
        { name: 'Baptizing', value: 'baptizing', imgSrc: bapt },
        { name: 'Reception', value: 'reception', imgSrc: rec }
    ];

    const handleEventClick = (eventValue) => {
        setCurrentEvent(eventValue);
        setSelectedProduct(null);
        setShowAvailableProducts(false);
    };
    const handleAvailableProductsClick = () => {
        setShowAvailableProducts(true);
        setSelectedProduct(null);
        setCurrentEvent(null);
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setShowAvailableProducts(false);
        setCurrentEvent(null);
    };

    if (selectedProduct) {
        return (
            <>
                <Navbar />
                <div style={{ textAlign: 'left', margin: '20px' }}>
                    <button
                        className="event-button available-products-button"
                        onClick={() => {
                            setSelectedProduct(null);
                            setShowAvailableProducts(true);
                        }}
                    >
                        Back to available products
                    </button>
                </div>
                <DescriptionCard
                    image={selectedProduct.productImgUrl}
                    productName={selectedProduct.name}
                    description={selectedProduct.descriptions}
                    ingredients={selectedProduct.ingredients}
                    price={selectedProduct.price}
                    isFavourite={true}
                    productId={selectedProduct.id}
                    allergy="Contains gluten and dairy"
                />
            </>
        );
    }

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/in/products/getProducts');
            const allProducts1 = response.data.data || [];
            setAllProducts(allProducts1.filter(product => product.productStatus === 'ACTIVE'));
            console.log(response.data.data)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    if (showAvailableProducts) {
        //const allProducts = Object.values(eventProducts).flat();
        fetchProducts()
        return (
            <>
                <Navbar />
                <div style={{ textAlign: 'left', margin: '20px' }}>
                    <button
                        className="event-button available-products-button"
                        onClick={() => {
                            setShowAvailableProducts(false);
                            setCurrentEvent(null);
                            setSelectedProduct(null);
                        }}
                    >
                        Back to categories
                    </button>
                </div>

                <div className="events-layout">
                    <div className="events-main">
                        <div className="product-grid">
                            {allProducts.map((product, index) => (
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
                    </div>
                </div>
            </>
        );
    }


    if (currentEvent) {
        return (
            <>
                <Navbar />
                <div className="events-layout">
                    <div className="events-sidebar">
                        {events.map((event, index) => (
                            <div className="event-item" key={index}>
                                <button
                                    className="event-button"
                                    onClick={() => handleEventClick(event.value)}
                                >
                                    {event.name}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="events-main">
                        <div className="gallery-list">
                            {eventGalleries[currentEvent]?.map((photo, index) => (
                                <div className="gallery-row" key={index}>
                                    <div className="image-container">
                                        <img
                                            src={photo.imgSrc}
                                            alt={`Gallery ${currentEvent} ${index}`}
                                            className="gallery-image-left"
                                        />
                                    </div>
                                    <div className="text-container">
                                        <p className="text-larger-centered">{photo.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="events-layout">
                <div className="events-main">
                    <div className="categories-and-button">
                        <div className="available-products-container">
                            <button
                                className="event-button available-products-button"
                                onClick={handleAvailableProductsClick}
                            >
                                Available Products
                            </button>
                        </div>
                        <div className="events-grid">
                            {events.map((event, index) => (
                                <div className="event-item" key={index}>
                                    <button
                                        className="event-button"
                                        onClick={() => handleEventClick(event.value)}
                                    >
                                        <img src={event.imgSrc} alt={event.name} className="event-image"/>
                                        <div className="event-caption">{event.name}</div>
                                    </button>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
};

export default Events;