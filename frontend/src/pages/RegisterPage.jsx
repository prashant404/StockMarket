// src/pages/RegisterPage.js
import { Container, Box, Heading, FormControl, FormLabel, Input, Button, Alert, AlertIcon } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/register`, formData);
      localStorage.setItem('token', response.data.token);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/'), 2000); 
    } catch (error) {
      setError('Registration failed: ' + (error.response?.data.message || error.message));
      console.error('Registration error:', error);
    }
  };

  return (
    <Container>
      <Box>
        <Heading>Register</Heading>
        <form onSubmit={handleRegister}>
          {['username', 'email', 'password'].map((field, index) => (
            <FormControl key={field} id={field} isRequired mt={index ? 4 : 0}>
              <FormLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
              <Input type={field} name={field} value={formData[field]} onChange={handleInputChange} />
            </FormControl>
          ))}
          <Button mt={4} colorScheme="teal" type="submit">
            Register
          </Button>
          {error && <Alert status="error" mt={4}><AlertIcon />{error}</Alert>}
          {success && <Alert status="success" mt={4}><AlertIcon />{success}</Alert>}
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
