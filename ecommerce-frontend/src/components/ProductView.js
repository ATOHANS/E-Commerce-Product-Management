import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const ProductView = () => {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError('Failed to fetch product details');
            }
        };
        fetchProduct();
    }, [id]);

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mt-4">
            <Card>
                <Card.Body>
                    <Card.Title>Item Name: {product.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                       
                    </Card.Subtitle>
                    <Card.Text>
                         <h5><strong>Barcode:</strong> {product.barcode} <br/></h5>
                        <strong>Description:</strong> {product.description || 'No description available'} <br />
                        <strong>Price:</strong> ₱{product.price} <br />
                        <strong>Available Quantity:</strong> {product.quantity} <br />
                        <strong>Category:</strong> {product.category} <br />
                    </Card.Text>
                    <Button variant="secondary" onClick={() => navigate(-1)}>
                        Go Back
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProductView;
