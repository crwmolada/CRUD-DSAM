// Este controlador me sirve como gestinador, me da lo que busco y me lo muestra por vista
'use strict' // para que fuerse a utilizarce el uso estricto

var client = require('../database/db');
var db = client.db('alumnosAsistencia'); // se ingresa el nombre de la base de datos

var controller = {
    listar: function (req, res) {
        console.log('--------------------------------');
        console.log('Entrando a la funcion LISTAR');

        db.collection('libreria').find().toArray() // PORQUE PARA DEVOLVERLO COMO LISTA
            .then(
                librerias => {
                    // renderiza la vista
                    res.render('libreria_list', { dataLibreria: librerias }); //empaquetamos el parametro en una propiedad creada
                }
            )
            .catch(
                error => console.error(error)
            );
    },
    form: function (req, res) {
        console.log('--------------------------------');
        console.log('ENTRANDO A LA FUNCIÓN FORM');
        console.log("id:" + req.params.id);
        /*req.params.id => 
            La ruta que creamos en Routs, redirecciona a controllers, y el controlador me devuelve la vista, me tiene que enviar un id y ese ID va a ser 
            0, para obtener ese valor, para sacar ese parámetro decimos: req.params.id*/

        if (req.params.id == 0) {
            var librerias = {}  // cremaos un objeto vacio lo cual luego llenaremos
            // cuando el controlador evalue que le enviamos un 0, lo detecta y le envia un objeto vacio renderizandolo. 
            librerias.idLibreria = 0;
            librerias.alumno = '';
            librerias.libro = '';
            librerias.estado = '';
           
            

            res.render('libreria_form', { libreriaForm: librerias })
            //renderizamos nuestra vista y en llave le enviamos nuestro paquete con un objeto, en mi caso "libreria""
        }
 
    },
    save: function (req, res) {
        console.log('--------------------------------');
        console.log('ENTRANDO A LA FUNCIÓN SAVE');
        console.log(req.body);

        if (req.body.idLibreria == 0) { // nuevo
            db.collection('libreria').countDocuments().then(
                countLibreria => {
                    var librerias = {}
                    librerias.idLibreria = countLibreria + 1;
                    librerias.alumno = req.body.alumno;
                    librerias.libro = req.body.libro;
                    librerias.estado = req.body.estado;

                    db.collection('libreria').insertOne(librerias)
                        .then(
                            () => {
                                // regresa a la lista de libros
                                res.redirect('/libreria/list');
                            }
                        )
                        .catch(
                            error => console.error(error)
                        );
                }
            );

        }
       
    }
  
}


module.exports = controller;
