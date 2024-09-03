import { useState } from 'react';
import { Box, Text, Input, Button } from '@chakra-ui/react';
import { executeTrade } from '../api/stockAPI';

const Trade = () => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [action, setAction] = useState('buy');

  const handleTrade = async () => {
    try {
      await executeTrade(symbol, quantity, action);
      alert('Trade executed successfully');
    } catch (error) {
      console.error('Error executing trade:', error);
    }
  };

  return (
    <Box>
      <Text fontSize="xl" mb={4}>Trade Stocks</Text>
      <Input
        placeholder="Stock Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        mb={2}
      />
      <Input
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        mb={2}
      />
      <Button onClick={() => setAction('buy')} colorScheme="green">Buy</Button>
      <Button onClick={() => setAction('sell')} colorScheme="red">Sell</Button>
      <Button onClick={handleTrade}>Execute Trade</Button>
    </Box>
  );
};

export default Trade;
