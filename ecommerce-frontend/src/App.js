// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductView from './components/ProductView';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import CartPage from './components/CartPage'; 

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/products/view/:id" element={<ProductView />} />
                    <Route path="/cart" element={<CartPage />} /> 

                    {/* Private admin routes */}
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute allowedRoles={['admin']}>
                                <AdminDashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/products"
                        element={
                            <PrivateRoute allowedRoles={['admin']}>
                                <ProductList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/products/new"
                        element={
                            <PrivateRoute allowedRoles={['admin']}>
                                <ProductForm />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/products/edit/:id"
                        element={
                            <PrivateRoute allowedRoles={['admin']}>
                                <ProductForm />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/products/view/:id"
                        element={
                            <PrivateRoute allowedRoles={['admin']}>
                                <ProductView />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
