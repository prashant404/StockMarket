
import { Box, Flex, Button, Spacer, Heading } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const Navbar = () => {
  const { setUser } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setUser(null); 
    navigate('/'); 
  };

  return (
    <Box bg="teal.500" px={4} py={2} color="white">
      <Flex alignItems="center">
        <Heading size="md">My App</Heading>
        <Spacer />
        <Button as={Link} to="/portfolio" colorScheme="teal" variant="outline" mr={4}>
          Portfolio
        </Button>
        <Button onClick={handleLogout} colorScheme="red" variant="solid">
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
