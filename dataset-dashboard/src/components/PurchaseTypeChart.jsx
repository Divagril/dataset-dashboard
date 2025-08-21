// src/components/PurchaseTypeChart.jsx (Etiquetas mejoradas)

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PurchaseTypeChart = ({ data }) => {
  const purchaseTypeCounts = data.reduce((acc, moto) => {
    const type = moto.purchaseType || 'Desconocido';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(purchaseTypeCounts).map(key => ({
    name: key,
    value: purchaseTypeCounts[key],
  }));

  // --- INICIO DE LA MODIFICACIÓN ---
  // Actualizamos las claves del objeto COLORS para que coincidan con las nuevas etiquetas.
  const COLORS = {
    'Motos Nuevas': '#00C49F',        // Verde
    'Motos de Segunda': '#0088FE',    // Azul
    'Motos de Renta': '#FFBB28',      // Amarillo
    'Desconocido': '#FF8042'          // Naranja
  };
  // --- FIN DE LA MODIFICACIÓN ---

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
            <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PurchaseTypeChart;