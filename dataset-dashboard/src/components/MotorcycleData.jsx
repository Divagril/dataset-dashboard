import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const MotorcycleData = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/BIKE_DETAILS_FINANCIAMIENTO.csv');
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            const cleanedData = results.data.map(moto => {
              let purchaseType = '';
              const year = moto.year || 2000;
              const km = moto.km_driven || 50000;

              // --- INICIO DE LA MODIFICACIÓN ---
              // Hemos relajado las condiciones para que sea más probable encontrar "Motos Nuevas".
              // Ahora consideramos 'Nuevas' a las que son del año 2020 o más recientes y con menos de 10,000 km.
              if (year >= 2020 && km < 10000) {
                purchaseType = 'Motos Nuevas';
              } else if (year < 2018 && km > 20000) { // También ajustamos un poco esta
                purchaseType = 'Motos de Renta';
              } else {
                purchaseType = 'Motos de Segunda';
              }
              // --- FIN DE LA MODIFICACIÓN ---

              return {
                ...moto,
                manufacturer: moto.name ? moto.name.split(' ')[0] : 'Desconocido',
                owner: moto.owner || 'No especificado',
                purchaseType: purchaseType
              };
            }).filter(moto => moto.selling_price > 0 && moto.year > 1980);

            setData(cleanedData);
            setLoading(false);
          },
          error: (error) => {
            console.error("Error al parsear el CSV:", error);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Error al cargar el archivo CSV:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return children({ data, loading });
};

export default MotorcycleData;