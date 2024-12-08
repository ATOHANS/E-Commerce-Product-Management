import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ show, onHide, cart, total, setCart, setError }) => {
  const [shippingDetails, setShippingDetails] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash-on-delivery');
  const navigate = useNavigate();

  useEffect(() => {
    // If the cart is empty and the checkout modal is opened, show an alert and redirect to home
    if (cart.length === 0 && show) {
      alert('Your cart is empty! Add products first.');
      onHide(); 
      navigate('/home'); 
    }
  }, [cart, show, onHide, navigate]);

  const handleConfirmOrder = () => {
    if (!shippingDetails) {
      setError('Please provide shipping details.');
      return;
    }

    alert('Thank you for your order! Your purchase has been confirmed.');
    setCart([]); // Clear the cart after successful checkout
    onHide(); 
    navigate('/home'); 
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Cart Summary</h5>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} - ₱{item.price * item.quantity}
              </li>
            ))}
          </ul>
        )}
        <h6>Total: ₱{total}</h6>

        <Form>
          <Form.Group controlId="shippingDetails">
            <Form.Label>Shipping Details</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your address"
              value={shippingDetails}
              onChange={(e) => setShippingDetails(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="paymentMethod" className="mt-3">
            <Form.Label>Payment Method</Form.Label>
            <Form.Check
              type="radio"
              label="Cash on Delivery"
              value="cash-on-delivery"
              checked={paymentMethod === 'cash-on-delivery'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Credit Card"
              value="credit-card"
              checked={paymentMethod === 'credit-card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirmOrder}>
          Confirm Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Checkout;
