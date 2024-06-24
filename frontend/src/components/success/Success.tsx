import React from 'react';
import './Success.css';

interface SuccessProps {
    message: string | null;
}

const Success: React.FC<SuccessProps> = ({ message }) => {
    console.log(message)
    return (
        <div className="success-container">
            <div className="success-message">
                <h2>Success!</h2>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Success;
