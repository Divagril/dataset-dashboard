import pandas as pd

# --- PARÁMETROS DEL FINANCIAMIENTO (Puedes ajustarlos) ---
DESCUENTO_SENATI = 0.10  # 10% de descuento sobre el precio de venta
PLAZO_MESES = 24         # Financiamiento a 24 meses
INTERES_ANUAL = 0.08     # 8% de interés anual simple

# Cargar el dataset original
try:
    df = pd.read_csv('BIKE DETAILS.csv')
    print("Archivo 'BIKE DETAILS.csv' cargado correctamente.")
except FileNotFoundError:
    print("Error: Asegúrate de que 'BIKE DETAILS.csv' esté en la misma carpeta que este script.")
    exit()

# 1. Añadir un ID único para cada moto
df.insert(0, 'id', range(1, 1 + len(df)))

# 2. Calcular el precio especial para estudiantes de Senati
df['precio_senati'] = df['selling_price'] * (1 - DESCUENTO_SENATI)
df['precio_senati'] = df['precio_senati'].astype(int)

# 3. Calcular la cuota mensual estimada (interés simple)
capital = df['precio_senati']
interes_total = capital * INTERES_ANUAL * (PLAZO_MESES / 12)
monto_total = capital + interes_total
df['cuota_mensual'] = monto_total / PLAZO_MESES
df['cuota_mensual'] = df['cuota_mensual'].astype(int)

# Guardar el nuevo archivo CSV
nuevo_nombre = 'BIKE_DETAILS_FINANCIAMIENTO.csv'
df.to_csv(nuevo_nombre, index=False)

print(f"¡Éxito! Se ha creado el archivo '{nuevo_nombre}' con las nuevas columnas.")
print("Ahora, mueve este nuevo archivo a tu carpeta 'public'.")