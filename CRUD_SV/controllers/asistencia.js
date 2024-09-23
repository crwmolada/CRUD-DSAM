'use strict'

var client = require('../database/db');
var db = client.db('alumnosAsistencia'); // se ingresa el nombre de la base de datos

var controller = {
    listar: function (req, res) {
        console.log('--------------------------------');
        console.log('Entrando a la funcion LISTAR');

        db.collection('asistencia').find().toArray()
            .then(
                asistencia => {
                    // renderiza la vista
                    res.render('asistencia_list', { dataAsistencia: asistencia }); //empaquetamos el parametro en una propiedad creada
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

        if (req.params.id == 0) {
            var asistencia = {}
            // cuando el controlador evalue que le enviamos un 0, lo detecta y le envia un objeto vacio renderizandolo. 
            asistencia.numeroLlegada = 0;
            asistencia.nombreAlumno = '';
            asistencia.apellidoAlumno = '';
            asistencia.gradoAlumno = '';
            asistencia.dniAlumno = '';
            asistencia.turnoAlumno = '';


            res.render('asistencia_form', { asistenciaForm: asistencia })

        }
        else {
            db.collection("asistencia").find({ ordenLlegada: parseInt(req.params.id) }).toArray()
                .then(
                    registroEncontrado => {
                        console.log(registroEncontrado[0]);
                        res.render('asistencia_form', { asistenciaForm: registroEncontrado[0] });
                    }
                )
                .catch(
                    error => console.error(error)
                );
        }
    },
    save: function (req, res) {
        console.log('--------------------------------');
        console.log('ENTRANDO A LA FUNCIÓN SAVE');
        console.log(req.body);

        if (req.body.ordenLlegada == 0) {
            db.collection('asistencia').countDocuments().then(
                countAsistencias => {
                    var asistencia = {}
                    asistencia.ordenLlegada = countAsistencias + 1;
                    asistencia.nombreAlumno = req.body.nombreAlumno;
                    asistencia.apellidoAlumno = req.body.apellidoAlumno;
                    asistencia.gradoAlumno = req.body.gradoAlumno;
                    asistencia.dniAlumno = req.body.dniAlumno;
                    asistencia.turnoAlumno = req.body.turnoAlumno;


                    db.collection('asistencia').insertOne(asistencia)
                        .then(
                            () => {
                                res.redirect('/asistencia/list');
                            }
                        )
                        .catch(
                            error => console.error(error)
                        );
                }
            );

        }
        else {
            console.log('EDITANDO');
            var asistencia = {}
            asistencia.ordenLlegada = parseInt(req.body.ordenLlegada);
            asistencia.nombreAlumno = req.body.nombreAlumno;
            asistencia.apellidoAlumno = req.body.apellidoAlumno;
            asistencia.dniAlumno = req.body.dniAlumno;
            asistencia.turnoAlumno = req.body.turnoAlumno;
            console.log(asistencia);

            db.collection("asistencia").updateOne(
                { ordenLlegada: { $e: parseInt(req.body.ordenLlegada) } },
                { $se: asistencia }
            )
                .then(
                    () => {
                        res.redirect('/asistencia/list');
                    }
                )
                .catch(
                    error => console.error(error)
                );
        }
    }

}


module.exports = controller;
