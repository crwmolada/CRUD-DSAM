'use strict'

var express = require('express');
var LibreriaController = require('../controllers/libreria');

var router = express.Router();

//RUTAS PARA LA LIBRERIA
router.get('/libreria', LibreriaController.list);
router.get('/libreria/:id', LibreriaController.find);
router.post('/libreria/save', LibreriaController.save);

module.exports = router;