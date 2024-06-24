import React from 'react';
import './Modal.css';
import Form from '../form/Form';
import Error from '../error/Error';

interface ModalProps {
    isSuccess: boolean;
    isLoading: boolean;
    successMessage: string | null;
    onClose: () => void;
    initialValues: {
        requestedAmount: number;
        occupation: string;
        averageIncome: number;
    };
    onSubmit: (formData: any) => void;
    isOpen: boolean;
    isBlocked: boolean;
    isError: boolean;
    errorMessage: string | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, initialValues, onSubmit, isBlocked, isLoading, isError, errorMessage, isSuccess, successMessage }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Card Details</h2>
                <Form
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    isBlocked={isBlocked}
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                    successMessage={successMessage}
                />
                {isError && errorMessage && <Error message={errorMessage} />}
            </div>
        </div>
    );
};

export default Modal;
