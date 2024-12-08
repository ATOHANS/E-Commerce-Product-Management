import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Row, Col, Container, Form } from 'react-bootstrap';

const ProductCatalog = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('http://127.0.0.1:8000/api/products');
            setProducts(data);
        };
        fetchProducts();
    }, []);

    // Filter products based on search, category, and price range
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        const price = parseFloat(product.price) || 0; // Ensure price is a valid number
        const matchesMinPrice = minPrice ? price >= parseFloat(minPrice) : true;
        const matchesMaxPrice = maxPrice ? price <= parseFloat(maxPrice) : true;

        return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
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

           {/* Price Range Filter */}
    <div className="price-range-container mb-3">
        <Form.Control
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="me-2"
     />
        <Form.Control
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="me-2"
     />
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
                                        Availability:{" "}
                                        {product.quantity > 0 ? (
                                            <span className="text-success">In Stock</span>
                                        ) : (
                                            <span className="text-danger">Out of Stock</span>
                                        )} <br />
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        className="me-2"
                                        onClick={() => addToCart(product)}
                                        disabled={product.quantity === 0}
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
                    <p>No products match your search, category, or price range.</p>
                )}
            </Row>
        </Container>
    );
};

export default ProductCatalog;
