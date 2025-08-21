import React from 'react';
import { FaMotorcycle, FaTag, FaTachometerAlt } from 'react-icons/fa';
import './StatsCards.css'; // Crearemos este archivo para los estilos

const StatsCards = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="stats-container">
                <div className="stat-card">
                    <h3>Total de Motos</h3>
                    <p>0</p>
                </div>
                <div className="stat-card">
                    <h3>Precio Promedio</h3>
                    <p>$0</p>
                </div>
                <div className="stat-card">
                    <h3>Km Promedio</h3>
                    <p>0 km</p>
                </div>
            </div>
        );
    }

    const totalMotos = data.length;
    const avgPrice = data.reduce((sum, moto) => sum + moto.selling_price, 0) / totalMotos;
    const avgKm = data.reduce((sum, moto) => sum + moto.km_driven, 0) / totalMotos;

    return (
        <div className="stats-container">
            <div className="stat-card">
                <div className="card-icon"><FaMotorcycle /></div>
                <div className="card-content">
                    <h3>Total de Motos</h3>
                    <p>{totalMotos.toLocaleString()}</p>
                </div>
            </div>
            <div className="stat-card">
                <div className="card-icon"><FaTag /></div>
                <div className="card-content">
                    <h3>Precio Promedio</h3>
                    <p>${Math.round(avgPrice).toLocaleString()}</p>
                </div>
            </div>
            <div className="stat-card">
                <div className="card-icon"><FaTachometerAlt /></div>
                <div className="card-content">
                    <h3>Km Promedio</h3>
                    <p>{Math.round(avgKm).toLocaleString()} km</p>
                </div>
            </div>
        </div>
    );
};

export default StatsCards;