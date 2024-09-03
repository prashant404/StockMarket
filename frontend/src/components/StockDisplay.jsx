/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
} from 'chart.js';
import { Button, Box, Text } from '@chakra-ui/react';
import { addToWatchlist } from '../api/stockAPI';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const StockChart = ({ stockData }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      console.log('Received stock data:', stockData);
      try {
        if (!stockData?.data) {
          throw new Error("Invalid or missing stock data");
        }

        const timestamps = Object.keys(stockData.data);
        if (!timestamps.length) {
          throw new Error("No data points available");
        }

        const closePrices = timestamps.map((timestamp) => parseFloat(stockData.data[timestamp]["4. close"]));

        setChartData({
          labels: timestamps.reverse(),
          datasets: [
            {
              label: `${stockData.symbol} Stock Price`,
              data: closePrices.reverse(),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error processing stock data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (stockData) {
      fetchData();
    }
  }, [stockData]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Price: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Price' } },
    },
  };

  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist(stockData.id);
      alert(`${stockData.symbol} added to watchlist!`);
    } catch (error) {
      alert('Failed to add stock to watchlist. ' + (error.response ? error.response.data.message : error.message));
    }
  };

  if (loading) return <Text>Loading chart...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!chartData) return <Text>No data available for the selected stock symbol.</Text>;

  return (
    <Box>
      <Line data={chartData} options={options} />
      <Button mt={4} colorScheme="teal" onClick={handleAddToWatchlist}>
        Add to Watchlist
      </Button>
    </Box>
  );
};

export default StockChart;
