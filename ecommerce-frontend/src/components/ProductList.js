import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = () => { // List of all products
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/products');
                setProducts(response.data);
            } catch (err) {
                setError('Failed to fetch products');
            }
        };
        fetchProducts();
    }, []); // Getting products from the database ecommerce_backend

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this product?');
        if (confirmed) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
                setProducts(products.filter(product => product.id !== id));
            } catch (err) {
                setError('Failed to delete product');
            }
        }
    }; // Handles delete product for the admin

    const handleGoBack = () => {
        navigate(-1); // Go back button
    };
    
    const handleLogout = () => {
        localStorage.clear(); 
        navigate('/login'); // Logout 
    };

    return (
        <Container className="my-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Product List</h2>
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Link to="/products/new"> {/*Goes to Product Form*/}
                <Button variant="success" className="mb-3">Add Product</Button>
            </Link>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <Row className="justify-content-center">
                    <Col md={8}>
                        <ListGroup> {/*List of Products after fetching from the database*/}
                            {products.map((product) => {
                                const price = typeof product.price === 'number' ? product.price : parseFloat(product.price);
                                return (
                                    <ListGroup.Item key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Item name: {product.name}</strong>
                                        </div>
                                        <div>
                                            <span>₱{price ? price.toFixed(2) : 'N/A'}</span>
                                            <Link to={`/products/edit/${product.id}`}> {/*Goes to Product Form to edit*/}
                                                <Button variant="primary" size="sm" className="me-2">Edit</Button>
                                            </Link>
                                            <Link to={`/products/view/${product.id}`}> {/*Goes to Product View*/}
                                                <Button variant="info" size="sm" className="me-2">View</Button>
                                            </Link> {/*Deletes Product from the frontend and backend*/}
                                            <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}>Delete</Button>
                                        </div>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            )}
            <Button variant="secondary" className="mt-3" onClick={handleGoBack}>Go Back</Button>
        </Container>
    );
};

export default ProductList;
