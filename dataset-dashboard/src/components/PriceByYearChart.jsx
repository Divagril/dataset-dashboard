import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const PriceByYearChart = ({ data }) => {
    const chartData = data.map(moto => ({
        year: moto.year,
        price: moto.selling_price,
        kms: moto.km_driven,
    })).filter(moto => moto.year > 1980 && moto.price > 0);

    const formatPrice = (value) => `$${(value / 1000).toFixed(0)}k`;

    return (
        <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    type="number" 
                    dataKey="year" 
                    name="Año" 
                    domain={['dataMin - 1', 'dataMax + 1']} 
                    tick={{ fill: '#333' }}
                    allowDecimals={false}
                >
                    <Label value="Año del Modelo" offset={-15} position="insideBottom" fill="#555" />
                </XAxis>
                <YAxis 
                    type="number" 
                    dataKey="price" 
                    name="Precio" 
                    tickFormatter={formatPrice}
                    tick={{ fill: '#333' }}
                >
                    <Label value="Precio de Venta" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#555' }} />
                </YAxis>
                <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }} 
                    formatter={(value, name) => name === 'Precio' ? `$${value.toLocaleString()}` : (name === 'Kms Recorridos' ? `${value.toLocaleString()} km` : value)}
                />
                <Legend />
                <Scatter name="Motos (tamaño por Kms)" data={chartData} fill="#0058A8" shape="circle" />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default PriceByYearChart;