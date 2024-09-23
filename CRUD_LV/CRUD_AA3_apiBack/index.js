'use strict' //USO ESTRICTO DE JS

var mongoose = require('mongoose');
var app = require('./app'); // llamo al app.js
var port = process.env.PORT || 3999; // para hacer un kill en la terminal: netstat

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv:', { useNewUrlParser : true}) //parsea la connexión
.then( //SI LA CONEXIÓN ES CORRETA, ME MUESTRA EL MENSAJE
    () => {
        console.log('La conexión a la db es correcta');

        // CREANDO SERVIDOR
        app.listen(port, () => {
                console.log('El servidor http://localhost:' + port + ' está funcionando')//creamos url agregandole el puerto añadido
            }
        );
    }
)
.catch(
    error => console.log(error) //ATRAPA EL ERROR DE CONEXIÓN
);