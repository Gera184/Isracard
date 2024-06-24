import Home from "./pages/home/Home";
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import PrivateRoute from './components/privateRoute/PrivateRoute';

interface RouteProps {
    path: string;
    name: string;
    element: JSX.Element;
}

const routes: RouteProps[] = [
    {
        path: "/",
        element: <PrivateRoute><Home /></PrivateRoute>,
        name: 'Home',
    },
    {
        path: '/login',
        element: <Login />,
        name: 'Login',
    },
    {
        path: '/signup',
        element: <Signup />,
        name: 'Signup',
    },
];

export default routes;
