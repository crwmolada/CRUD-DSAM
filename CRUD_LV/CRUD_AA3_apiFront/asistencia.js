$(document).ready(
    function () {
        cargarTurno();
        cargarEstado();
    }
)

//FUNCIONES PARA BUCAR PRODUCTOS
function listar() {
    console.log("---LISTANDO ASISTENCIAS----");
    Swal.fire({
        title: 'LISTA DE ASISTENCIAS',
        html: '<b>CARGANDO...</b>',
        didOpen: () => {
            Swal.showLoading()
        }
    })
    //para utilizar ajax-
    $.ajax({
        //{} pq usaremos funciones tipo lambda
        url: 'http://localhost:3999/api/asistencia/filtros',
        //tipo de ruta que estamos consumiendo get/post
        type: 'POST',       //cambio a POST pq nevio un parámetro para filtrar
        data: {
            filtroDni: $("#txtfiltroDni").val(),
            filtroTurno: $("#cboFiltroTurno").val()
        },
        success: function (respuesta) {
            Swal.close();
            console.log(respuesta);
            var dataFila = '';
            var dataAsistencia = respuesta.asistencia;
            if (dataAsistencia.length > 0) {
                for (const i in dataAsistencia) {
                    var varAsistencia = dataAsistencia[i];
                    dataFila += "<tr>";
                    dataFila += "<td>" + varAsistencia.ordenLlegada + "</td>";
                    dataFila += "<td>" + varAsistencia.nombreAlumno + "</td>";
                    dataFila += "<td>" + varAsistencia.apellidoAlumno + "</td>";
                    dataFila += "<td>" + varAsistencia.dniAlumno + "</td>";
                    dataFila += "<td>" + varAsistencia.turno[0].turno + "</td>";
                    dataFila += "<td>" + varAsistencia.gradoAlumno + "</td>";
                    dataFila += "<td>" + varAsistencia.estado[0].estado + "</td>"; //[0] porque lo que me trae es una array y quiero el primer elemnto para que me de el estado
                    dataFila += "<td>" +
                        "<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#modalForm' onclick='editar(" +
                        varAsistencia.ordenLlegada + ")'>Editar</button>" +
                        "<button type='button' class='btn btn-danger' onclick='eliminar(" +
                        varAsistencia.ordenLlegada + ")'>Eliminar</button>";

                    dataFila += "</tr>";
                }
                document.getElementById("dataAsistencia").innerHTML = dataFila;
            } else {
                document.getElementById("dataAsistencia").innerHTML = "<tr><td colspan='8'>No hay datos que mostrar</td></tr>";
            }

        }
    });
}

function guardar() {
    console.log("----GUARDANDO DATOS----");

    $.ajax({ //el signo me permite acceder a ls funciones de query (esta vez ajax)
        url: 'http://localhost:3999/api/asistencia/save',
        type: 'POST',
        data: {
            ordenLlegada: $("#txtOrdenLlegada").val(),
            nombreAlumno: $("#txtNombreAlumno").val(),
            apellidoAlumno: $("#txtApellidoAlumno").val(),
            dniAlumno: $("#txtDniAlumno").val(),
            idTurno: $("#cboTurno").val(),
            gradoAlumno: $("#txtGradoAlumno").val(),
            idEstado: $("#cboEstado").val()
        },
        success: function (respuesta) {
            console.log(respuesta);
            listar();
        }
    });
}

function editar(ordenLlegada) {
    console.log("EDITANDO REGISTRO");
    console.log(ordenLlegada);
    $.ajax({
        url: 'http://localhost:3999/api/asistencia/' + ordenLlegada,
        type: 'GET',

        success: function (respuesta) {
            console.log(respuesta);
            var varAsistencia = respuesta.asistencia;
            $('#txtOrdenLlegada').val(varAsistencia.ordenLlegada);
            $('#txtNombreAlumno').val(varAsistencia.nombreAlumno);
            $('#txtApellidoAlumno').val(varAsistencia.apellidoAlumno);
            $('#txtDniAlumno').val(varAsistencia.dniAlumno);
            $('#cboTurno').val(varAsistencia.idTurno);
            $('#txtGradoAlumno').val(varAsistencia.gradoAlumno);
            $('#cboEstado').val(varAsistencia.idEstado);
        }
    });
}

function eliminar(ordenLlegada) {
    console.log("ELIMINANDO REGISTRO");
    console.log(ordenLlegada);
    $.ajax({
        url: 'http://localhost:3999/api/asistencia/' + ordenLlegada,
        type: 'DELETE',
        success: function (respuesta) {
            console.log(respuesta);
            listar();
        }
    });
}

function limpiarForm() {
    $('#txtOrdenLlegada').val(0);
    $('#txtNombreAlumno').val("");
    $('#txtApellidoAlumno').val("");
    $('#txtDniAlumno').val("");
    $('#cboTurno').val("");
    $('#txtGradoAlumno').val("");
    $('#cboEstado').val("");
    cargarEstado();
    cargarTurno();
}

function cargarEstado() {
    $.ajax({
        url: 'http://localhost:3999/api/estado',
        type: 'GET',
        success: function (respuesta) {
            console.log(respuesta);
            var dataFila = '';
            var dataEstado = respuesta.estado;

            if (dataEstado.length > 0) {
                dataFila += "<option value='0'> --SELECCIONAR-- </option>";
                for (const i in dataEstado) {
                    var varEstado = dataEstado[i];
                    dataFila += "<option value='" + varEstado.idEstado + "'>" +
                        varEstado.estado +
                        "</option>";
                }
            }
            document.getElementById("cboEstado").innerHTML = dataFila;
        }
    });
}

function cargarTurno() {
    $.ajax({
        url: 'http://localhost:3999/api/turno',
        type: 'GET',
        success: function (respuesta) {
            console.log(respuesta);
            var dataFila = '';
            var dataTurno = respuesta.turno;

            if (dataTurno.length > 0) {
                dataFila += "<option value='0'> --SELECCIONA-- </option>";
                for (const i in dataTurno) {
                    var varTurno = dataTurno[i];
                    dataFila += "<option value='" + varTurno.idTurno + "'>" +
                        varTurno.turno +
                        "</option>";
                }
            }
            document.getElementById("cboTurno").innerHTML = dataFila;
            document.getElementById("cboFiltroTurno").innerHTML = dataFila;
        }
    });
}

function showReporte() {
    console.log("GRAFICANDO EL REPORTE");

    $.ajax({
        url: 'http://localhost:3999/api/reporte/estadoPorAsistencia',
        type: 'GET',
        success: function (respuesta) {
            var dataAsistencia = respuesta.asistencia;
            console.log(dataAsistencia);
            var xValues = [];
            var yValues = [];
            var barColors = ["red", "blue", "gray"]
            if (dataAsistencia.length > 0) {
                for (const i in dataAsistencia) {
                    console.log(dataAsistencia[i].estado[0]);
                    xValues.push(dataAsistencia[i].estado[0]);
                    yValues.push(dataAsistencia[i].count);
                }
            }

            new Chart("grafico", {
                type: "doughnut",
                data: {
                    labels: xValues,
                    datasets: [{
                        label: 'RESUMEN',
                        backgroundColor: barColors,
                        data: yValues
                    }]
                }
            });
        }
    });
}

function bajarPdf() {
    console.log("DESCARGANDO PDF");
    //CREAMOS UN NUEVO DOCUMENTO
    var doc = new jsPDF('p', 'pt');
    //OPBTENEMOS LOS DATOS DE TABLA ASISTENCIA DEL DOM CON EL ID
    var tablaAsistencia = document.getElementById("tablaAsistencia");
    //CREAMOS LA TABLA
    var tablaJSON = doc.autoTableHtmlToJson(tablaAsistencia);
    //console.log(tablaJSON);
    doc.autoTable(tablaJSON.columns, tablaJSON.data);
    doc.save("AsistenciasSecundaria.pdf");
}

function importarExcel() {

    // Obtener los datos de la tabla
    const tabla = document.getElementById('tablaAsistencia');
    const wb = XLSX.utils.table_to_book(tabla, { sheet: 'hoja 1' });

    // Guardar el archivo Excel
    XLSX.writeFile(wb, 'AsistenciasSecundaria.xlsx');
}












