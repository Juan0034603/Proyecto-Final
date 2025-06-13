nombreLocalStore = "materias"

function recuperarElementosFormulario() {

    materias = leerDataStore(nombreLocalStore)

    idMateria = document.getElementById("idMateria")
    nombreMateria = document.getElementById("nombreMateria")
    descripcion = document.getElementById("descripcion")
    selectEstado = document.getElementById("selectEstado")
    horaRegistro = document.getElementById("horaRegistro")

}

function generarIdAutoincremental(nombreContador = "ultimoIdMateria") {
    let ultimoId = parseInt(localStorage.getItem(nombreContador)) || 0
    let nuevoId = ultimoId + 1;
    localStorage.setItem(nombreContador, nuevoId);
    return nuevoId;
}


function verificarInsercionOActualizacion() {

    recuperarElementosFormulario()

    var indiceMaterias = materias.findIndex(materia => materia.nombreMateria == nombreMateria.value)

    if (indiceMaterias < 0) {

        guardar()

    } else

        actualizar(indiceMaterias)

}

function guardar() {
    var idGenerado = generarIdAutoincremental()
    var fechaActual = new Date().toISOString().split("T")[0]


    materia = new Materia(idGenerado, nombreMateria.value, descripcion.value, selectEstado.value, fechaActual)

    escribirDataStore(nombreLocalStore, materia, materias)

    alert("La materia ha sido insertado con exito")

    console.table(materias)

    nuevo()

}

function actualizar(indiceElementoActualizar) {


    if (indiceElementoActualizar >= 0) {

        materias[indiceElementoActualizar].nombreMateria = nombreMateria.value
        materias[indiceElementoActualizar].descripcion = descripcion.value
        materias[indiceElementoActualizar].selectEstado = selectEstado.value
        materias[indiceElementoActualizar].fechaActual = new Date().toISOString().split("T")[0]




        escribirDataStoreConJSON(nombreLocalStore, personas)

        alert("Materia ha sido actualizado con exito")


    } else {

        alert('Materia no se encuentra registrado')

    }

    nuevo()
}



function consultar() {

    recuperarElementosFormulario()

    var materiaEncontrada = materias.find(materia => materia.nombreMateria == idMateria.nombreMateria)

    if (materiaEncontrada !== undefined) {

        nombreMateria.value = materiaEncontrada.nombreMateria
        descripcion.value = materiaEncontrada.descripcion
        selectEstado.value = materiaEncontrada.selectEstado

    } else {

        alert('Materia no se encuentra registrado')
        nuevo()
    }



}

function eliminar() {

    recuperarElementosFormulario()

    var indiceMateriaEncontrada = materias.findIndex(materia => materia.nombreMateria == nombreMateria.value)

    if (indiceMateriaEncontrada >= 0) {

        materias.splice(indiceMateriaEncontrada, 1)

        escribirDataStoreConJSON(nombreLocalStore, materias)

        alert("Materia ha sido eliminado con exito")

    } else {

        alert('Materia no se encuentra registrado')
    }

}

function nuevo() {

    document.getElementById("materiasForm").reset();

}

