import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Button, Alert, Container, Row, Col, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
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

    const handleGoBack = () => navigate(-1);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    // Filter products based on search, category, and price range
    const filteredProducts = products.filter((product) => {
        const price = parseFloat(product.price) || 0; // Ensure price is a number
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        const matchesMinPrice = minPrice ? price >= parseFloat(minPrice) : true;
        const matchesMaxPrice = maxPrice ? price <= parseFloat(maxPrice) : true;
        return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });

    return (
        <Container className="my-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Product List</h2>
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Link to="/products/new">
                <Button variant="success" className="mb-3">Add Product</Button>
            </Link>

            {/* Search and Filters */}
            <Row className="mb-4">
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Search by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
                <Col md={3}>
                    <Form.Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Toys">Toys</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Furniture">Furniture</option>
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Form.Control
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </Col>
                <Col md={2}>
                    <Form.Control
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </Col>
            </Row>

            {/* Product List */}
            {filteredProducts.length === 0 ? (
                <p>No products match your filters.</p>
            ) : (
                <Row className="justify-content-center">
                    <Col md={8}>
                        <ListGroup>
                            {filteredProducts.map((product) => {
                                const price = parseFloat(product.price) || 0; // Ensure price is a number
                                return (
                                    <ListGroup.Item
                                        key={product.id}
                                        className="d-flex justify-content-between align-items-center"
                                    >
                                        <div>
                                            <strong>Item name: {product.name}</strong>
                                            <div>Category: {product.category}</div>
                                        </div>
                                        <div>
                                            <span>₱{price.toFixed(2)}</span>
                                            <Link to={`/products/edit/${product.id}`}>
                                                <Button variant="primary" size="sm" className="me-2">Edit</Button>
                                            </Link>
                                            <Link to={`/products/view/${product.id}`}>
                                                <Button variant="info" size="sm" className="me-2">View</Button>
                                            </Link>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            )}
            <Button variant="secondary" className="mt-3" onClick={handleGoBack}>
                Go Back
            </Button>
        </Container>
    );
};

export default ProductList;
