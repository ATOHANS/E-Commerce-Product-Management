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
import ProtectedRoute from './components/ProtectedRoute';
import CartPage from './components/CartPage'; // Import the CartPage component

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
                    <Route path="/cart" element={<CartPage />} /> {/* Cart page route */}
                    {/* Protected admin routes */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/products"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <ProductList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/products/new"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <ProductForm />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/products/edit/:id"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <ProductForm />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/products/view/:id"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <ProductView />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
