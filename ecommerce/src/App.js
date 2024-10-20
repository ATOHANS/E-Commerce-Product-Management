import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products', {
        params: {
          search: search,
          category: category,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Login logic goes here
    navigate('/AdminPage');
  };

  return (
    <div className="container mt-4 shadow-sm rounded fade-in" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <header className="text-center mb-4">
        <h1 className="fw-bold" style={{ color: '#ffa31a' }}>E-COMMERCE SYSTEM MANAGEMENT</h1>
      </header>

      {/* Login form */}
      <form className='tableForm-login p-4 shadow-sm rounded' onSubmit={handleLogin} style={{ backgroundColor: '#333', color: '#fff' }}>
        {/* USERNAME */}
        <div className='username mb-3'>
          <label className="form-label">Username</label>
          <input type='text' className="form-control" required />
        </div>

        {/* PASSWORD */}
        <div className='password mb-3'>
          <label className="form-label">Password</label>
          <input type='password' className="form-control" required />
        </div>

        <button type="submit" className="btn" style={{ backgroundColor: '#ffa31a', color: '#000', transition: 'transform 0.2s' }}>Login</button>
      </form>

      {/* Product list */}
      <div className="mt-4">
        <h2>Product List</h2>
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Category1">Category 1</option>
          <option value="Category2">Category 2</option>
        </select>

        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.description} - ${product.price} (Stock: {product.quantity})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
