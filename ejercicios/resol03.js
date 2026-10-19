/*
Ejercicio 3: Pipeline Contable de Métricas de Ventas (ejercicio03.js)
    • Objetivo: Aplicar el encadenamiento de métodos (Method Chaining) procesando 
    datos con .filter(), .map() y .reduce().
    • Consigna: Dada la lista de facturas registradas en un sistema:
 */
      const facturas = [
        { nro: 1001, cliente: 'TechCorp', monto: 5000, pagada: true },
        { nro: 1002, cliente: 'GlobalSvc', monto: 1200, pagada: false },
        { nro: 1003, cliente: 'InduData', monto: 8500, pagada: true },
        { nro: 1004, cliente: 'SistemasSA', monto: 3100, pagada: false },
        { nro: 1005, cliente: 'PymeLab', monto: 2400, pagada: true }
      ];
/*      
1. Construí un Pipeline Funcional encadenado en una sola sentencia que realice lo siguiente:
            ▪ Filtrar solo las facturas que estén cobradas (pagada === true).
            ▪ Mapear para calcular el monto final reteniendo un 21% de IVA (monto * 1.21).
            ▪ Reducir para obtener el monto total facturado final acumulado (cobrado).
2. Imprimí el resultado con el formato: Total cobrado con IVA: $X.
3. Imprimí el resultado con el total con y sin IVA de las facturas pendientes de cobro.
4. Responder ¿Qué ocurre si el arreglo de entrada (facturas) está vacío? ¿Cómo se evita
     que .reduce() arroje un error en tiempo de ejecución?
*/
// reduccion de memoria utilizada

const totalCobradoConIVA = facturas
  .filter(factura => factura.pagada) 
  .map(facturaCobrada => facturaCobrada.monto * 1.21)
  .reduce((acumuladorMonto, montoConIVA) => acumuladorMonto + montoConIVA, 0);
  console.log(`Total cobrado con iva: $ ${totalCobradoConIVA}`);

const totalPendienteConIVA = facturas
  .filter(factura => !factura.pagada)
  .map(facturaPendiente => facturaPendiente.monto * 1.21)
  .reduce((acumuladorMonto, montoConIVA) => acumuladorMonto + montoConIVA, 0);
  console.log(`Total adeudado con iva: $ ${totalPendienteConIVA}`);

 const totalPendienteSinIVA = facturas
  .filter(factura => !factura.pagada) 
  .reduce((acumuladorMonto, facturaPendiente) => acumuladorMonto + facturaPendiente.monto, 0);
  console.log(`Total adeudado sin iva: $ ${totalPendienteSinIVA}`);