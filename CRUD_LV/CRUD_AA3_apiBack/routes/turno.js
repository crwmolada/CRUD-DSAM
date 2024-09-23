'use strict'

var express = require('express');
var TurnoController = require('../controllers/turno');

var router = express.Router();

//RUTAS PARA LAS ASISTENCIAS
router.get('/turno', TurnoController.list);
router.get('/turno/:id', TurnoController.find);
router.post('/turno/save', TurnoController.save);

module.exports = router;