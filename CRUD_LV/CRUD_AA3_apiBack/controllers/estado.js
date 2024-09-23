'use strict'

var client = require('../database/db');
var db = client.db('alumnosAsistencia');

var controller = {
    
    list: function (req, res) {
        console.log("-------------------------");
        console.log("ENTRANDO A LA FUNCIÓN LIST");

        db.collection('estadoLllegada').find().toArray(
            (error, dataEstado) => {
                ///console.log(error);
                console.log(dataEstado);
                if (error || !dataEstado) { //si hay error o no(!) hay data, muestra el mensaje
                    return res.status(404).send({
                        message: " No se econtraron datos."
                    });
                } else { // si noo hay error y si hay data, entonces success
                    return res.status(200).send({
                        status: "Success",
                        estado: dataEstado
                    })
                }
            }
        );
    },
    find: function (req, res) {
        console.log("-------------------------");
        console.log("ENTRANDO A LA FUNCIÓN BUSCAR");
        console.log('id:' + req.params.id);
        db.collection('estadoLllegada').find({ idEstado: parseInt(req.params.id) }).toArray(
            (error, dataEstado) => {
                ///console.log(error);
                console.log(dataEstado);
                if (error || !dataEstado) { //si hay error o no(!) hay data, muestra el mensaje
                    return res.status(404).send({
                        message: " No se econtraron datos."
                    });
                } else { // si noo hay error y si hay data, entonces success
                    return res.status(200).send({
                        status: "Success",
                        estado: dataEstado[0]
                    })
                }
            }
        );
    },
    save: function (req, res) {
        console.log("-------------------------");
        console.log("ENTRANDO A LA FUNCIÓN GUARDAR");
        console.log(req.body);
        if (req.body.idEstado == 0) {// nuevo
            db.collection("estadoLllegada").countDocuments().then(
                countRegistros => {
                    var estado = {}
                    estado.idEstado = countRegistros + 1;
                    estado.estado = req.body.estado;
                    
                    

                    db.collection("estadoLllegada").insertOne(estado).then(
                        (result) => {
                            return res.status(200).send({
                                status: "Success",
                                estado: result
                            });
                        }
                    );

                }
            );

        } else { //actualizar
            var estado = {}
            estado.idEstado = parseInt(req.body.idEstado);
            estado.estado = req.body.estado;
            

            console.log(estado);
            db.collection("estadoLllegada").updateOne({ idEstado : { $eq: parseInt(req.body.idEstado) }},
                                                  { $set: estado }  
                                                  )
            .then(
                (result) => {
                    return res.status(200).send({
                        status: "Success",
                        estado: result
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