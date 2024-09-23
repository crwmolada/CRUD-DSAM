
var tablaAsistencia = localStorage.getItem("tablaAsistenciaStorage");
tablaAsistencia = JSON.parse(tablaAsistencia);
if (tablaAsistencia == null) {
    var tablaAsistencia = [];   //ya tengo lista esta variable vacia o llena, está lista para ser usada
}

buscarAlumno();

function buscarAlumno() { //funcion que me enviará al formulario para llenado de datos
    console.log("entrando a la funcion de de buscar");

    var dataFila = '';

    if (tablaAsistencia.length > 0) {
        for (const i in tablaAsistencia) {
            var varAsistencia = JSON.parse(tablaAsistencia[i]);

            //ESPACIO PARA EL FILTRO
            var dniFiltro = document.getElementById("txtDniFiltro").value;
            if (dniFiltro != "") {
                if (dniFiltro == varAsistencia.dniAlumno) {
                    dataFila += construirFila(varAsistencia);
                }
            }
            else {
                dataFila += construirFila(varAsistencia);
            }

        }
        document.getElementById("dataAsistencia").innerHTML = dataFila;
    }
    else {
        document.getElementById("dataAsistencia").innerHTML = "<tr><td colspan='6'>No hay datos que mostrar</td></tr>";
    }
}

//FUNCION PARA GUARDAR LA INFORMACIÓN DE LAS FILAS DE ALUMNOS Y AHORRAR CÓDIGO

function construirFila(varAsistencia) {
    var dataFila = '';
    dataFila += "<tr>";
    dataFila += "<td>" + varAsistencia.idAlumno + "</td>";
    dataFila += "<td>" + varAsistencia.nombAlumno + "</td>";
    dataFila += "<td>" + varAsistencia.gradoAlumno + "</td>";
    dataFila += "<td>" + varAsistencia.turnoAlumno + "</td>";
    dataFila += "<td>" + varAsistencia.dniAlumno + "</td>";
    dataFila += "<td>" +
        "<button type='button' class='btn btn-info' onclick='registroForm(" + varAsistencia.idAlumno + ")'>Editar</button>" +
        "<button type='button' class='btn btn-danger ml-2' onclick='eliminarItem(" + varAsistencia.idAlumno + ")'>Eliminar</button>" +

        "</td>";
    dataFila += "</tr>";

    return dataFila;
}


function registroForm(idForm) {
    localStorage.setItem("idForm", JSON.stringify(idForm));
    window.location.replace("asistencia_form.html");
}

function eliminarItem(idItem) {
    for (const i in tablaAsistencia) {
        var varAsistencia = JSON.parse(tablaAsistencia[i]);
        if (varAsistencia.idAlumno == idItem) {
            tablaAsistencia.splice(i, 1);
            localStorage.setItem("tablaAsistenciaStorage", JSON.stringify(tablaAsistencia));
        }
    } buscarAlumno();
}

function mostrarDatos(){
    document.getElementById("txtDniFiltro").value = "";
    buscarAlumno();
}