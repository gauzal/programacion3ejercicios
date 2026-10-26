/*Ejercicio 1: Procesador de Calificaciones y Reporte HTML (ejercicio01.js)

Objetivo: Practicar transformación de objetos con .map(), operador spread (...), 
creación de marcado HTML y evitar el uso incorrecto de .map().

Consigna:Dado el siguiente arreglo de alumnos:JavaScript

const estudiantes = [
  { id: 1, nombre: 'Lucas', parcial1: 4, parcial2: 6 },
  { id: 2, nombre: 'Mariana', parcial1: 8, parcial2: 9 },
  { id: 3, nombre: 'Gonzalo', parcial1: 2, parcial2: 3 },
  { id: 4, nombre: 'Florencia', parcial1: 7, parcial2: 5 }
];

Utilizando .map() y el operador Spread (), generá un nuevo arreglo 
"estudiantesConPromedio" donde cada objeto conserve sus propiedades originales
e incorpore:
- promedio: Promedio numérico entre parcial1 y parcial2.
- condicion: String que valga 'APROBADO' si el promedio es mayor o igual 6
            o 'RECUPERA' si es menor.
 A partir del arreglo generado, utilizá .map() y .join() para crear una cadena
 de texto que genere una lista HTML con el formato:
 <li>Lucas - Promedio: 5 (RECUPERA)</li>
 Imprimí el HTML resultante por consola y verificá que el arreglo estudiantes
 original no haya sufrido ninguna mutación.
*/

const estudiantes = [
  { id: 1, nombre: 'Lucas', parcial1: 4, parcial2: 6 },
  { id: 2, nombre: 'Mariana', parcial1: 8, parcial2: 9 },
  { id: 3, nombre: 'Gonzalo', parcial1: 2, parcial2: 3 },
  { id: 4, nombre: 'Florencia', parcial1: 7, parcial2: 5 }
];
const estudiantesConPromedio = estudiantes.map(estudiante =>{const promedio = (estudiante.parcial1 + estudiante.parcial2)/2 ;
  const condicion = promedio >=6 ? 'APROBADO' : 'RECUPERA';  //operador ternario ? ==> forma corta y rápida de escribir una estructura condicional if / else en una sola línea de código. 3 partes separadas por ? y :
  return {
  ...estudiante, 
  promedio: promedio,
  condicion:condicion
  };
});    // VERSION CON RETURN

/* aca transformamos el array de objetos en un array de strings de HTML,
 donde cada elemento es una etiqueta <li> con los datos del alumno ya interpolados. */


const listaEstudiantes = estudiantesConPromedio.map(estudiante =>
  (`<li> ${estudiante.nombre} - promedio: ${ estudiante.promedio } (${estudiante.condicion }) </li>`))
const textoHTML = "<ul> \n"+ listaEstudiantes.join('\n')+ "\n</ul>";  // joinea en la cadena textoHTML.
console.log('--- ESTUDIANTES ---');
console.log(textoHTML);    
console.table(estudiantesConPromedio);  
/*

SIN RETURN : Para evitar que JavaScript piense que es un bloque de función y 
obligarlo a entender que querés devolver un objeto, se envuelve todo el objeto entre paréntesis:

const estudiantesConPromedio = estudiantes.map(estudiante => ({
  ...estudiante, 
  promedio: (estudiante.parcial1 + estudiante.parcial2) / 2,
  condicion: ((estudiante.parcial1 + estudiante.parcial2) / 2) >= 6 ? 'APROBADO' : 'RECUPERA'
}));       */           
