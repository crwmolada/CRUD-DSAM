'use strict'

// REQUIRES
var express = require('express');
var LibreriaController = require('../controllers/libreria');

var router = express.Router();

// RUTAS PARA LIBRERIA
router.get('/libreria/list', LibreriaController.listar); 
router.get('/libreria/form/:id', LibreriaController.form); 

router.post('/libreria/save', LibreriaController.save);



module.exports = router;