'use strict'

// REQUIRES
var express = require('express');
var AsistenciaController = require('../controllers/asistencia');

var router = express.Router();

// RUTAS PARA ASISTENCIAS
router.get('/asistencia/list', AsistenciaController.listar); // router.get porque estamos invocando uan ruta
router.get('/asistencia/form/:id', AsistenciaController.form); 
// el id va a recibir dos cosas, si recibe 0 abre un formulario vacio, id>0 , será un formulario para editar
router.post('/asistencia/save', AsistenciaController.save);
//router.get('/asistencia/editar/id:', AsistenciaController.editar);
// en este caso utilizaremos post y no get porque no estamos recibiendo sino enviando


module.exports = router;