'use strict'

var express = require('express');
var AsistenciaController = require('../controllers/asistencia');

var router = express.Router();

//RUTAS PARA LAS ASISTENCIAS
router.post('/asistencia/filtros', AsistenciaController.filtrar);
router.get('/asistencia', AsistenciaController.list);
router.get('/asistencia/:id', AsistenciaController.find);
router.post('/asistencia/save', AsistenciaController.save);
router.get('/reporte/estadoPorAsistencia', AsistenciaController.reporteEstado);
router.delete('/asistencia/:ordenLlegada', AsistenciaController.eliminar);



module.exports = router;