/** Ejercicio 6: 
 * Procesamiento de archivos con Promesas (fs/promises) 
Consigna: 
Escribir la función procesarPrecios(rutaArchivo) utilizando el módulo fs/promises. 
Requerimientos: 
1. Leer un archivo de texto con un precio numérico por línea. 
2. Mediante encadenamiento de .then(): 
a. Convertir el texto en un array de números. 
b. Filtrar los precios mayores a 100. 
c. Aplicar un 10% de descuento a cada precio resultante. 
3. Imprimir el array final. 

4. Capturar errores con .catch(). */

const fs = require('fs/promises');

function procesarPrecios(rutaArchivo) {
  return fs.readFile(rutaArchivo, 'utf-8')
    .then(contenido => {
      return contenido.split('\n'); 
    })
    .then(lineas => {
      return lineas.map(precio => Number(precio.trim()));
    })
    .then(precios => {
      return precios.filter(precio => precio > 100);
    })
    .then(preciosFiltrados => {
      return preciosFiltrados.map(precio => precio * 0.9);
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log('No se ha podido leer el archivo');
    });
}

/*const fs = require('fs/promises');*/
function procesarPrecios(rutaArchivo) {
  fs.readFile(rutaArchivo, 'utf-8')
    .then(contenido => contenido.split('\n'))
    .then(lineas => lineas.map(linea => Number(linea.trim())))
    .then(precios => precios.filter(precio => precio > 100))
    .then(preciosFiltrados => preciosFiltrados.map(precio => precio * 0.9))
    .then(preciosConDescuento => {
      console.log('Precios finales con descuento:', preciosConDescuento);
    })
    .catch(err => {
      console.error('Error al procesar el archivo de precios:', err.message);
    });
}

/**Ejercicio 7: Petición HTTP con async / await 
Consigna: 
Escribir la función asíncrona obtenerAlumnosDestacados(url) que cumpla con: 
1. Realizar la petición fetch() dentro de un bloque try...catch.
2. Verificar la propiedad ok de la respuesta (lanzar error en caso contrario). 
3. Convertir la respuesta con .json(). 
4. Retornar e imprimir un array con los nombres (nombre) de aquellos alumnos con  
nota (nota) mayor o igual a 7.  */

async function obtenerAlumnosDestacados(url) {
    try {
        const response = await fetch(url);
        if (!response.ok){
            throw new Error('Error en el servidor: HTTP ' + response.status);
        }  
        const alumnos = await response.json();   
        const destacados = alumnos.filter(alumno => alumno.nota >= 7)
        .map(alumno => alumno.nombre);  
        console.log(destacados);   
        return destacados;
    }
    catch (err) {
        console.error('Error al completar solicitud:', err.message);
    }
}

/** Ejercicio 8: Manejo de Callbacks (fs tradicional)
Consigna:
Escribir la función contarLineas(rutaArchivo) utilizando fs.readFile con la firma 
estándar Error-First Callback.
Requerimientos:
1. Manejar el parámetro de error imprimiendo un mensaje y finalizando la función en 
caso de falla.
2. Si la lectura es exitosa, contar las líneas del archivo e imprimir: "El archivo 
[rutaArchivo] tiene X líneas.". */

const fs = require('fs');

function contarLineas(rutaArchivo){
    fs.readFile(rutaArchivo,'utf-8', (err,data)=>{
        if(err)
        {
            console.error('Ocurrio un error al leer', err);
            return;
        }

        const lineas = data.split('\n');
        console.log(`El archivo ${rutaArchivo} tiene ${lineas.length} líneas.`)        
    })

}