import React from "react";

function ResumeModal({ imageUrl, onClose }) {
    return (
        <div>
            <span onClick={onClose}>
                &times;
            </span>
            <img src={imageUrl} alt="resume" />
        </div>
    );
}

export default ResumeModal;