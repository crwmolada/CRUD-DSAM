'use strict'

var client = require('../database/db');
var db = client.db('alumnosAsistencia');

var controller = {
    filtrar: function (req, res) {
        console.log("----------------");
        console.log("FILTRANDO DATOS");
        console.log("filtroDni:" + req.body.filtroDni);

        const filtroDni = req.body.filtroDni;
        const filtroTurno = req.body.filtroTurno;
        const matchQuery = {};  //si es igual o casi igual al dato ingresado
        if (filtroDni) {
            matchQuery.dniAlumno = { $regex: filtroDni };  //regex (expresiones regulares)    
        }
        if (filtroTurno) {
            matchQuery.idTurno = (filtroTurno == '0' ? { $gt: 0 } : parseInt(filtroTurno));  //regex (expresiones regulares)    
        }

        db.collection("asistencia").aggregate([
            {
                $match: matchQuery
            },
            {
                $lookup: { //busca coleccion
                    from: "estadoLllegada", //de
                    localField: "idEstado", //campo a consultar
                    foreignField: "idEstado", //campo que comparten
                    as: "estado"
                }
            },
            {
                $lookup: { //busca coleccion
                    from: "turno", //de
                    localField: "idTurno", //campo a consultar
                    foreignField: "idTurno", //campo que comparten
                    as: "turno"
                }
            }

        ]).toArray()
            .then(
                (dataAsistencia) => {
                    return res.status(200).send({
                        status: "success",
                        asistencia: dataAsistencia
                    })
                }
            ).catch((error) => {
                return res.status(500).send({
                    status: "error",
                    error: error
                })
            });

    },
    list: function (req, res) {
        console.log("-------------------------");
        console.log("ENTRANDO A LA FUNCIÓN LIST");

        db.collection("asistencia").aggregate([ //aggregate para agregar colecciones que se quiera consultar
            {
                $lookup: { //busca coleccion
                    from: "estadoLllegada", //de
                    localField: "idEstado", //campo a consultar
                    foreignField: "idEstado", //campo que comparten
                    as: "estado"
                }
            },
            {
                $lookup: { //busca coleccion
                    from: "turno", //de
                    localField: "idTurno", //campo a consultar
                    foreignField: "idTurno", //campo que comparten
                    as: "turno"
                }
            }
        ]).toArray().then(
            (dataAsistencia) => {
                return res.status(200).send({
                    status: "success",
                    asistencia: dataAsistencia
                });
            },
            (error) => {
                return res.status(500).send({
                    status: "error",
                    error: error
                });
            }
        );
    },
    find: function (req, res) {
        console.log("-------------------------");
        console.log("ENTRANDO A LA FUNCIÓN BUSCAR");
        console.log('id:' + req.params.id);
        db.collection('asistencia').find({ ordenLlegada: parseInt(req.params.id) }).toArray(
            (error, dataAsistencia) => {
                ///console.log(error);
                console.log(dataAsistencia);
                if (error || !dataAsistencia) { //si hay error o no(!) hay data, muestra el mensaje
                    return res.status(404).send({
                        message: " No se econtraron datos."
                    });
                } else { // si noo hay error y si hay data, entonces success
                    return res.status(200).send({
                        status: "Success",
                        asistencia: dataAsistencia[0]
                    })
                }
            }
        );
    },
    save: function (req, res) {
        console.log("-------------------------");
        console.log("ENTRANDO A LA FUNCIÓN GUARDAR");
        console.log(req.body);
        if (req.body.ordenLlegada == 0) {// nuevo
            db.collection("asistencia").countDocuments().then(
                countRegistros => {
                    var asistencia = {}
                    asistencia.ordenLlegada = countRegistros + 1;
                    asistencia.nombreAlumno = req.body.nombreAlumno;
                    asistencia.apellidoAlumno = req.body.apellidoAlumno;
                    asistencia.dniAlumno = req.body.dniAlumno;
                    asistencia.idTurno = parseInt(req.body.idTurno);
                    asistencia.gradoAlumno = req.body.gradoAlumno;
                    asistencia.idEstado = parseInt(req.body.idEstado);

                    db.collection("asistencia").insertOne(asistencia).then(
                        (result) => {
                            return res.status(200).send({
                                status: "Success",
                                asistencia: result
                            });
                        }
                    );

                }
            );

        } else { //actualizar
            var asistencia = {}
            asistencia.ordenLlegada = parseInt(req.body.ordenLlegada);
            asistencia.nombreAlumno = req.body.nombreAlumno;
            asistencia.apellidoAlumno = req.body.apellidoAlumno;
            asistencia.dniAlumno = req.body.dniAlumno;
            asistencia.idTurno = parseInt(req.body.idTurno);
            asistencia.gradoAlumno = req.body.gradoAlumno;
            asistencia.idEstado = parseInt(req.body.idEstado);

            console.log(asistencia);
            db.collection("asistencia").updateOne({ ordenLlegada: { $eq: parseInt(req.body.ordenLlegada) } },
                { $set: asistencia }
            )
                .then(
                    (result) => {
                        return res.status(200).send({
                            status: "Success",
                            asistencia: result
                        });
                    },
                    (error) => {
                        return res.status(404).send({
                            message: "Error al editar el registro" + error,
                        });
                    }
                );
        }

    },
    reporteEstado: function (req, res) {
        console.log("----------------");
        console.log("ENTRANDO A LA FUNCIÓN REGISTRO");
        db.collection("asistencia").aggregate([
            {
                $lookup: {
                    from: "estadoLllegada",
                    localField: "idEstado",
                    foreignField: "idEstado",
                    as: "estado"
                }
            },
            {
                $group: {
                    _id: "$idEstado",
                    count: { $sum: 1 },
                    estado: { $first: "$estado.estado" }
                }
            }
        ]).toArray().then(
            (dataAsistencia) => {
                return res.status(200).send({
                    status: "success",
                    asistencia: dataAsistencia
                });
            },
            (error) => {
                return res.status(500).send({
                    status: "error",
                    error: error
                });
            }
        );
    },
    eliminar: function (req, res) {
        console.log("-------------------------");
        console.log("ENTRANDO A LA FUNCIÓN ELIMINAR");
        console.log('ordenLlegada:' + req.params.ordenLlegada);
    
        const ordenLlegada = parseInt(req.params.ordenLlegada);
    
        db.collection('asistencia').deleteOne({ ordenLlegada: ordenLlegada })
          .then(
            (result) => {
              return res.status(200).send({
                status: "Success",
                result: result
              });
            },
            (error) => {
              return res.status(404).send({
                message: "Error al eliminar el registro" + error,
              });
            }
          );
      }
}
module.exports = controller;