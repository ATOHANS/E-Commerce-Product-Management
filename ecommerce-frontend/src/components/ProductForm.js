import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
    // Sets form data to add or edit products
    const [formData, setFormData] = useState({
        barcode: '',
        item_name: '',
        description: '', 
        price: '',
        quantity: '',
        category: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    // Categories
    const categories = ['Electronics', 'Clothing', 'Furniture', 'Toys'];

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
                    setFormData(response.data);
                } catch (err) {
                    setError('Failed to fetch product details');
                }
            };
            fetchProduct();
        }
    }, [id]); // Fetch products

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }; // Handles Edit Product

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = id ? `http://127.0.0.1:8000/api/products/${id}` : 'http://127.0.0.1:8000/api/products';
        const method = id ? 'put' : 'post';

        try {
            await axios({
                method,
                url,
                data: formData,
            });
            setSuccess(id ? 'Product updated successfully!' : 'Product added successfully!');
            setError('');
            setTimeout(() => {
                navigate('/products');
            }, 2000);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Failed to save product');
            } else {
                setError('Network error. Please try again.');
            }
            setSuccess('');
        }
    }; // Handles Submission button 

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page in the history
    };

    return (
        <div className="container">
            <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicBarcode">
                    <Form.Label>Barcode</Form.Label>
                    <Form.Control
                        type="text"
                        name="barcode"
                        placeholder="Enter product barcode"
                        value={formData.barcode} // value of Barcode
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicItemName">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter product item name"
                        value={formData.name} // value of product name
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea" 
                        name="description"
                        placeholder="Enter product description"
                        value={formData.description} // value of product description
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        value={formData.price} // value of product price
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicQuantity">
                    <Form.Label>Available Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        name="quantity"
                        placeholder="Enter available quantity"
                        value={formData.quantity} // value of product quantity
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        name="category"
                        value={formData.category} // value of product category
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a category</option> {/* Options for the category*/}
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {id ? 'Update Product' : 'Add Product'}
                </Button>
            </Form>
            <Button variant="secondary" className="mt-3" onClick={handleGoBack}>
                Go Back
            </Button>
        </div>
    );
};

export default ProductForm;
