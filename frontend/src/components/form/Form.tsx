import React, { useState } from 'react';
import './Form.css';
import Loading from '../loading/Loading';
import Success from '../success/Success';

interface FormProps {
    isSuccess: boolean;
    successMessage: string | null;
    isLoading: boolean;
    initialValues: {
        requestedAmount: number;
        occupation: string;
        averageIncome: number;
    };
    onSubmit: (formData: any) => void;
    isBlocked: boolean;

}

const Form: React.FC<FormProps> = ({ initialValues, onSubmit, isBlocked, isLoading, isSuccess, successMessage }) => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };


    return (
        <form className="form-wrapper" onSubmit={handleSubmit}>
            <div className="form-field">
                <label className="form-label">
                    Requested Frame Amount:
                    <input
                        type="number"
                        name="requestedAmount"
                        value={formData.requestedAmount}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </label>
            </div>
            <div className="form-field">
                <label className="form-label">
                    Occupation:
                    <select
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Select Occupation</option>
                        <option value="Employee">Employee</option>
                        <option value="Self-employed">Self-employed</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
            </div>
            <div className="form-field">
                <label className="form-label">
                    Average Monthly Income:
                    <input
                        type="number"
                        name="averageIncome"
                        value={formData.averageIncome}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </label>
            </div>
            <div className="form-button-container">
                {isSuccess && <Success message={successMessage} />}
                {isLoading && <Loading />}
                {!isSuccess && !isLoading && <button type="submit" className="enlarge-button">{isBlocked ? "Submit" : "Enlarge Frame"}</button>}
            </div>
        </form>
    );
};

export default Form;
