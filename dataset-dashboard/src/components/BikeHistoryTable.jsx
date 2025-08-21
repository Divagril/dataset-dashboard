import React, { useState } from 'react';
import './BikeHistoryTable.css';

const ITEMS_PER_PAGE = 10;

const BikeHistoryTable = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);

    if (!data.length) {
        return <p>No hay motocicletas que coincidan con los filtros seleccionados.</p>;
    }

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const formatCurrency = (value) => `$${(value || 0).toLocaleString()}`;

    return (
        <div className="table-container">
            <table className="history-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre del Vehículo</th>
                        <th>Año</th>
                        <th>Kms</th>
                        <th>Precio Mercado</th>
                        <th className="price-senati">Precio SENATI</th>
                        <th className="price-senati">Cuota Mensual (24m)</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((moto) => (
                        <tr key={moto.id}>
                            <td>{moto.id}</td>
                            <td>{moto.name}</td>
                            <td>{moto.year}</td>
                            {/* CORRECCIÓN: Se añade '|| 0' para evitar error si el dato no existe */}
                            <td>{(moto.km_driven || 0).toLocaleString()}</td>
                            <td>{formatCurrency(moto.selling_price)}</td>
                            <td className="price-senati">{formatCurrency(moto.precio_senati)}</td>
                            <td className="price-senati">{formatCurrency(moto.cuota_mensual)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default BikeHistoryTable;