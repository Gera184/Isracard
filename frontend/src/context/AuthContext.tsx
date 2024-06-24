import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';


interface AuthContextType {
    isAuthenticated: boolean;
    username: string | null;
    login: (username: string, password: string) => Promise<void>;
    signup: (username: string, password: string) => Promise<void>;
    logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string | null>(null);
    const navigate = useNavigate();


    const login = async (username: string, password: string) => {
        try {
            const response = await API.request({
                method: 'POST',
                url: API.login,
                data: { username, password }
            });

            const { message, statusCode } = response.data

            if (statusCode === 200) {
                setIsAuthenticated(true);
                setUsername(username);
                navigate('/');

            } else {
                throw new Error(message);
            }
        } catch (err) {
            throw new Error('Login failed. Please try again.');
        }
    };


    const signup = async (username: string, password: string) => {
        try {
            const response = await API.request({
                method: 'POST',
                url: API.signup,
                data: { username, password, }
            });

            const { message, statusCode } = response.data

            if (statusCode === 201) {
                setIsAuthenticated(true);
                setUsername(username);
                navigate('/');

            } else {
                throw new Error(message);
            }
        } catch (err) {
            throw new Error('Signup failed. Please try again.');
        }
    };


    const logout = () => {
        setIsAuthenticated(false);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
