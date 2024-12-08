import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Row, Col, Container, Form } from 'react-bootstrap';

const ProductCatalog = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('http://127.0.0.1:8000/api/products');
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()); // Allows small letter when searching
        const matchesCategory = selectedCategory // Categories 
            ? product.category === selectedCategory
            : true;
        return matchesSearch && matchesCategory;
    });

    const handleViewProduct = (id) => {
        navigate(`/products/view/${id}`);
    };

    return (
        <Container>
            <div className="filters-container mb-3 d-flex justify-content-between">
                <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-bar me-2"
                />
                <Form.Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="category-filter"
                >
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Toys">Toys</option>
                </Form.Select>
            </div>
            <Row>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Col md={4} key={product.id}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        Price: ₱{product.price} <br />
                                        {/* Category: {product.category} <br /> */}
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        className="me-2"
                                        onClick={() => addToCart(product)}
                                    >
                                        Add to Cart
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={() => handleViewProduct(product.id)}
                                    >
                                        View
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No products match your search or category filter.</p>
                )}
            </Row>
        </Container>
    );
};

export default ProductCatalog;
