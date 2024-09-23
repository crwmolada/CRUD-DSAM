
var tablaAsistencia = localStorage.getItem("tablaAsistenciaStorage");
tablaAsistencia = JSON.parse(tablaAsistencia);
if (tablaAsistencia == null) {
    var tablaAsistencia = [];   //ya tengo lista esta variable vacia o llena, está lista para ser usada
}


//para obtener datos del localstorage

var idForm = localStorage.getItem("idForm");
idForm = JSON.parse(idForm);
if (idForm == null) {
    var idForm = 0;
}

cargarPagina();  //funcion para guardar datos

function guardar() { //guarda datos del formulario y se lo envia a la tabla
    //accion para el sweetAlert
    Swal.fire({
        title: 'LOS DATOS SE GUARDARÁN',
        html: '¿DESEA GUARDAR LOS DATOS?',
        showDenyButton: true,
        confirmButtonText: 'Oka',
        denyButtonText: 'nola'
    }).then(
        (result) => {
            if (result.isConfirmed) {

                console.log("presionando guardar");
                var objAlumno = JSON.stringify({
                    idAlumno: (idForm > 0) ? idForm : (tablaAsistencia.length + 1),
                    nombAlumno: document.getElementById("txtNombAlumno").value,
                    gradoAlumno: document.getElementById("txtGradoAlumno").value,
                    turnoAlumno: document.getElementById("txtTurnoAlumno").value,
                    dniAlumno: document.getElementById("txtDniAlumno").value

                })
                console.log(objAlumno);
                //BOTÓN EDITAR Y GUARDAR
                if (idForm > 0) {
                    for (const i in tablaAsistencia) {
                        var varAsistencia = JSON.parse(tablaAsistencia[i]);
                        if (varAsistencia.idAlumno == idForm) {
                            tablaAsistencia[i] = objAlumno;
                            break;
                        }
                    }
                } else {
                    tablaAsistencia.push(objAlumno);
                }

                localStorage.setItem("tablaAsistenciaStorage", JSON.stringify(tablaAsistencia));
                //creamos un loclStorage donde guardaremos la tablaAsistencia
                Swal.fire('LOS DATOS SE GUARDARÁN c:', '', 'success').then(
                    (result) => {
                        //para regresar
                        window.location.replace("asistencia.html");
                    }
                );
            }

            else if (result.isDenied) {
                Swal.fire('LOS CAMBIOS NO SE GUARDARÁN', '', 'info');
            }
        }
    )
}

function cargarPagina() {
    //evaluamos
    if (idForm > 0) {
        //sacará datos de la fila de la tabla y los pondrá en el formulario
        for (const i in tablaAsistencia) {
            var varAsistencia = JSON.parse(tablaAsistencia[i]);
            if (varAsistencia.idAlumno == idForm) {
                document.getElementById("txtIdAlumno").value = varAsistencia.idAlumno;
                document.getElementById("txtNombAlumno").value = varAsistencia.nombAlumno;
                document.getElementById("txtGradoAlumno").value = varAsistencia.gradoAlumno;
                document.getElementById("txtTurnoAlumno").value = varAsistencia.turnoAlumno;
                document.getElementById("txtDniAlumno").value = varAsistencia.dniAlumno;
                break;
            }
        }
    }
}