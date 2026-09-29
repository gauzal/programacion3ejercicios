/*ejercicio:  A partir de par1A_05.js modificar el código para que la salida de HTML 
renderizada en lugar de ir a un "console.log()" vaya a un archivo plano llamado "salida.html"*/



const opcionesSelect1 = ['Ma&ntilde;ana', 'Tarde', 'Noche','Tardecita','Ma&ntilde;ana muy temprano'];
const selectA = `<select id="sel1" class="opciones">\n
        ${opcionesSelect1.map(aux => `<option value=${aux}>${aux}</option>`).join('\n')}
        </select>`;
console.log(selectA);  

const fs= require('fs').promises;

async function writeFileOpciones(){
    try{
        await  fs.writeFile('salida.html', selectA,'utf8');
        console.log('Archivo creado exitosamente');
    } catch (err){
        console.error('Error al crear archivo:', err);

    }

}
writeFileOpciones();