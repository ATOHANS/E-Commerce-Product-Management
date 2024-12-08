import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCatalog from './ProductCatalog';
import { Button } from 'react-bootstrap';

const Home = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    navigate('/login');
  };

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Display alert when a product is added
    alert(`Product: ${product.name} has been added to the cart.`);
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Welcome to the Store</h1>
        <button
          onClick={handleLogout}
          style={{ padding: '10px 20px', backgroundColor: 'orange', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </header>

      <ProductCatalog addToCart={handleAddToCart} />

      {/* Pass the cart to the CartPage route */}
      <Button
        variant="success"
        style={{ marginTop: '20px' }}
        onClick={() => navigate('/cart', { state: { cart } })} // Pass cart as state to CartPage
      >
        Go to Cart
      </Button>
    </div>
  );
};

export default Home;
