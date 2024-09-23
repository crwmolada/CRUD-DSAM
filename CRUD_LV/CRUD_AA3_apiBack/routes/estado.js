'use strict'

var express = require('express');
var EstadoController = require('../controllers/estado');

var router = express.Router();

//RUTAS PARA LAS ASISTENCIAS
router.get('/estado', EstadoController.list);
router.get('/estado/:id', EstadoController.find);
router.post('/estado/save', EstadoController.save);

module.exports = router;