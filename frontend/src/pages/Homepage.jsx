
import { Container } from '@chakra-ui/react';
import StockSearch from '../components/StockSearch';
import Navbar from '../components/Navbar'; 

const HomePage = () => {
  return (
    <Container>
        <Navbar/>
      <StockSearch />
    </Container>
  );
};

export default HomePage;
