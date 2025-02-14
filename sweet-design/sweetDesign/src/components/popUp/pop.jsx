import React from 'react';
import './stylePop.css';

const Popup = ({ isVisible, onClose, message }) => {
    if (!isVisible) return null;

    return (
        <div className="popup-backdrop" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close-btn" onClick={onClose}>X</button>
                <div className="popup-message">
                    {message}
                </div>
            </div>
        </div>
    );
};

export default Popup;
