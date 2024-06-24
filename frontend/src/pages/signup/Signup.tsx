import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AuthForm from '../../components/authForm.tsx/AuthForm';

const Signup: React.FC = () => {
    const { signup } = useAuth();

    const handleSignup = async (username: string, password: string) => {
        await signup(username, password);
    };

    return (
        <AuthForm
            title="Sign Up"
            actionLabel="Sign Up"
            onSubmit={handleSignup}
            switchText="Login"
            switchPath="/login"
        />
    );
};

export default Signup;
