import {createBrowserRouter, } from "react-router-dom";

import ErrorPage from './pages/ErrorPage.jsx';
import HomePage from './pages/Home.jsx';
import ProductsPage from './pages/products/Products.jsx';
import Layout from './components/Layout.jsx';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />, // Use Layout as the main wrapper
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/', // Default route
                element: <HomePage />, // Add a separate home page or main content
            },
            {
                path: '/Login', // Default route
                element: <Login />, // Add a separate home page or main content
            },
            {
                path: '/register', // Default route
                element: <Register />, // Add a separate home page or main content
            },
            {
                path: '/Products', // Default route
                element: <ProductsPage />, // Add a separate home page or main content
            },
        ],
    },
]);

export default router;