//FUNCIONES PARA BUCAR PRODUCTOS
function listar() {
    console.log("---LISTANDO LIBROS----");
    Swal.fire({
        title: 'LISTA DE LIBROS DEVUELTOS',
        html: '<b>CARGANDO...</b>',
        didOpen: () => {
            Swal.showLoading()
        }
    })
    //para utilizar ajax-
    $.ajax({
        //{} pq usaremos funciones tipo lambda
        url: 'http://localhost:3999/api/libreria',
        //tipo de ruta que estamos consumiendo get/post
        type: 'GET',
        success: function (respuesta) {
            Swal.close();
            console.log(respuesta);
            var dataFila = '';
            var dataLibreria = respuesta.libreria;
            if (dataLibreria.length > 0) {
                for (const i in dataLibreria) {
                    var varLibreria = dataLibreria[i];
                    dataFila += "<tr>";
                    dataFila += "<td>" + varLibreria.idLibreria + "</td>";
                    dataFila += "<td>" + varLibreria.alumno + "</td>";
                    dataFila += "<td>" + varLibreria.libro + "</td>";
                    dataFila += "<td>" + varLibreria.estado + "</td>";
                    dataFila += "<td>" +
                        "<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#modalForm' onclick='editar(" +
                        varLibreria.idLibreria + ")'>Editar</button>";

                    dataFila += "</tr>";
                }
                document.getElementById("dataLibreria").innerHTML = dataFila;
            } else {
                document.getElementById("dataLibreria").innerHTML = "<tr><td colspan='7'>No hay datos que mostrar</td></tr>";
            }

        }
    });
}

function guardar() {
    console.log("----GUARDANDO DATOS----");

    $.ajax({ //el signo me permite acceder a ls funciones de query (esta vez ajax)
        url: 'http://localhost:3999/api/libreria/save',
        type: 'POST',
        data: {
            idLibreria: $("#txtIDLibro").val(),
            alumno: $("#txtNombre").val(),
            libro: $("#txtTitulo").val(),
            estado: $("#txtEstado").val()
            
        },
        success: function (respuesta) {
            console.log(respuesta);
            listar();
        }
    });
}

function editar(idLibreria) {
    console.log("EDITANDO REGISTRO");
    console.log(idLibreria);
    $.ajax({
        url: 'http://localhost:3999/api/libreria/' + idLibreria,
        type: 'GET',

        success: function (respuesta) {
            console.log(respuesta);
            var varLibreria = respuesta.libreria;
            $('#txtIDLibro').val(varLibreria.idLibreria);
            $('#txtNombre').val(varLibreria.alumno);
            $('#txtTitulo').val(varLibreria.libro);
            $('#txtEstado').val(varLibreria.estado);
            
        }


    });
}

function limpiarForm() {
    $('#txtIDLibro').val(0);
    $('#txtNombre').val("");
    $('#txtTitulo').val("");
    $('#txtEstado').val("");
}



