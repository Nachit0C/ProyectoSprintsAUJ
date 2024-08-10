// Importo los módulos
const fs = require('fs');
const path = require("path");

const sprintsPath = path.join(__dirname, "../sprints.json");

// La función getSprints devuelve la lista de usuarios
async function getSprints(req, res) {
    try {
        const sprints = await readSprints();
        res.status(200).json({ message:'Éxito al obtener sprints', sprints });
    } catch (err) {
        res.status(500).json({ error: 'Error obteniendo sprints' });
    }
}

// La función getSprint devuelve al sprint requerido con id
async function getSprint(req, res) {
    const sprintId = req.params.id;

    try{
        const sprints = await readSprints();
        // Obtengo el sprint con el id
        const sprint = sprints.find(sprint => sprint.sprintId === parseInt(sprintId));
        if (!sprint){
            return res.status(404).json({ error: 'Sprint no encontrado' });
        } 
        res.status(200).json({ message:'Éxito al obtener sprint', sprint });
    } catch (err) {
        res.status(500).json({ error: 'Error obteniendo sprint' });
    }
}

// La función creatSprint crea un nuevo sprint y devuelve la lista de sprints
async function createSprint(req, res) {
    // Guardo los datos recibidos en una constante
    const newData = req.body;
    // Valido los datos
    if(!validarDatosSprint(newData)){
        res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try{
        // Traigo la lista de sprints
        const sprints = await readSprints();
        // Si la lista no tiene sprints, asigno '1' a newSprintId. Si ya tiene sprints, busco el mayor id, le sumo 1 y se lo asigno a newSprintId.
        const newSprintId = (sprints.length === 0) ? 1 : (sprints.reduce((mayorId, sprint) => (sprint.sprintId > mayorId) ? sprint.sprintId : mayorId, 0) + 1);
        
        // Creo el nuevo sprint para agregar a la lista de sprints
        const newSprint = {
            sprintId: newSprintId,
            nombre: newData.nombre,
            fechaInicio: newData.fechaInicio,
            fechaFinal: newData.fechaFinal,
            objetivo: newData.objetivo,
            equipo: newData.equipo,
            tareas: newData.tareas
        };

        // Agrego el nuevo sprint a la lista
        sprints.push(newSprint);

        // Sobreescribo la lista de sprints con la lista nueva
        await writeSprints(sprints);

        res.status(201).json({ message:'Éxito al agregar un nuevo sprint', sprints });
    } catch(err){
        res.status(500).json({ error: 'Error al agregar un nuevo sprint' });
    }
}

// La función updateSprint actualiza un sprint y devuelve la lista de sprints
async function updateSprint(req, res) {
    // Guardo los datos recibidos en una constante
    const sprintId = req.params.id;
    const newData = req.body;
    // Valido los datos
    if(!validarDatosSprint(newData)){
        res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try{
        const sprints = await readSprints();

        const updatedSprint = {
            sprintId: parseInt(sprintId),
            nombre: newData.nombre,
            fechaInicio: newData.fechaInicio,
            fechaFinal: newData.fechaFinal,
            objetivo: newData.objetivo,
            equipo: newData.equipo,
            tareas: newData.tareas
        };

        // Busco el índice del sprint en la lista
        const index = sprints.findIndex(sprint => sprint.sprintId === parseInt(sprintId));
        if (index === -1){
            return res.status(404).json({ error: 'Sprint no encontrado' });
        }

        // Modifico la lista, reemplazando el sprint con los datos actualizados
        sprints[index] = updatedSprint;

        // Sobreescribo la lista de sprints con la lista nueva
        await writeSprints(sprints);

        res.status(200).json({ message:'Éxito al actualizar sprint', sprints });

    } catch(err){
        res.status(500).json({ error: 'Error al actualizar sprint' });
    }
}

// La función deleteSprint elimina un sprint y devuelve la lista de sprints
async function deleteSprint(req, res) {
    const sprintId = req.params.id;

    try {
        const sprints = await readSprints();

        // Filtro los sprints para excluir el sprint con el sprintId especificado
        const updatedSprints = sprints.filter(sprint => sprint.sprintId !== parseInt(sprintId));

        // Verifica si algún sprint fue eliminado
        if (sprints.length === updatedSprints.length) {
            return res.status(404).json({ error: 'Sprint no encontrado' });
        }

        // Sobreescribo la lista de sprints con la lista actualizada
        await writeSprints(updatedSprints);

        res.status(200).json({ message:'Éxito al eliminar sprint', updatedSprints });

    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar sprint' });
    }
}

// La función readSprints devuelve la lista de sprints del archivo JSON
function readSprints () {
    return new Promise((resolve, reject) => {
        fs.readFile(sprintsPath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            const sprints = JSON.parse(data);
            resolve(sprints);
        });
    });
}

// La función writeSprints escribe la lista de sprints en el archivo JSOIN
function writeSprints(sprints) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(sprints, null, 2); 
        fs.writeFile(sprintsPath, data, 'utf8', (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

function validarDatosSprint(newData){
    if (!newData.nombre || !newData.fechaInicio || !newData.fechaFinal || !newData.objetivo || !newData.equipo || !newData.tareas) {
        return false;
    } 
    return true;
}

// La función chequea si el sprint existe
async function sprintExists(sprintId){
    try{
        const sprints = await readSprints();
        // Obtengo el sprint con el id
        const sprint = sprints.find(sprint => sprint.sprintId === parseInt(sprintId));
        return !!sprint;
    } catch (err) {
        return false;
    }
}

// Exporto las funciones
module.exports = {getSprints, getSprint, createSprint, updateSprint, deleteSprint, sprintExists};