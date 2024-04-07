import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line } from 'react-chartjs-2';



const SalesOverviewGraph = () => {
  const [salesData, setSalesData] = useState({});
  const dispatch = useDispatch();
  const history = useSelector(state => state.history.currentCart);

  useEffect(() => {
    // Fetch sales data from Redux store (or API) and format it for the graph
    const formattedData = {
      labels: [], // Array of labels for the x-axis (e.g., dates)
      datasets: [
        {
          label: 'Revenue',
          data: [], // Array of revenue values for each label
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1
        },
        {
          label: 'Orders',
          data: [], // Array of order counts for each label
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.1
        }
      ]
    };

    // Populate formattedData with sales data from history
    if (history && history.entries) {
      history.entries.forEach(entry => {
        formattedData.labels.push(entry.date); // Assuming date is stored in each entry
        formattedData.datasets[0].data.push(entry.totalRevenue); // Assuming total revenue is stored in each entry
        formattedData.datasets[1].data.push(entry.orderCount); // Assuming order count is stored in each entry
      });
    }

    setSalesData(formattedData);
  }, [history, dispatch]);

  useEffect(() => {
    const dummyHistoryData = {
      entries: [
        { date: '2022-01-01', totalRevenue: 1000, orderCount: 10 },
        { date: '2022-01-02', totalRevenue: 1500, orderCount: 15 },
        // Add more entries as needed
      ]
    };
  });

  return (
    <div>
      <h2>Sales Overview</h2>
      <Line data={salesData} />
    </div>
  );
};

export default SalesOverviewGraph;
