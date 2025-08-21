import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FuelTypeChart = ({ data }) => {
  const fuelCounts = data.reduce((acc, moto) => {
    const fuel = moto.fuel_type || 'Desconocido';
    acc[fuel] = (acc[fuel] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(fuelCounts).map(key => ({
    name: key,
    value: fuelCounts[key],
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default FuelTypeChart;