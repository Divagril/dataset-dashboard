import React from 'react';
import './Filters.css';

// --- CAMBIO: Se renombró 'owners' a 'purchaseTypes' para mayor claridad
const Filters = ({ filters, setFilters, manufacturers, years, purchaseTypes, maxPrice }) => {
  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <div className="filters-container">
      <div className="filter-item">
        <label htmlFor="manufacturer">Fabricante:</label>
        <select
          id="manufacturer"
          value={filters.manufacturer}
          onChange={(e) => handleFilterChange('manufacturer', e.target.value)}
        >
          {manufacturers.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="year">Año:</label>
        <select
          id="year"
          value={filters.year}
          onChange={(e) => handleFilterChange('year', e.target.value)}
        >
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

       {/* --- INICIO DE LA MODIFICACIÓN --- */}
       <div className="filter-item">
        <label htmlFor="purchaseType">Tipo de Compra:</label>
        <select
          id="purchaseType"
          value={filters.purchaseType} // Usa el nuevo estado
          onChange={(e) => handleFilterChange('purchaseType', e.target.value)} // Usa el nuevo estado
        >
          {purchaseTypes.map(pt => <option key={pt} value={pt}>{pt}</option>)}
        </select>
      </div>
      {/* --- FIN DE LA MODIFICACIÓN --- */}

      <div className="filter-item price-range">
        <label htmlFor="priceRange">
          Rango de Precio: ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
        </label>
        <input
          type="range"
          id="priceRange"
          min={0}
          max={maxPrice}
          step={1000}
          value={filters.priceRange[1]}
          onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
        />
      </div>
    </div>
  );
};

export default Filters;