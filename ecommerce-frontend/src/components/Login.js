import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);  
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password,
            }); // Handles login submit button

            if (response.status === 200) {
                const { token, user } = response.data; // Assuming the response includes token and user details
                localStorage.setItem('token', token); // Save token
                localStorage.setItem('role', user.role); // Save role

                // Redirect based on role
                if (user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/home');
                }
            }
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="container login-container">
            <h2>Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type={showPassword ? 'text' : 'password'}  
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        label="Show Password"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}  
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
                <div className="mt-3">
                    <span>New Account? </span>
                    <Link to="/register">Register here</Link>
                </div>
            </Form>
        </div>
    );
};

export default Login;
