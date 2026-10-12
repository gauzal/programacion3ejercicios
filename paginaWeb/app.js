
/*document.addEventListener('DOMContentLoaded', () => {
    const divResultado = document.getElementById('resultado');
    divResultado.innerHTML = '<p>Cargando...</p>'; */
const btnCargar = document.getElementById('btnCargar');   
btnCargar.addEventListener('click', () => {
    const divResultado = document.getElementById('resultado');
    divResultado.innerHTML = '<p>Cargando...</p>';

// Promesa inicial:
    fetch(`http://localhost:3000/api/clientes`)
        .then(response => {
            if (response.status === 404) {
                return response.json().then(res => { throw new Error(res.message); });
            }
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(res => {            
            const listaClientes = res.map(cliente => 
             `<li>DNI: ${cliente.dni} Nombre: ${cliente.nombre} Email: ${cliente.email}</li>`
);          divResultado.innerHTML = "<ul>\n" + listaClientes.join('\n') + "\n</ul>";
           
        })
        .catch(err => {
            console.error('Error:', err);
            divResultado.innerHTML = `<p class="error">${err.message || 'Error al consultar datos en Node.js.'}</p>`;            
        });
});