import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';  // Переконайтеся, що це єдиний імпорт axios

// Решта коду...


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://your-api-url/register', {
        username,
        password,
      });
      setSuccess('Registration successful! Please log in.');
      console.log('Registration successful:', response.data);
      // Додайте подальшу логіку для переходу на сторінку входу
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};

export default Register;
