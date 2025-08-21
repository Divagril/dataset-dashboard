import React, { useState, useMemo } from 'react';
import './App.css';
import MotorcycleData from './MotorcycleData.jsx';
import ManufacturerChart from './ManufacturerChart.jsx';
import PriceByYearChart from './PriceByYearChart.jsx';
import Filters from './Filters.jsx';
import StatsCards from './StatsCards.jsx';
import BikeHistoryTable from './BikeHistoryTable.jsx';
// --- CAMBIO: Importamos el nuevo gráfico y eliminamos el antiguo ---
import PurchaseTypeChart from './PurchaseTypeChart.jsx';

function App() {
  const [filters, setFilters] = useState({
    manufacturer: 'Todos',
    priceRange: [0, 900000],
    year: 'Todos',
    // --- CAMBIO: El estado del filtro ahora es 'purchaseType' ---
    purchaseType: 'Todos', 
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src="/senati_logo.png" alt="Senati Logo" className="header-logo" />
        <h1>Dashboard de Financiamiento de Motocicletas para Estudiantes</h1>
      </header>
      <main>
        <MotorcycleData>
          {({ data, loading }) => {
            // --- CAMBIO: Obtenemos los 'purchaseTypes' en lugar de 'owners' ---
            const { manufacturers, years, purchaseTypes, maxPrice } = useMemo(() => {
              if (data.length === 0) return { manufacturers: [], years: [], purchaseTypes: [], maxPrice: 0 };
              return {
                manufacturers: ['Todos', ...Array.from(new Set(data.map(item => item.manufacturer))).sort()],
                years: ['Todos', ...Array.from(new Set(data.map(item => item.year))).sort((a, b) => b - a)],
                purchaseTypes: ['Todos', ...Array.from(new Set(data.map(item => item.purchaseType)))],
                maxPrice: Math.max(...data.map(item => item.selling_price)),
              };
            }, [data]);

            const filteredData = useMemo(() => data.filter(item => {
              // --- CAMBIO: Filtramos por 'purchaseType' ---
              const { manufacturer, priceRange, year, purchaseType } = filters;
              return (
                (manufacturer === 'Todos' || item.manufacturer === manufacturer) &&
                (item.selling_price >= priceRange[0] && item.selling_price <= priceRange[1]) &&
                (year === 'Todos' || item.year === parseInt(year)) &&
                (purchaseType === 'Todos' || item.purchaseType === purchaseType)
              );
            }), [data, filters]);

            if (loading) return <p className="loading-message">Analizando mercado de motocicletas...</p>;
            if (!data || data.length === 0) return <p className="error-message">No se pudo cargar la data. Revisa que el archivo 'BIKE_DETAILS_FINANCIAMIENTO.csv' esté en la carpeta 'public'.</p>;

            return (
              <>
                <div className="top-section">
                  <div className="filters-and-stats">
                    <Filters
                      filters={filters}
                      setFilters={setFilters}
                      manufacturers={manufacturers}
                      years={years}
                      // --- CAMBIO: Pasamos 'purchaseTypes' al componente Filters ---
                      purchaseTypes={purchaseTypes}
                      maxPrice={maxPrice}
                    />
                    <StatsCards data={filteredData} />
                  </div>
                </div>

                <div className="charts-grid">
                  <section className="chart-container">
                    <h2>Motos Disponibles por Fabricante</h2>
                    <ManufacturerChart data={filteredData} />
                  </section>
                  {/* --- INICIO DE LA MODIFICACIÓN --- */}
                  <section className="chart-container">
                    <h2>Distribución por Tipo de Compra</h2>
                    <PurchaseTypeChart data={filteredData} />
                  </section>
                  {/* --- FIN DE LA MODIFICACIÓN --- */}
                  <section className="chart-container full-width">
                    <h2>Análisis de Precio por Antigüedad del Vehículo</h2>
                    <PriceByYearChart data={filteredData} />
                  </section>
                </div>

                <section className="history-section">
                   <h2>Registro de Vehículos para Financiamiento</h2>
                   <BikeHistoryTable data={filteredData} />
                </section>
              </>
            );
          }}
        </MotorcycleData>
      </main>
    </div>
  );
}

export default App;