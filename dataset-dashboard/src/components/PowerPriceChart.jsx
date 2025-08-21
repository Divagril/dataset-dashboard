import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PowerPriceChart = ({ data }) => {
  const chartData = data
    .map(moto => ({
      power: moto.power,
      price: moto.price,
    }))
    .filter(moto => moto.power > 0 && moto.price > 0);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis type="number" dataKey="power" name="Potencia" unit=" bhp" />
        <YAxis type="number" dataKey="price" name="Precio" unit=" Rs" width={80} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend/>
        <Scatter name="Motocicletas" data={chartData} fill="#82ca9d" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default PowerPriceChart;