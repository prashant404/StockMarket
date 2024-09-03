/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { fetchUserDetails, fetchWatchlist, removeFromWatchlist } from '../api/stockAPI';
import { Container, Box, Heading, Text, Button, SimpleGrid } from '@chakra-ui/react';

const PortfolioPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const userData = await fetchUserDetails();
        setUserDetails(userData);
      } catch (err) {
        setError('Failed to load user details.');
      }
    };

    const loadWatchlist = async () => {
      try {
        const response = await fetchWatchlist();
        if (response.watchlist) {
          setWatchlist(response.watchlist);
        } else {
          setWatchlist([]);
        }
      } catch (err) {
        setError('Failed to load watchlist.');
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([loadUserDetails(), loadWatchlist()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleRemoveFromWatchlist = async (stockId) => {
    try {
      await removeFromWatchlist(stockId);
      setWatchlist(watchlist.filter(stock => stock._id !== stockId));
      alert('Stock removed from watchlist!');
    } catch (error) {
      alert('Failed to remove stock from watchlist. ' + (error.response ? error.response.data.message : error.message));
    }
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <Container>
      <Navbar />
      <Box>
        <Heading>Portfolio Page</Heading>
        {userDetails ? (
          <>
            <Heading size="md">Personal Details</Heading>
            <Text>Username: {userDetails.username}</Text>
            <Text>Email: {userDetails.email}</Text>
          </>
        ) : error ? (
          <Text color="red.500">{error}</Text>
        ) : (
          <Text>No user details available</Text>
        )}
        <Heading size="md" mt={4}>Stocks in Watchlist</Heading>
        {watchlist.length > 0 ? (
          <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={4}>
            {watchlist.map((stock) => (
              <Box key={stock._id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                <Text fontWeight="bold">{stock.symbol}</Text>
                <Text>{stock.companyName}</Text>
                <Button mt={2} colorScheme="red" onClick={() => handleRemoveFromWatchlist(stock._id)}>
                  Remove from Watchlist
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Text>No stocks in the watchlist.</Text>
        )}
      </Box>
    </Container>
  );
};

export default PortfolioPage;
