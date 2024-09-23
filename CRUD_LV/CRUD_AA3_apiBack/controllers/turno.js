'use strict'

var client = require('../database/db');
var db = client.db('alumnosAsistencia');

var controller = {
    
    list: function (req, res) {
        console.log("-------------------------");
        console.log("ENTRANDO A LA FUNCIÓN LIST");

        db.collection('turno').find().toArray(
            (error, dataTurno) => {
                ///console.log(error);
                console.log(dataTurno);
                if (error || !dataTurno) { 
                    return res.status(404).send({
                        message: " No se econtraron datos."
                    });
                } else { // si noo hay error y si hay data, entonces success
                    return res.status(200).send({
                        status: "Success",
                        turno: dataTurno
                    })
                }
            }
        );
    },
    find: function (req, res) {
        console.log("-------------------------");
        console.log("ENTRANDO A LA FUNCIÓN BUSCAR");
        console.log('id:' + req.params.id);
        db.collection('turno').find({ idTurno: parseInt(req.params.id) }).toArray(
            (error, dataTurno) => {
                ///console.log(error);
                console.log(dataTurno);
                if (error || !dataTurno) { 
                    return res.status(404).send({
                        message: " No se econtraron datos."
                    });
                } else { 
                    return res.status(200).send({
                        status: "Success",
                        turno: dataTurno[0]
                    })
                }
            }
        );
    },
    save: function (req, res) {
        console.log("-------------------------");
        console.log("ENTRANDO A LA FUNCIÓN GUARDAR");
        console.log(req.body);
        if (req.body.idTurno == 0) {// nuevo
            db.collection("turno").countDocuments().then(
                countRegistros => {
                    var turno = {}
                    turno.idTurno = countRegistros + 1;
                    turno.turno = req.body.turno;
           
                    db.collection("turno").insertOne(turno).then(
                        (result) => {
                            return res.status(200).send({
                                status: "Success",
                                yutno: result
                            });
                        }
                    );

                }
            );

        } else { //actualizar
            var turno = {}
            turno.idTurno = parseInt(req.body.idTurno);
            turno.turno = req.body.turno;
            

            console.log(turno);
            db.collection("turno").updateOne({ idTurno : { $eq: parseInt(req.body.idTurno) }},
                                                  { $set: turno }  
                                                  )
            .then(
                (result) => {
                    return res.status(200).send({
                        status: "Success",
                        turno: result
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