'use strict'

var client = require('../database/db');
var db = client.db('alumnosAsistencia');

var controller = {
    list: function (req, res) {
        console.log("-------------------------");
        console.log("ENTRANDO A LA FUNCIÓN LIST");

        db.collection('libreria').find().toArray(
            (error, dataLibreria) => {
                ///console.log(error);
                console.log(dataLibreria);
                if (error || !dataLibreria) { //si hay error o no(!) hay data, muestra el mensaje
                    return res.status(404).send({
                        message: " No se econtraron datos."
                    });
                } else { // si noo hay error y si hay data, entonces success
                    return res.status(200).send({
                        status: "Success",
                        libreria: dataLibreria //-------------------------
                    })
                }
            }
        );
    },
    find: function (req, res) {
        console.log("-------------------------");
        console.log("ENTRANDO A LA FUNCIÓN BUSCAR");
        console.log('id:' + req.params.id);
        db.collection('libreria').find({ idLibreria: parseInt(req.params.id) }).toArray(
            (error, dataLibreria) => {
                ///console.log(error);
                console.log(dataLibreria);
                if (error || !dataLibreria) { //si hay error o no(!) hay data, muestra el mensaje
                    return res.status(404).send({
                        message: " No se econtraron datos."
                    });
                } else { // si noo hay error y si hay data, entonces success
                    return res.status(200).send({
                        status: "Success",
                        libreria: dataLibreria[0]
                    })
                }
            }
        );
    },
    save: function (req, res) {
        console.log("-------------------------");
        console.log("ENTRANDO A LA FUNCIÓN GUARDAR");
        console.log(req.body);
        if (req.body.idLibreria == 0) {// nuevo
            db.collection("libreria").countDocuments().then(
                countRegistros => {
                    var libreria = {}
                    libreria.idLibreria = countRegistros + 1;
                    libreria.alumno = req.body.alumno;
                    libreria.libro = req.body.libro;
                    libreria.estado = req.body.estado;


                    db.collection("libreria").insertOne(libreria).then(
                        (result) => {
                            return res.status(200).send({
                                status: "Success",
                                libreria: result
                            });
                        }
                    );

                }
            );

        } else { //actualizar
            var libreria = {}
            libreria.idLibreria = parseInt(req.body.idLibreria);
            libreria.alumno = req.body.alumno;
            libreria.libro = req.body.libro;
            libreria.estado = req.body.estado;
          

            console.log(libreria);
            db.collection("libreria").updateOne({ idLibreria : { $eq: parseInt(req.body.idLibreria) }},
                                                  { $set: libreria }  
                                                  )
            .then(
                (result) => {
                    return res.status(200).send({
                        status: "Success",
                        libreria: result
                    });
                },
                (error) => {
                    return res.status(404).send({
                        message: "Error al editar el registro" + error,
                    });
                }
            );
        }

    }
}
module.exports = controller;