import React from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function AdminPage() {
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleLogout = () => {
    // Handle logout logic (if any) and navigate back to the login page
    navigate('/App');
  };

  return (
    <div className="container mt-4 shadow-sm rounded" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      
      <button 
        className="btn btn-sm btn-warning mb-3 px-3 py-1" 
        style={{ color: '#000', backgroundColor: '#0000FF', border: 'none', borderRadius: '5px' }}
        onClick={handleLogout} // Attach the onClick handler for logout
      >
        Logout
      </button>

      {/* Header */}
      <h2 className="text-center mb-4">
        <header className="fw-bold" style={{ color: '##0000FF' }}>E-COMMERCE MANAGEMENT SYSTEM</header>
      </h2>

      {/* Add Item Form */}
      <form className="add-form mb-5 p-4 shadow-sm rounded" style={{ backgroundColor: '#333', color: '#fff' }}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Add Item:</label>
            <input type="text" className="form-control" placeholder="Enter item name" required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Description:</label>
            <input type="text" className="form-control" placeholder="Enter item description" required />
          </div>

          <div className="col-md-4">
            <label className="form-label">Price:</label>
            <input type="number" className="form-control" placeholder="Enter price" required />
          </div>

          <div className="col-md-4">
            <label className="form-label">Quantity:</label>
            <input type="number" className="form-control" placeholder="Enter quantity" required />
          </div>

          <div className="col-md-4">
            <label className="form-label">Category:</label>
            <input type="text" className="form-control" placeholder="Enter category" required />
          </div>

          <div className="col-12 text-center mt-3">

            {/* add item button */}
            <button type="submit" className="btn" style={{ backgroundColor: '#0000FF', color: '#000' }}>Add Item</button>
          </div>
        </div>
      </form>

      {/* Table to display items */}
      <div className="form-table mb-4">
        {/* Search Bar */}
        <div className="d-flex mb-3 justify-content-between">
          <input
            type="text"
            placeholder="Search"
            className="form-control me-2"
            style={{ width: '300px' }}
          />
          <button className="btn" style={{ backgroundColor: '#0000FF', color: '#000' }}>Search</button>
        </div>

        {/* Scrollable Table */}
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <Table striped bordered hover responsive className="table table-striped shadow-sm" style={{ backgroundColor: '#333', color: '#fff' }}>
            <thead className="table-dark" style={{ backgroundColor: '#111' }}>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sample Item</td>
                <td>Sample Description</td>
                <td>$100</td>
                <td>10</td>
                <td>Electronics</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2">Update</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
              {/* Additional rows will be dynamically added */}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
