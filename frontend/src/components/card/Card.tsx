import React, { useState } from 'react';
import { CreditCard, Bank, FormData } from '../../types/types';
import './Card.css';
import Modal from '../modal/Modal';
import API from '../../api/api';

interface CardProps {
    card: CreditCard;
    banks: Bank[];
}

const Card: React.FC<CardProps> = ({ card, banks }) => {
    const { creditCardNumber, bankCode, isBlocked, image } = card;

    const bank = banks.find((b) => b.code === bankCode);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [formValues, setFormValues] = useState({
        requestedAmount: 0,
        occupation: '',
        averageIncome: 0
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const openModal = () => {
        // Initialize form values with existing card data
        setFormValues({
            requestedAmount: 0,
            occupation: '',
            averageIncome: 0
        });

        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setIsError(false);
        setErrorMessage(null);
    };

    const handleFormSubmit = async (formData: FormData) => {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage(null);

        try {
            const response = await API.request({
                method: 'POST',
                url: API.increaseLimit,
                data: {
                    creditCardNumber,
                    requestedAmount: formData.requestedAmount,
                    occupation: formData.occupation,
                    averageMonthlyIncome: formData.averageIncome
                }
            });

            const { statusCode, payload } = response.data

            if (statusCode === 200) {
                const { creditLimit, creditCardNumber } = payload
                setIsSuccess(true)

                const successMsg = `your new limit for credit card ${creditCardNumber} is ${creditLimit}`

                setSuccessMessage(successMsg);

                // closeModal();
            } else {
                setIsError(true);
                setErrorMessage('Request failed');
            }

            setFormValues(formData);

        } catch (error) {
            setIsError(true);
            setErrorMessage('Credit limit increase request denied.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <li className="card-item" onClick={openModal}>
                <div className="card-img" style={{ backgroundImage: `url(${image})` }}>
                    <div className="card-details">
                        <p>Credit Card Number: {creditCardNumber}</p>
                        <p>Bank: {bank?.name}</p>
                    </div>
                </div>
            </li>
            <Modal
                isOpen={modalOpen}
                onClose={closeModal}
                initialValues={formValues}
                onSubmit={handleFormSubmit}
                isBlocked={isBlocked}
                isLoading={isLoading}
                isError={isError}
                errorMessage={errorMessage}
                isSuccess={isSuccess}
                successMessage={successMessage}
            />
        </>
    );
};

export default Card;
