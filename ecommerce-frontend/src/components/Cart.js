import React from 'react';

const Cart = ({ cart, onRemoveFromCart, onUpdateQuantity }) => {
  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0); // Totals the products added to the cart

  return (
    <div>
      <h2>Your Cart</h2>
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
                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
                {item.quantity}
                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </p>
              <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ₱{calculateTotal()}</h3>
    </div>
  );
};

export default Cart;
