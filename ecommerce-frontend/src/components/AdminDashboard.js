import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login'); 
  };

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Admin Dashboard</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span>Manage Products</span>
              <Link to="/products">
                <Button variant="primary">View Products</Button>
              </Link>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span>Add New Product</span>
              <Link to="/products/new">
                <Button variant="success">Add Product</Button>
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="d-flex justify-content-between">
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
