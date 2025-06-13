const nombreLocalStore = "horariosPorCurso";

// Función para leer del localStorage
function leerDataStore(nombre) {
    return JSON.parse(localStorage.getItem(nombre)) || [];
}

// Función para consultar y mostrar el horario de un curso en la tabla
function consultarHorarioCurso() {
    const horarios = leerDataStore(nombreLocalStore);
    const curso = document.getElementById("grado").value;

    if (!curso || curso.trim() === "") {
        alert("Selecciona un curso válido para consultar el horario.");
        return;
    }

    const horarioCurso = horarios.find(horario => horario.curso === curso);

    if (!horarioCurso) {
        alert("No se encontró un horario guardado para este curso.");
        return;
    }

    const tabla = document.querySelector(".tablaHorario tbody");
    const filas = tabla.querySelectorAll("tr:not(.filaDescanso)");

    horarioCurso.horario.forEach((registro, index) => {
        const fila = filas[index];
        const celdas = fila.querySelectorAll("td");

        registro.dias.forEach((materia, diaIndex) => {
            const select = celdas[diaIndex + 1]?.querySelector("select");
            if (select) {
                select.value = materia;
            }
        });
    });
}



