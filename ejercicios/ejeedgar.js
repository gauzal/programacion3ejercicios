
const estudiantes = [
  { id: 1, nombre: 'Lucas', parcial1: 4, parcial2: 6 },
  { id: 2, nombre: 'Mariana', parcial1: 8, parcial2: 9 },
  { id: 3, nombre: 'Gonzalo', parcial1: 2, parcial2: 3 },
  { id: 4, nombre: 'Florencia', parcial1: 7, parcial2: 5 }
];

const estudiantesConPromedio2 = estudiantes.map(e => ({
  ...e,
  promedio:  (e.parcial1 + e.parcial2) / 2,
  condicion: ((e.parcial1 + e.parcial2) / 2)>= 6 ? "Aprobado" : "Recupera"
}));

console.log("======== SOLUCIÓN EDGAR ===============")
console.table(estudiantesConPromedio2);