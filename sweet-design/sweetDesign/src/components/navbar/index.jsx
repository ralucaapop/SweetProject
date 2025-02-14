import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styleNavbar.css';
import { isTokenValid, parseJwt } from "../../utils/authService.jsx";
import cartImage from "../../images/cart.png";
import notificationImage from "../../images/bell.png";
import listIcon from "../../images/commandList.png";
import fav from "../../images/favourites.png";
import profile from "../../images/profile.png";
import animation2 from "../../animations/animation2.json";
import Lottie from "lottie-react";

const Navbar = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && isTokenValid(token)) {
            const decodedToken = parseJwt(token);
            setUserRole(decodedToken.role);
        }
    }, []);

    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <nav className="navbar">
            <div className="navbar-bottom">

                <div className="logo-animation-container">
                    <Lottie animationData={animation2} loop={true} className="navbar-animation"/>
                </div>
                <div className="logo">Sweet Serenity</div>
                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                {(userRole === "CUSTOMER" || !userRole) && (
                    <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
                        <li className="nav-item active"><a href="/">Home</a></li>
                        <li className="nav-item"><a href="/shop">Shop</a></li>
                        <li className="nav-item"><a href="/command">Preorders</a></li>
                        <li className="nav-item"><a href="/services">Services</a></li>
                    </ul>
                )}

                {userRole === "ADMIN" && (
                    <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
                        <li className="nav-item active"><a href="/ordersAdmin">Orders</a></li>
                        <li className="nav-item"><a href="/preordersAdmin">Preorders</a></li>
                        <li className="nav-item"><a href="/productsAdmin">Products</a></li>
                        <li className="nav-item"><a href="/stockProducts">Stock products</a></li>
                    </ul>
                )}

                <div className="user-actions">
                    {!userRole && (
                        <>
                            <button className="sign-in" onClick={() => navigate('/signin')}>
                                Sign in
                            </button>
                            <button className="register" onClick={() => navigate('/register')}>
                                Register
                            </button>
                        </>
                    )}

                    {userRole === "CUSTOMER" && (
                        <>
                            <button className="favourites" onClick={() => navigate('/favourites')}>
                                <img src={fav} alt="fav"/>
                            </button>

                            <button className="command-list" onClick={() => navigate('/list')}>
                                <img src={listIcon} alt="list"/>
                            </button>

                            <button className="cart-notification" onClick={() => navigate('/cart')}>
                                <img src={cartImage} alt="Cart"/>
                            </button>

                            <button className="profile" onClick={() => navigate('/profile')}>
                                <img src={profile} alt="Profile"/>
                            </button>
                        </>
                    )}
                    {userRole === "ADMIN" && (
                        <>
                            <button className="admin-tastings" onClick={() => navigate('/tastingsAdmin')}>
                                <img src={notificationImage} alt="Tastings Admin"/>
                            </button>
                            <button className="sign-in" onClick={handleLogout}>
                                Log out
                            </button>
                        </>
                )}
                </div>
            </div>
        </nav>
    );

};

export default Navbar;
