import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import authService from '../services/authService';
import SideMenu from "../components/layouts/SideMenu.jsx"; // Import service xác thực của bạn

const PrivateRoute = () => {
    const isAuthenticated = authService.isAuthenticated(); // Kiểm tra trạng thái đăng nhập

    return isAuthenticated ?
        <Outlet/>
        : <Navigate to="/"/>;
};

export default PrivateRoute;