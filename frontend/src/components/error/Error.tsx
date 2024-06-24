import React from 'react';
import './Error.css';

interface ErrorProps {
    message: string | null;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
    return (
        <div className="error-container">
            <p className="error-message">{message}</p>
        </div>
    );
};

export default Error;
