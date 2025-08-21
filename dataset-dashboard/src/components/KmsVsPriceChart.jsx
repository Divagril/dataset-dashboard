import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const KmsVsPriceChart = ({ data }) => {
  const chartData = data.map(moto => ({
    kms: moto.km_driven,
    price: moto.selling_price,
  }));

  const formatPrice = (value) => `$${(value / 1000).toFixed(0)}k`;
  const formatKms = (value) => `${(value / 1000).toFixed(0)}k km`;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis type="number" dataKey="kms" name="Kilómetros" tickFormatter={formatKms}>
             <Label value="Kilómetros Recorridos" offset={-15} position="insideBottom" />
        </XAxis>
        <YAxis type="number" dataKey="price" name="Precio" tickFormatter={formatPrice}>
            <Label value="Precio de Venta" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
        </YAxis>
        <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name) => name === 'Precio' ? `$${value.toLocaleString()}` : `${value.toLocaleString()} km`} />
        <Legend />
        <Scatter name="Motos" data={chartData} fill="#82ca9d" shape="circle" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default KmsVsPriceChart;