nombreLocalStore = "cursos"

function recuperarElementosFormulario() {

    cursos = leerDataStore(nombreLocalStore)

    idCurso = document.getElementById("idCurso")
    nombreCurso = document.getElementById("nombreCurso")
    estadoCurso = document.getElementById("estadoCurso")

}

function generarIdAutoincremental(nombreContador = "ultimoIdCursos") {
    let ultimoId = parseInt(localStorage.getItem(nombreContador)) || 0;
    let nuevoId = ultimoId + 1;
    localStorage.setItem(nombreContador, nuevoId);
    return nuevoId;
}

function verificarInsercionOActualizacion() {

    recuperarElementosFormulario()

    var indiceCurso = cursos.findIndex(curso => curso.nombreCurso == nombreCurso.value)

    if (indiceCurso < 0) {

        guardar()

    } else

        actualizar(indiceCurso)

}

function guardar() {

    var idGenerado = generarIdAutoincremental();

    curso = new Curso(idGenerado, nombreCurso.value, estadoCurso.value)

    escribirDataStore(nombreLocalStore, curso, cursos)

    alert("El curso ha sido insertado con exito")

    console.table(cursos)

    nuevo()

}

function actualizar(indiceElementoActualizar) {


    if (indiceElementoActualizar >= 0) {

        cursos[indiceElementoActualizar].nombreCurso = nombreCurso.value
        cursos[indiceElementoActualizar].estadoCurso = estadoCurso.value



        escribirDataStoreConJSON(nombreLocalStore, cursos)

        alert("curso ha sido actualizado con exito")


    } else {

        alert('curso no se encuentra registrado')

    }

    nuevo()
}



function consultar() {

    recuperarElementosFormulario()

    var cursoEncontrado = cursos.find(curso => curso.nombreCurso == nombreCurso.value)

    if (cursoEncontrado !== undefined) {

        nombreCurso.value = cursoEncontrado.nombreCurso
        estadoCurso.value = cursoEncontrado.estadoCurso

    } else {

        alert('curso no se encuentra registrado')
        nuevo()
    }

    function eliminar() {

        recuperarElementosFormulario()

        var indiceCursoEncontrado = cursos.findIndex(curso => curso.nombreCurso == nombreCurso.value)

        if (indiceCursoEncontrado >= 0) {

            cursos.splice(indiceCursoEncontrado, 1)

            escribirDataStoreConJSON(nombreLocalStore, cursos)

            alert("Curso ha sido eliminado con exito")

        } else {

            alert('Curso no se encuentra registrado')
        }

    }


}

function nuevo() {

    document.getElementById("formularioCurso").reset();

}

