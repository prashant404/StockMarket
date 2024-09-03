import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const LoginPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLocalLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      navigate("/homepage");
    } catch (error) {
      setError("Login failed: " + error.message);
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/homepage");
    }
  }, [navigate]);

  return (
    <Container maxW="container.md" mt={10} p={4}>
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
      >
        <Box width={{ base: "100%", md: "50%" }} p={6}>
          <Heading mb={6}>Login</Heading>
          <GoogleLoginButton />
          <form onSubmit={handleLocalLogin}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
                mb={4}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="lg"
                mb={6}
              />
            </FormControl>
            <Button width="100%" colorScheme="teal" type="submit" size="lg">
              Login
            </Button>
            {error && (
              <Box color="red.500" mt={2}>
                {error}
              </Box>
            )}
          </form>
          <Text mt={4}>
            Don’t have an account?{" "}
            <Button
              colorScheme="blue"
              variant="link"
              onClick={() => navigate("/register")}
              size="sm"
            >
              Register here
            </Button>
          </Text>
        </Box>
        <Spacer />
        <Box display={{ base: "none", md: "block" }} width="50%" p={6}></Box>
      </Flex>
    </Container>
  );
};

export default LoginPage;
