import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

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
    }, []);

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
    };

    return (
        <Container className="my-4">
            <h2 className="text-center mb-4">Product List</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Link to="/products/new">
                <Button variant="success" className="mb-3">Add Product</Button>
            </Link>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <Row className="justify-content-center">
                    <Col md={8}>
                        <ListGroup>
                            {products.map((product) => {
                                const price = typeof product.price === 'number' ? product.price : parseFloat(product.price);
                                return (
                                    <ListGroup.Item key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Item name: {product.name}</strong> {/* Updated from description to item_name */}
                                        </div>
                                        <div>
                                            <span>₱{price ? price.toFixed(2) : 'N/A'}</span>
                                            <Link to={`/products/edit/${product.id}`}>
                                                <Button variant="primary" size="sm" className="me-2">Edit</Button>
                                            </Link>
                                            <Link to={`/products/view/${product.id}`}>
                                                <Button variant="info" size="sm" className="me-2">View</Button>
                                            </Link>
                                            <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}>Delete</Button>
                                        </div>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default ProductList;
