/** @format */

const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const authRouter = require('./auth');
const taskRouter = require('./task');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/auth', authRouter);
router.use('/task', taskRouter);

module.exports = router;
