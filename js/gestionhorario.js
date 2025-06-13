    // Obtener los cursos desde localStorage
    function obtenerCursos() {
        const cursosJSON = localStorage.getItem("cursos");
        return cursosJSON ? JSON.parse(cursosJSON) : [];
    }

    // Llenar el select de grado con los cursos
    function llenarSelectGrado() {
        const cursos = obtenerCursos();
        const selectGrado = document.getElementById("grado");

        // Limpiar opciones anteriores
        selectGrado.innerHTML = "";

        // Opción inicial
        const opcionInicial = document.createElement("option");
        opcionInicial.textContent = "-- Seleccione un curso --";
        opcionInicial.value = "";
        selectGrado.appendChild(opcionInicial);

        // Agregar los cursos como opciones
        cursos.forEach(curso => {
            const option = document.createElement("option");
            option.value = curso.idCurso;
            option.textContent = curso.nombreCurso;
            selectGrado.appendChild(option);
        });
    }

    // Ejecutar al cargar la página
    document.addEventListener("DOMContentLoaded", () => {
        llenarSelectGrado();
    });



// Espera que toda la estructura HTML esté completamente cargada
document.addEventListener("DOMContentLoaded", () => {

    // Obtiene del localStorage el array de materias guardadas
    // Si no hay materias, se usa un arreglo vacío para evitar errores
    const materias = JSON.parse(localStorage.getItem("materias")) || [];

    // Selecciona todos los <select> dentro del <tbody> de la tabla de horario
    const selects = document.querySelectorAll(".tablaHorario tbody select");

    // Recorre cada <select> de la tabla
    selects.forEach(select => {

        // Inicializa el contenido del <select> con una opción por defecto
        select.innerHTML = `<option value="">-- Seleccione --</option>`;

        // Recorre todas las materias obtenidas del localStorage
        materias.forEach(materia => {

            // Solo se agregan las materias que estén en estado "Activo"
            if (materia.selectEstado === "Activo") {

                // Agrega una nueva opción al <select> con:
                // - value = id de la materia
                // - texto visible = nombre de la materia
                select.innerHTML += `<option value="${materia.idMateria}">${materia.nombreMateria}</option>`;
            }
        });
    });
});



nombreLocalStore = "horariosPorCurso"

function guardarHorarioCurso() {



    // Leer los horarios actuales del LocalStorage
    let horarios = leerDataStore(nombreLocalStore)

    const curso = document.getElementById("grado").value

    if (!curso || curso.trim() === "") {
        alert("Selecciona un curso válido para guardar el horario.")
        return
    }

    const tabla = document.querySelector(".tablaHorario tbody")
    const filas = tabla.querySelectorAll("tr:not(.filaDescanso)")

    const horario = []

    filas.forEach((fila) => {
        const celdas = fila.querySelectorAll("td")
        const hora = celdas[0].textContent.trim()
        const dias = []

        for (let i = 1; i < celdas.length; i++) {
            const select = celdas[i].querySelector("select")
            dias.push(select ? select.value : "")
        }

        horario.push({ hora, dias })
    })

    // Verifica si ya existe el curso, si sí, lo reemplaza
    const indice = horarios.findIndex(h => h.curso === curso)

    if (indice >= 0) {
        horarios[indice].horario = horario
    } else {
        horarios.push({ curso, horario })
    }

    // Guarda el arreglo completo en el LocalStorage
    escribirDataStoreConJSON(nombreLocalStore, horarios)

    alert("Horario guardado correctamente para el curso: " + curso)
}


function consultarHorarioCurso() {
    let horarios = leerDataStore(nombreLocalStore)
    const curso = document.getElementById("grado").value

    const horarioCurso = horarios.find(horario => horario.curso === curso)

    if (!horarioCurso) {
        alert("No se encontró un horario guardado para este curso.")
        return
    }

    const tabla = document.querySelector(".tablaHorario tbody")
    const filas = tabla.querySelectorAll("tr:not(.filaDescanso)")

    horarioCurso.horario.forEach((registro, index) => {
        const fila = filas[index]
        const celdas = fila.querySelectorAll("td")

        registro.dias.forEach((materia, diaIndex) => {
            const select = celdas[diaIndex + 1]?.querySelector("select")
            if (select) {
                select.value = materia
            }
        })
    })
}

function eliminarHorarioCurso() {
    // Leer todos los horarios almacenados
    let horarios = leerDataStore(nombreLocalStore)

    // Obtener el curso seleccionado
    const curso = document.getElementById("grado").value

    if (!curso || curso.trim() === "") {
        alert("Selecciona un curso válido para eliminar el horario.")
        return
    }

    // Buscar el índice del horario para ese curso
    const indice = horarios.findIndex(h => h.curso === curso)

    if (indice >= 0) {
        // Eliminar el horario de la lista
        horarios.splice(indice, 1)

        // Guardar la nueva lista sin ese curso
        escribirDataStoreConJSON(nombreLocalStore, horarios)

        alert("Horario eliminado exitosamente para el curso: " + curso)
    } else {
        alert("No se encontró un horario guardado para este curso.")
    }
}
