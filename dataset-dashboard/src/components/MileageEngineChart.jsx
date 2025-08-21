import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MileageEngineChart = ({ data }) => {
  const chartData = data
    .map(moto => ({
      engine: moto.engine,
      mileage: moto.mileage,
    }))
    .filter(moto => moto.engine > 0 && moto.mileage > 0);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis type="number" dataKey="engine" name="Cilindrada" unit=" cc" />
        <YAxis type="number" dataKey="mileage" name="Eficiencia" unit=" kmpl" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Motos" data={chartData} fill="#ff7300" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default MileageEngineChart;