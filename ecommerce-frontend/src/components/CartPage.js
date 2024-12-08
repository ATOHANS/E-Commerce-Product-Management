import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Checkout from './Checkout'; 

const CartPage = () => {
  const { state } = useLocation(); // Get the cart state from Home component
  const [cart, setCart] = useState(state?.cart || []); // Initialize cart with passed state
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {/* Go Back Button */}
      <Button variant="secondary" onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        Go Back
      </Button>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>Price: ₱{item.price}</p>
              <p>
                Quantity:
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
                {item.quantity}
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </p>
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <h3>Total: ₱{calculateTotal()}</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="success" onClick={() => setShowCheckoutModal(true)}>
        Checkout
      </Button>

      {/* Checkout Modal */}
      <Checkout
        show={showCheckoutModal}
        onHide={() => setShowCheckoutModal(false)}
        cart={cart}
        total={calculateTotal()}
        setCart={setCart}
        setError={setError}
      />
    </div>
  );
};

export default CartPage;
