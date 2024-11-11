import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import ProductView from './ProductView';
import Login from './Login'; // Import the Login component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {/* Set the Login component as the default route */}
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/new" element={<ProductForm />} />
                <Route path="/products/edit/:id" element={<ProductForm />} />
                <Route path="/products/view/:id" element={<ProductView />} />
            </Routes>
        </Router>
    );
};

export default App;
