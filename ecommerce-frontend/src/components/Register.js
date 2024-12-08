import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        contactNo: '',
        role: 'user', // Default role
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate email
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(emailRegex.test(value) ? '' : 'Invalid email format');
        }

        // Check password strength
        if (name === 'password') {
            const strength = calculatePasswordStrength(value);
            setPasswordStrength(strength);
        }
    };

    const calculatePasswordStrength = (password) => {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
            return 'Password must include uppercase, lowercase, a number, and a special character';
        }

        return 'Strong password';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailError || passwordStrength !== 'Strong password') {
            setError('Please fix the highlighted issues before submitting');
            return;
        }
        try {
            await axios.post('http://127.0.0.1:8000/api/register', formData);
            setSuccess('Registration successful!');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(
                err.response?.data?.errors
                    ? Object.values(err.response.data.errors).join(' ')
                    : 'Failed to register'
            );
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container">
            <h2>Create an Account</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!emailError}
                        required
                    />
                    <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={passwordStrength !== 'Strong password'}
                        required
                    />
                    <Form.Text className={passwordStrength === 'Strong password' ? 'text-success' : 'text-danger'}>
                        {passwordStrength}
                    </Form.Text>
                    <Form.Check
                        type="checkbox"
                        label="Show password"
                        checked={showPassword}
                        onChange={toggleShowPassword}
                        className="mt-2"
                    />
                </Form.Group>
                <Form.Group controlId="contactNo">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                        type="text"
                        name="contactNo"
                        placeholder="Enter your contact number"
                        value={formData.contactNo}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button type="submit">Register</Button>
            </Form>
        </div>
    );
};

export default Register;
