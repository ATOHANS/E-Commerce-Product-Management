import './App.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css'; // Import custom animations CSS
import { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

function App() {
  const navigate = useNavigate();

  // Define state for storing username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Send login request to Laravel API
      const response = await axios.post('http://localhost:8000/api/login', {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        // Login successful, navigate to admin page
        navigate('/AdminPage');
      }
    } catch (error) {
      // Handle error
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid username or password.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="container mt-4 shadow-sm rounded fade-in" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <header className="text-center mb-4">
        <h1 className="fw-bold" style={{ color: '#ffa31a' }}>E-COMMERCE SYSTEM MANAGEMENT</h1>
      </header>

      <form className='tableForm-login p-4 shadow-sm rounded' onSubmit={handleLogin} style={{ backgroundColor: '#333', color: '#fff' }}>
        {/* USERNAME */}
        <div className='username mb-3'>
          <label className="form-label">Username</label>
          <input
            type='text'
            className="form-control"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}  // Update username state
          />
        </div>

        {/* PASSWORD */}
        <div className='password mb-3'>
          <label className="form-label">Password</label>
          <input
            type='password'
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}  // Update password state
          />
        </div>

        {/* Error Message */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <button type="submit" className="btn" style={{ backgroundColor: '#ffa31a', color: '#000', transition: 'transform 0.2s' }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default App;
