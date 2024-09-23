'use strict'

//REQUIRES
var express = require('express');

//CARGAR ARCHIVO DE RUTAS
var asistencia_routes = require('./routes/asistencia');
var libreria_routes = require('./routes/libreria');


//EJECUTAR EXPRESS
var app = express();


// ASISGANR DEPENDENCIA
app.set('view engine', 'ejs'); // las vistas serán de tipo 'ejs'


// DECODIFICACIÓN DE ENVIOS FORM
app.use(express.urlencoded({ extended : false }));
app.use(express.json()); 

// REECRIBIR RUTAS
app.use("/", asistencia_routes);
app.use('/', libreria_routes);


// EXPORTAR MODULOS
module.exports = app;