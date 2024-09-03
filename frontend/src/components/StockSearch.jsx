
import { useState } from 'react';
import { Input, Button, Box, Spinner, Text } from '@chakra-ui/react';
import StockDisplay from './StockDisplay';
import { fetchStockData } from '../api/stockAPI';

const StockSearch = () => {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!symbol.trim()) {
      setError('Please enter a valid stock symbol.');
      return;
    }

    setLoading(true);
    setError('');
    setStockData(null);

    try {
      const data = await fetchStockData(symbol);
      setStockData(data);
    } catch (error) {
      setError('Error fetching stock data: ' + (error.response ? error.response.data.message : error.message));
      setStockData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Input
        placeholder="Enter stock symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <Button onClick={handleSearch} isLoading={loading} mt={2}>Search</Button>
      {loading && <Spinner />}
      {error && <Text color="red.500">{error}</Text>}
      {stockData && <StockDisplay stockData={stockData} />}
    </Box>
  );
};

export default StockSearch;
