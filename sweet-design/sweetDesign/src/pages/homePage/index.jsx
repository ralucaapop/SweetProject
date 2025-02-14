/* eslint-disable no-unused-vars */
import React from 'react';
import './styles.css';
import Navbar from '../../components/navbar/index.jsx';
import { useNavigate } from 'react-router-dom';
import h1 from '../../images/h1.jpeg';
import h2 from '../../images/h2.jpeg';
import h3 from '../../images/h3.jpeg';
import h4 from '../../images/h4.jpeg';
import shop from '../../images/shop.jpeg';
import preorder from '../../images/preorder.jpeg';
import {isTokenValid, parseJwt} from "../../utils/authService.jsx";
import c from "../../images/calendar.png";
import animation1 from '../../animations/animation1.json';
import Lottie from "lottie-react";


const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token && isTokenValid(token);
};

const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = parseJwt(token);
        return decodedToken.role;
    }
    return null;
};
const userRole=getUserRole();
const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar/>
            <div className="home-section">
                <h1 className="hero-title">Indulge in the Art of Sweetness</h1>

                <div className="welcome"><p className="hero-text">
                    Welcome to our bakery, where passion meets pastry! We create delightful treats using the finest
                    ingredients and innovative techniques, all while upholding our commitment to quality and
                    sustainability. Savor the love in every bite and celebrate the art of baking with us!
                </p></div>

                <div className="hero-animation">
                    <Lottie animationData={animation1} loop={true}/>
                </div>
            </div>

            <div className="history-section">
                <h2 className="history-title">Our history</h2>
                <div className="history-content">
                    <div className="history-block">
                        <div className="history-image">
                            <img src={h1} alt="Gabriela baking"/>
                        </div>
                        <div className="history-text">
                            <p>
                                Sweet Serenity was founded in 2000 by Gabriela Munteanu, a passionate baker with a
                                vision of creating a haven for dessert lovers in Bucharest. Inspired by her
                                grandmother's traditional recipes and her own desire to innovate, Gabriela opened the
                                bakery in a quaint neighborhood filled with charm and history.
                            </p>
                        </div>
                    </div>
                    <div className="history-block">
                        <div className="history-image">
                            <img src={h2} alt="Cupcakes and treats"/>
                        </div>
                        <div className="history-text">
                            <p>
                                From the very beginning, Sweet Serenity focused on creating a menu that highlighted both
                                classic Romanian pastries and modern delights. Gabriela's signature item, the "Serenity
                                Cake," a rich chocolate layer cake with raspberry filling, quickly became a beloved
                                favorite among locals. The bakery also offered a wide variety of cupcakes, cookies, and
                                seasonal treats, making it a go-to spot for birthdays and celebrations.
                            </p>
                        </div>
                    </div>
                    <div className="history-block">
                        <div className="history-image">
                            <img src={h3} alt="Bakery interior"/>
                        </div>
                        <div className="history-text">
                            <p>
                                As the bakery gained popularity, Gabriela's sister, Maria, joined the team, bringing her
                                expertise in design and decoration. Together, they transformed Sweet Serenity into a
                                visually stunning space filled with beautiful, whimsical decor, where customers could
                                enjoy their sweet treats in a serene atmosphere.
                            </p>
                        </div>
                    </div>
                    <div className="history-block">
                        <div className="history-image">
                            <img src={h4} alt="Bakery atmosphere"/>
                        </div>
                        <div className="history-text">
                            <p>
                                Over the years, Sweet Serenity became more than just a bakery; it evolved into a beloved
                                community hub, where friendships blossomed over shared desserts and laughter. Today, the
                                bakery continues to thrive, with Gabriela and Maria at the helm, dedicated to creating
                                sweet moments for all who visit, ensuring that every treat is a taste of serenity.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero-section">
                <div className="most-wanted-section">
                    <h2 className="wanted-title">Here you can ... </h2>
                    <div className="product-gallery">
                        <div className="product-item" onClick={() => navigate('/shop')}>
                            <img src={shop} alt="Product 1"/>
                            <div className="stars">shop the desired sweets now</div>
                        </div>
                        <div className="product-item" onClick={() => navigate('/command')}>
                            <img src={preorder} alt="Product 2"/>
                            <div className="stars">preorder the products for a specific day in the future</div>
                        </div>
                        <div className="product-item" onClick={() => navigate('/events')}>
                            <img src={c} alt="Product 1"/>
                            <div className="stars">organize your event</div>
                        </div>

                    </div>
                </div>
            </div>


            </>

            );
            };

            export default Home;
