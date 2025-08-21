import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ManufacturerChart = ({ data }) => {
  const manufacturerCounts = data.reduce((acc, motorcycle) => {
    const manufacturer = motorcycle.manufacturer;
    if (manufacturer) {
      acc[manufacturer] = (acc[manufacturer] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = Object.keys(manufacturerCounts)
    .map(key => ({
      name: key,
      Motocicletas: manufacturerCounts[key],
    }))
    .sort((a, b) => b.Motocicletas - a.Motocicletas) // Ordenar para ver los más populares
    .slice(0, 15); // Mostrar solo los 15 principales para mayor claridad

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} layout="vertical" margin={{ left: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" allowDecimals={false} />
        <YAxis type="category" dataKey="name" width={100} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Motocicletas" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ManufacturerChart;