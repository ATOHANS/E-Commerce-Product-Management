import './App.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css'; // Import custom animations CSS

function App() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    navigate('/AdminPage');
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
          <input type='text' className="form-control" required />
        </div>

        {/* PASSWORD */}
        <div className='password mb-3'>
          <label className="form-label">Password</label>
          <input type='password' className="form-control" required />
        </div>

        <button type="submit" className="btn" style={{ backgroundColor: '#ffa31a', color: '#000', transition: 'transform 0.2s' }}>Login</button>
      </form>
    </div>
  );
}

export default App;
