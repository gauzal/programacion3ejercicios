/* Actividad 1 (Nivel Inicial) — Contador Total de Registros:
Modifica el encabezado de la aplicación (<View style={styles.encabezado}>) para que muestre dinámicamente
cuántos productos se descargaron desde la base de datos. Ejemplo: 'Total en catálogo: 6 productos'. Pista: recuerda
que el estado 'productos' es un Array y puedes consultar su propiedad .length dentro de llaves {}.
/ */

/*Actividad 2 (Nivel Inicial) — Botón de Actualización Manual:
Además del gesto de deslizar hacia abajo, agrega en el encabezado un botón visible (<TouchableOpacity>) con eltexto '
🔄
Actualizar' que al presionarlo (onPress) vuelva a ejecutar la función consultarProductos(). */

/**Actividad 3 (Nivel Intermedio) — Alerta de 'Últimas Unidades' (Stock Crítico):
Actualmente las etiquetas de stock se muestran en rojo si el stock es 0 y en verde si es mayor a 0. Modifica la
función renderProducto y el objeto StyleSheet para incorporar un tercer estado visual: si el stock es mayor a 0 pero
menor o igual a 5 (item.stock > 0 && item.stock <= 5), la etiqueta debe mostrarse en color amarillo/naranja con la
leyenda '¡Últimas X unidades!'. */

/**Actividad 4 (Nivel Intermedio) — Buscador en Tiempo Real por Marca o Descripción:
Importa el componente TextInput desde 'react-native' y crea un nuevo estado llamado const [busqueda,
setBusqueda] = useState(''). Coloca una caja de texto arriba de la lista para que el usuario pueda escribir una marca
(ej: 'Logitech') y filtra el arreglo que recibe la FlatList usando productos.filter(...) para mostrar solo los productos
que coincidan. */

/**Actividad 5 (Nivel Avanzado) — Incorporación del Campo 'precio':
1) En el servidor MySQL, agrega una columna 'precio DECIMAL(10,2) DEFAULT 0.00' a la tabla productos01 y asigna 
precios a los productos.
2) Actualiza la consulta SQL del endpoint si es necesario.
3) Modifica el componente renderProducto en App.js para mostrar el precio formateado con el signo '$' destacado 
en cada tarjeta. */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput
} from 'react-native';
// URL del endpoint que consulta la base de datos
const API_URL = 'http://192.168.68.34:3000/api/base/';
export default function App() {
  // Estados para almacenar la lista de productos, el estado de carga y errores
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');   {/** agregamos el hook useState funcion especial de react*/}

  const productosFiltrados = productos.filter(item =>
    item.marca.toLowerCase().includes(busqueda.toLowerCase()) ||                   
    item.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );                      {/**agregamos el filtro a la altura de los estados */}                                             

  // Función que consulta el endpoint remoto mediante Promesas (.then / .catch)
  const consultarProductos = () => {
    setCargando(true);
    setError(null);
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        if (json.status === 'success') {
          setProductos(json.data);
        } else if (Array.isArray(json)) {// Soporte directo por si el endpoint devuelve el array de filas directamente
          setProductos(json);
        } else {
          throw new Error(json.message || 'Formato de respuesta no reconocido');
        }
      })
      .catch(err => {
        console.error('Error al conectar con el backend:', err);
        setError('No se pudo obtener la información desde https://progra3/api/base/');
      })
      .finally(() => {
        setCargando(false);
      });
  };
  // useEffect ejecuta la consulta automáticamente al abrir la pantalla
  useEffect(() => {
    consultarProductos();
  }, []);
  // Función encargada de dibujar cada fila de la tabla productos01
  const renderProducto = ({ item }) => {
    const sinStock = Number(item.stock) === 0;
    const alertaStock = Number(item.stock) > 0 && Number(item.stock)<= 5 ; {/** 3- creamos nuevo estado, lo agregarmos al operador ternario*/}  
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.idTexto}>ID #{item.id}</Text>
          <Text style={styles.marcaTexto}>{item.marca}</Text>
        </View>
        <Text style={styles.descripcionTexto}>{item.descripcion}</Text>
        <Text style={styles.precioTexto}>$ {item.precio}</Text>
        <View style={styles.cardFooter}>
          <Text style={[
            styles.stockBadge,
            sinStock ? styles.sinStock : (alertaStock ? styles.alertaStock : styles.conStock)    
          ]}>
            {sinStock ? 'SIN STOCK' : (alertaStock ? `¡Últimas ${item.stock} unidades!` : `Stock: ${item.stock} unidades`)}
          </Text>
        </View>
      </View>
    );
    
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f4f8" />
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>Catálogo de Productos</Text>
        <Text style={styles.subtitulo}>Tabla: productos01 | Origen:
          https://progra3/api/base/</Text>
        <Text style={styles.subtitulo}>Total en catalogo: {productos.length} productos</Text> {/** 1- CONTADOR DE REGISTROS */}
        <TextInput  
          value={busqueda}
          onChangeText={setBusqueda}
          placeholder="Buscar por marca o descripción..."
        /> {/** 4- agregamos la caja de texto textInput  */}
        <TouchableOpacity style={styles.botonReintentar} onPress={consultarProductos}>     {/**2- agrega en el encabezado un botón visible para actualizar */}
            <Text style={styles.textoBoton}>Actualizar</Text>
        </TouchableOpacity>
      </View>
      {cargando ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#2b6cb0" />
          <Text style={styles.textoEstado}>Consultando base de datos...</Text>
        </View>
      ) : error ? (
        <View style={styles.centro}>
          <Text style={styles.textoError}>{error}</Text>
          <TouchableOpacity style={styles.botonReintentar} onPress={consultarProductos}>
            <Text style={styles.textoBoton}>Reintentar consulta</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={productosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProducto}
          contentContainerStyle={styles.lista}
          onRefresh={consultarProductos}
          refreshing={cargando}
          ListEmptyComponent={
            <Text style={styles.textoEstado}>No hay productos cargados en
              productos01.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}  {/**agregamos el stylesheet alertaStock */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingTop: 35,
  },
  encabezado: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#d9e2ec',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#102a43',
  },
  subtitulo: {
    fontSize: 12,
    color: '#627d98',
    marginTop: 4,
  },
  lista: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  idTexto: {
    fontSize: 13,
    fontWeight: 'bold', color: '#829ab1',
  },
  marcaTexto: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2b6cb0',
    textTransform: 'uppercase',
  },
  descripcionTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#243b53',
    marginBottom: 12,
  },
   precioTexto: {
    fontSize: 18,
    fontWeight: '600',
    color: '#050244',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  stockBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  conStock: {
    backgroundColor: '#c6f6d5',
    color: '#22543d',
  },
  sinStock: {
    backgroundColor: '#fed7d7',
    color: '#742a2a',
  },
  alertaStock: {
    backgroundColor: '#feebc8',   
    color: '#f58412',
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  textoEstado: {
    marginTop: 12,
    color: '#486581',
    fontSize: 15, textAlign: 'center',
  },
  textoError: {
    color: '#c53030',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 16,
  },
  botonReintentar: {
    backgroundColor: '#3182ce',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBoton: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});