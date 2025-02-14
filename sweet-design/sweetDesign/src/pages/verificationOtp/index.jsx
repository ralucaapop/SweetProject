import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './styless.css';

const VerificationOtp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;
    const name = location.state?.name;
    const password = location.state?.password;
    const dob = location.state?.dob;
    const [otp, setOtp] = useState('');
    const [otpVerificationMessage, setOtpVerificationMessage] = useState('');

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register/verification', {
                    name : name,
                    email : email,
                    password : password,
                    verificationCode:otp,
                    dob : dob
            });

            if (response.status===200){
                sessionStorage.removeItem("registrationData");
                navigate('/signin');
            } else {
                setOtpVerificationMessage("Invalid OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error during OTP verification:", error);
            setOtpVerificationMessage("An error occurred while verifying OTP. Please try again.");
        }
    };

    return (
        <div className="otp-verification-container">
            <div className="otp-verification-box">
                <h2 className="otp-verification-header">Verify OTP</h2>
                <p className="otp-instructions">Please enter the OTP sent to your email: {email}</p>
                <p className="otp-instructions">The OTP code is valid for only 10 minutes.</p>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOtpChange}
                    className="otp-input"
                />
                <button onClick={handleVerifyOtp} className="verify-otp-button">Verify OTP</button>
                {otpVerificationMessage && <p className="otp-message">{otpVerificationMessage}</p>}
            </div>
        </div>
    );
};

export default VerificationOtp;
