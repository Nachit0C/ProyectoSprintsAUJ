// Importo los módulos
const express = require('express');
const cors = require('cors');

// Importo las rutas
const users = require('./rutas/rutasUsers');
const sprints = require('./rutas/rutasSprints');

const PORT = process.env.PORT || 3000;

// Creo la app del servidor
const app = express();
// La configuro
app.use(cors());
app.use(express.json());

// Designo las rutas principales con su respectivo callback 
app.get('/', ()=>{
    console.log("Bienvenid@ al servidor, aqui se demostrarán los conocimientos para ingresar al programa Adopta Un Junior!");
});

app.use('/users', users);

app.use('/sprints', sprints);

// Inicializo el servidor
app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});