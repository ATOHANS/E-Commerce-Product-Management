import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Row, Col, Container, Form } from 'react-bootstrap';

const ProductCatalog = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('http://127.0.0.1:8000/api/products');
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleViewProduct = (id) => {
        navigate(`/products/view/${id}`); // Navigate to ProductView with the product ID
    };

    return (
        <Container>
            <Form.Group className="my-3">
                <Form.Control
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Form.Group>
            <Row>
                {filteredProducts.map((product) => (
                    <Col md={4} key={product.id}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    Price: ₱{product.price} <br />
                                    Category: {product.category} <br />
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
                ))}
            </Row>
        </Container>
    );
};

export default ProductCatalog;
