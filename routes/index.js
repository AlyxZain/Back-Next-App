/** @format */

const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const authRouter = require('./auth');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/auth', authRouter);

module.exports = router;
