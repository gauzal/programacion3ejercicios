const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'db',
  user: 'prog3',
  password: 'admin123',
  database: 'datos',
  waitForConnections: true,
  connectionLimit: 10
});

app.get('/api/clientes', (req, res) => {  
  pool.query('SELECT * FROM clientes')
    .then(([rows]) => {
      if (rows.length === 0) {
        return res.status(404).json({ message: 'No hay clientes registrados' });
      }
      res.json(rows);
    })
    .catch(err => {
      console.error('Error en MySQL:', err);
      res.status(500).json({ error: 'Error en el servidor Node.js' });
    });
});

app.listen(3000, () => {
  console.log('Servidor Node.js escuchando en el puerto 3000');
});