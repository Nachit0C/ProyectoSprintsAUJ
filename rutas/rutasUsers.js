// Importo los módulos
const express = require('express');
const router = express.Router();

// Importo los archivos controller
const userController = require('../controllers/userController');

// Designo el callback indicado a cada llamado dependiendo la ruta
router.get('/all', userController.getUsers);

router.get('/:id', userController.getUser);

router.post('/create', userController.createUser);

router.put('/update/:id', userController.updateUser);

router.delete('/delete/:id', userController.deleteUser);

// Exporto el módulo
module.exports = router;