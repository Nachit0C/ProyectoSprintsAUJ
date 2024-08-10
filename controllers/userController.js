// Importo los módulos
const fs = require('fs');
const path = require("path");

const usersPath = path.join(__dirname, "../users.json");

// La función getUsers devuelve la lista de usuarios
async function getUsers(req, res) {
    try {
        const users = await readUsers();
        res.status(200).json({ message:'Éxito al obtener usuarios', users });
    } catch (err) {
        res.status(500).json({ error: 'Error obteniendo usuarios' });
    }
}

// La función getUsers devuelve al usuario requerido con id
async function getUser(req, res) {
    const userId = req.params.id;

    try{
        const users = await readUsers();
        // Obtengo el usuario con el id
        const user = users.find(user => user.userId === parseInt(userId));
        if (!user){
            return res.status(404).json({ error: 'Usuario no encontrado' });
        } 
        res.status(200).json({ message:'Éxito al obtener usuario', user });
    } catch (err) {
        res.status(500).json({ error: 'Error obteniendo usuario' });
    }
}

// La función creatUsers crea un nuevo usuario y devuelve la lista de usuarios
async function createUser(req, res) {
    // Guardo los datos recibidos en una constante
    const newData = req.body;
    // Valido los datos
    if(!validarDatosUser(newData)){
        res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try{
        // Traigo la lista de usuarios
        const users = await readUsers();
        // Si la lista no tiene users, asigno '1' a newUserId. Si ya tiene users, busco el mayor id, le sumo 1 y se lo asigno a newUserId.
        const newUserId = (users.length === 0) ? 1 : (users.reduce((mayorId, user) => (user.userId > mayorId) ? user.userId : mayorId, 0) + 1);
        
        // Creo el nuevo usuario para agregar a la lista de usuarios
        const newUser = {
            userId: newUserId,
            nombre: newData.nombre,
            apellido: newData.apellido,
            edad: newData.edad,
            email: newData.email,
            seniority: newData.seniority,
            rol: newData.rol
        };

        // Agrego el nuevo usuario a la lista
        users.push(newUser);

        // Sobreescribo la lista de usuarios con la lista nueva
        await writeUsers(users);

        res.status(201).json({ message:'Éxito al agregar un nuevo usuario', users });
    } catch(err){
        res.status(500).json({ error: 'Error al agregar un nuevo usuario' });
    }
}

// La función updateUsers actualiza un usuario y devuelve la lista de usuarios
async function updateUser(req, res) {
    // Guardo los datos recibidos en una constante
    const userId = req.params.id;
    const newData = req.body;
    // Valido los datos
    if(!validarDatosUser(newData)){
        res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try{
        const users = await readUsers();

        const updatedUser = {
            userId: parseInt(userId),
            nombre: newData.nombre,
            apellido: newData.apellido,
            edad: newData.edad,
            email: newData.email,
            seniority: newData.seniority,
            rol: newData.rol
        };

        // Busco el índice del usuario en la lista
        const index = users.findIndex(user => user.userId === parseInt(userId));
        if (index === -1){
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Modifico la lista, reemplazando el usuario con los datos actualizados
        users[index] = updatedUser;

        // Sobreescribo la lista de usuarios con la lista nueva
        await writeUsers(users);

        res.status(200).json({ message:'Éxito al actualizar usuario', users });

    } catch(err){
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
}

// La función deleteUser elimina un usuario y devuelve la lista de usuarios
async function deleteUser(req, res) {
    const userId = req.params.id;

    try {
        const users = await readUsers();

        // Filtro los usuarios para excluir el usuario con el userId especificado
        const updatedUsers = users.filter(user => user.userId !== parseInt(userId));

        // Verifica si algún usuario fue eliminado
        if (users.length === updatedUsers.length) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Sobreescribo la lista de usuarios con la lista actualizada
        await writeUsers(updatedUsers);

        res.status(200).json({ message:'Éxito al eliminar usuario', updatedUsers });

    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
}

// La función readUsers devuelve la lista de usuarios del archivo JSON
function readUsers () {
    return new Promise((resolve, reject) => {
        fs.readFile(usersPath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            const users = JSON.parse(data);
            resolve(users);
        });
    });
}

// La función readUsers escribe la lista de usuarios en el archivo JSOIN
function writeUsers(users) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(users, null, 2); 
        fs.writeFile(usersPath, data, 'utf8', (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

function validarDatosUser(newData){
    if (!newData.nombre || !newData.apellido || !newData.edad || !newData.email || !newData.seniority || !newData.rol) {
        return false;
    } 
    return true;
}

// La función chequea si el usuario existe
async function userExists(userId){
    try{
        const users = await readUsers();
        // Obtengo el usuario con el id
        const user = users.find(user => user.userId === parseInt(userId));
        return !!user;
    } catch (err) {
        return false;
    }
}

// Exporto las funciones
module.exports = {getUsers, getUser, createUser, updateUser, deleteUser, userExists};