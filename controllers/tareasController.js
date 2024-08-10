// Importo los módulos
const fs = require('fs');
const path = require("path");
const userController = require('../controllers/userController');
const sprintsController = require('../controllers/sprintsController');

const tareasPath = path.join(__dirname, "../tareas.json");

// La función getTareas devuelve la lista de tareas
async function getTareas(req, res) {
    try {
        const tareas = await readTareas();
        res.status(200).json({ message:'Éxito al obtener tareas', tareas });
    } catch (err) {
        res.status(500).json({ error: 'Error obteniendo tareas' });
    }
}

// La función getTarea devuelve la tarea requerida con id
async function getTarea(req, res) {
    const tareaId = req.params.id;

    try{
        const tareas = await readTareas();
        // Obtengo la tarea con el id
        const tarea = tareas.find(tarea => tarea.tareaId === parseInt(tareaId));
        if (!tarea){
            return res.status(404).json({ error: 'Tarea no encontrada' });
        } 
        res.status(200).json({ message:'Éxito al obtener tarea', tarea });
    } catch (err) {
        res.status(500).json({ error: 'Error obteniendo tarea' });
    }
}

// La función createTarea crea una nueva tarea y devuelve la lista de tareas
async function createTarea(req, res) {
    // Guardo los datos recibidos en una constante
    const newData = req.body;
    // Valido los datos
    if(!validarDatosTarea(newData)){
        res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try{
        // Traigo la lista de tareas
        const tareas = await readTareas();
        // Si la lista no tiene tareas, asigno '1' a newTareaId. Si ya tiene tareas, busco el mayor id, le sumo 1 y se lo asigno a newTareaId.
        const newTareaId = (tareas.length === 0) ? 1 : (tareas.reduce((mayorId, tarea) => (tarea.tareaId > mayorId) ? tarea.tareaId : mayorId, 0) + 1);
        
        // Creo la nueva tarea para agregar a la lista de tareas
        const newTarea = {
            tareaId: newTareaId,
            sprintId: newData.sprintId,
            userId: newData.userId,
            fechaFinal: newData.fechaFinal,
            objetivo: newData.objetivo,
            status: newData.status
        };

        // Agrego la nueva tarea a la lista
        tareas.push(newTarea);

        // Sobreescribo la lista de tareas con la lista nueva
        await writeTareas(tareas);

        res.status(201).json({ message:'Éxito al agregar una nueva tarea', tareas });
    } catch(err){
        res.status(500).json({ error: 'Error al agregar una nueva tarea' });
    }
}

// La función updateTarea actualiza una tarea y devuelve la lista de tareas
async function updateTarea(req, res) {
    // Guardo los datos recibidos en una constante
    const tareaId = req.params.id;
    const newData = req.body;
    // Valido los datos
    if(!validarDatosTarea(newData)){
        res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try{
        const tareas = await readTareas();

        const updatedTarea = {
            tareaId: parseInt(tareaId),
            sprintId: newData.sprintId,
            userId: newData.userId,
            fechaFinal: newData.fechaFinal,
            objetivo: newData.objetivo,
            status: newData.status
        };

        // Busco el índice de la tarea en la lista
        const index = tareas.findIndex(tarea => tarea.tareaId === parseInt(tareaId));
        if (index === -1){
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        // Modifico la lista, reemplazando la tarea con los datos actualizados
        tareas[index] = updatedTarea;

        // Sobreescribo la lista de tareas con la lista nueva
        await writeTareas(tareas);

        res.status(200).json({ message:'Éxito al actualizar tarea', tareas });

    } catch(err){
        res.status(500).json({ error: 'Error al actualizar tarea' });
    }
}

// La función deleteTarea elimina una tarea y devuelve la lista de tareas
async function deleteTarea(req, res) {
    const tareaId = req.params.id;

    try {
        const tareas = await readTareas();

        // Filtro las tareas para excluir la tarea con la tareaId especificada
        const updatedTareas = tareas.filter(tarea => tarea.tareaId !== parseInt(tareaId));

        // Verifica si algúna tarea fue eliminada
        if (tareas.length === updatedTareas.length) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        // Sobreescribo la lista de tareas con la lista actualizada
        await writeTareas(updatedTareas);

        res.status(200).json({ message:'Éxito al eliminar tarea', updatedTareas });

    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar tarea' });
    }
}

// La función readTareas devuelve la lista de tareas del archivo JSON
function readTareas () {
    return new Promise((resolve, reject) => {
        fs.readFile(tareasPath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            const tareas = JSON.parse(data);
            resolve(tareas);
        });
    });
}

// La función writeTareas escribe la lista de tareas en el archivo JSOIN
function writeTareas(tareas) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(tareas, null, 2); 
        fs.writeFile(tareasPath, data, 'utf8', (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

function validarDatosTarea(newData){
    if (!newData.objetivo || !newData.status || !(userController.userExists(newData.userId)) || !(sprintsController.sprintExists(newData.sprintIdId)) ) {
        return false;
    }
    return true;
}

// Exporto las funciones
module.exports = {getTareas, getTarea, createTarea, updateTarea, deleteTarea};