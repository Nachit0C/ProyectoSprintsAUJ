// Importo los módulos
const express = require('express');
const router = express.Router();

// Importo los archivos controller
const tareasController = require('../controllers/tareasController');

// Designo el callback indicado a cada llamado dependiendo la ruta
router.get('/all', tareasController.getTareas);

router.get('/:id', tareasController.getTarea);

router.post('/create', tareasController.createTarea);

router.put('/update/:id', tareasController.updateTarea);

router.delete('/delete/:id', tareasController.deleteTarea);

// Exporto el módulo
module.exports = router;