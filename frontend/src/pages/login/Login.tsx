import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AuthForm from '../../components/authForm.tsx/AuthForm';

const Login: React.FC = () => {
    const { login } = useAuth();

    const handleLogin = async (username: string, password: string) => {
        await login(username, password);
    };

    return (
        <AuthForm
            title="Login"
            actionLabel="Login"
            onSubmit={handleLogin}
            switchText="Sign Up"
            switchPath="/signup"
        />
    );
};

export default Login;
