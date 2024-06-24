import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./AuthForm.css";
import Error from '../error/Error';
import Loading from '../loading/Loading';

interface AuthFormProps {
    title: string;
    actionLabel: string;
    onSubmit: (username: string, password: string) => Promise<void>;
    switchText: string;
    switchPath: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, actionLabel, onSubmit, switchText, switchPath }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await onSubmit(username.trim(), password.trim());
        } catch (err: unknown) {
            setIsError(true);
            setErrorMessage('An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <h2>{title}</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {isLoading && !isError ? <Loading /> : (
                    <button type="submit">{actionLabel}</button>
                )}

                <Link to={switchPath}>{switchText}</Link>
                {isError && <Error message={errorMessage} />}
            </form>
        </div>
    );
};

export default AuthForm;
