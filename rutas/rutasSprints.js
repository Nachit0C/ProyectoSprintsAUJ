// Importo los módulos
const express = require('express');
const router = express.Router();

// Importo los archivos controller
const sprintsController = require('../controllers/sprintsController');

// Designo el callback indicado a cada llamado dependiendo la ruta
router.get('/all', sprintsController.getSprints);

router.get('/:id', sprintsController.getSprint);

router.post('/create', sprintsController.createSprint);

router.put('/update/:id', sprintsController.updateSprint);

router.delete('/delete/:id', sprintsController.deleteSprint);

// Exporto el módulo
module.exports = router;