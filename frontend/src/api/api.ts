import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

const apiServerRequest = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const API = {
    request: apiServerRequest.request,
    cards: '/api/CreditCard',
    login: '/api/Auth/login',
    signup: '/api/Auth/register',
    banks: "/api/Banks",
    filterCards: '/api/CreditCard/filter',
    increaseLimit: '/api/CreditCard/increase-limit'
};

export default API;
