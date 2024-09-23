'use strict'

//REQUIRES
var express = require('express');
var bodyParser = require('body-parser'); 

//CARGAR ARCHIVO DE RUTAS
var asistencia_routes = require('./routes/asistencia');
var libreria_routes = require('./routes/libreria');
var estado_routes = require('./routes/estado');
var turno_routes = require('./routes/turno');


//EJECUTAR EXPRESS
var app = express();


// AREGANDO LOS MIDDLEWARES
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json()); 

// CONFIGURAS CABECERAS Y CORS
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// REECRIBIR RUTAS
app.use("/api", asistencia_routes);
app.use('/api', libreria_routes);
app.use('/api', estado_routes);
app.use('/api', turno_routes);


// EXPORTAR MODULOS
module.exports = app;