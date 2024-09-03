import { useState } from 'react';
import { Box, Text, Input, Button } from '@chakra-ui/react';

const AlertSetup = () => {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState('');

  const handleSetAlert = () => {
    console.log(`Alert set for ${symbol} at ${price}`);
  };

  return (
    <Box>
      <Text fontSize="xl" mb={4}>Set Price Alert</Text>
      <Input
        placeholder="Stock Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        mb={2}
      />
      <Input
        placeholder="Alert Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        mb={2}
      />
      <Button onClick={handleSetAlert}>Set Alert</Button>
    </Box>
  );
};

export default AlertSetup;
