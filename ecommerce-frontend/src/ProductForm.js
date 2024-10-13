import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
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
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

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
                        value={formData.barcode}
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
                        value={formData.name}
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
                        value={formData.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        value={formData.price}
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
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        placeholder="Enter category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {id ? 'Update Product' : 'Add Product'}
                </Button>
            </Form>
        </div>
    );
};

export default ProductForm;
