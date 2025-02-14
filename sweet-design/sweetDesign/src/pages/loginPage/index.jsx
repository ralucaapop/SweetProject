import React, { useState } from 'react';
import './st.css';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from "../../utils/authService.jsx";
import axios from "axios";

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [view, setView] = useState('sign-in');

    // Funcția de autentificare
    const handleLogIn = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email: email,
                password: password
            });
            console.log(response);

            if (response.status === 200) {
                localStorage.setItem('token', response.data.data.token);
                const decodedToken = parseJwt(response.data.data.token);
                const role = decodedToken.role;

                if (role === "ADMIN") {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error("Error during login:", error);

            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else if (error.response) {
                setErrorMessage('An error occurred: ' + error.response.statusText);
            } else {
                setErrorMessage('Network error. Please check your connection and try again.');
            }
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/forgot-password/send-verification-code', {
                email: resetEmail,
            });
            console.log(response);

            if (response.status === 200) {
                setResetMessage('A reset code has been sent to your email.');
                setView('reset-code');
            }
        } catch (error) {
            console.error("Error during password reset:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Network error. Please check your connection and try again.');
            }
        }
    };

    const handleResetCodeSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/ver-code', {
                email: resetEmail,
                newPassword: newPassword,
                code: resetCode
            });
            console.log(response);

            if (response.status === 200) {
                setSuccessMessage("Your password has been successfully reset. Please log in.");
                setView('sign-in');
            }
        } catch (error) {
            console.error("Error during password reset code verification:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Network error. Please check your connection and try again.');
            }
        }
    };

    return (
        <div className="sign-in-container">
            {view === 'sign-in' && (
                <div className="sign-in-box">
                    <h2 className="sign-in-header">Sign in</h2>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <form className="sign-in-form" onSubmit={handleLogIn}>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="link-container">
                            <p className="create" onClick={() => navigate('/register')}>
                                I don't have an account.
                            </p>
                            <p
                                className="forgot-password-link"
                                onClick={() => setView('forgot-password')}
                            >
                                I forgot my password.
                            </p>
                        </div>
                        <button type="submit" className="sign-in-button">Sign in</button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            )}
            {view === 'forgot-password' && (
                <div className="reset-password-box">
                    <h2 className="reset-password-header">Reset Password</h2>
                    <form className="reset-password-form" onSubmit={handlePasswordReset}>
                        <div>
                            <label htmlFor="reset-email">Email:</label>
                            <input
                                type="email"
                                id="reset-email"
                                placeholder="Enter your email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="reset-password-button">
                            Send Reset Code
                        </button>
                        {resetMessage && <p className="reset-message">{resetMessage}</p>}
                    </form>
                    <p
                        className="back-to-signin-link"
                        onClick={() => setView('sign-in')}
                    >
                        Back to Sign In
                    </p>
                </div>
            )}
            {view === 'reset-code' && (
                <div className="reset-password-box">
                    <h2 className="reset-password-header">Enter Reset Code</h2>
                    <form className="reset-password-form" onSubmit={handleResetCodeSubmit}>
                        <div>
                            <label htmlFor="reset-code">Reset Code:</label>
                            <input
                                type="text"
                                id="reset-code"
                                placeholder="Enter the code"
                                value={resetCode}
                                onChange={(e) => setResetCode(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="new-password">New Password:</label>
                            <input
                                type="password"
                                id="new-password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="reset-password-button">
                            Reset Password
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SignIn;
