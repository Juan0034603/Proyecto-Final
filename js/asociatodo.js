// LocalStorage para curso ←→ materias
const storeCursoMateria = "asociacionesCursoMateria";
// LocalStorage para curso ←→ materia ←→ docente ←→ horario
const storeCursoMateriaDocente = "asociacionesCursoMateriaDocente";

// Variables para almacenar los datos existentes de cada localStorage
let asociacionesCursoMateria = [];
let asociacionesCursoMateriaDocente = [];

// Recupera todos los elementos del formulario y los datos desde el localStorage
function recuperarElementosFormulario() {
    asociacionesCursoMateria = leerDataStore(storeCursoMateria);
    asociacionesCursoMateriaDocente = leerDataStore(storeCursoMateriaDocente);

    // Elementos del primer formulario (Curso - Materias)
    idCurso = document.getElementById("idCurso");
    materiasCurso = document.getElementById("materiasCurso");

    // Elementos del segundo formulario (Curso - Materia - Docente - Horario)
    idCursoDocente = document.getElementById("idCursoDocente");
    materiasDocente = document.getElementById("materiasDocente");
    idDocente = document.getElementById("idDocente");
    horario = document.getElementById("horario");
    horas = document.getElementById("horas");
}

////////////////////
// Curso - Materia
////////////////////

// Guarda la relación de un curso con múltiples materias
function guardarCursoMateria() {
    recuperarElementosFormulario();

    const nuevaRelacion = {
        idCurso: idCurso.value,
        materias: materiasCurso.value.split(",").map(m => m.trim()) // separa por coma y limpia espacios
    };

    escribirDataStore(storeCursoMateria, nuevaRelacion, asociacionesCursoMateria);
    alert("Relación Curso-Materias guardada con éxito");
    nuevo();
}

// Consulta la relación de un curso y carga sus materias
function consultarCursoMateria() {
    recuperarElementosFormulario();

    const resultado = asociacionesCursoMateria.find(r => r.idCurso === idCurso.value);

    if (resultado) {
        materiasCurso.value = resultado.materias.join(", ");
    } else {
        alert("No se encontró relación para ese curso");
    }
}

///////////////////////////////////////////////
// Curso - Materia - Docente - Día y Hora
///////////////////////////////////////////////

// Guarda una asignación completa de curso + materia + docente + horario
function guardarCursoMateriaDocente() {
    recuperarElementosFormulario();

    const nuevaAsignacion = {
        idCurso: idCursoDocente.value,
        materia: materiasDocente.value,
        idDocente: idDocente.value,
        dia: horario.value,
        hora: horas.value
    };

    escribirDataStore(storeCursoMateriaDocente, nuevaAsignacion, asociacionesCursoMateriaDocente);
    alert("Asignación Curso-Materia-Docente guardada con éxito");
    nuevo();
}

// Consulta la asignación y carga el horario si existe
function consultarCursoMateriaDocente() {
    recuperarElementosFormulario();

    const resultado = asociacionesCursoMateriaDocente.find(a =>
        a.idCurso === idCursoDocente.value &&
        a.materia === materiasDocente.value &&
        a.idDocente === idDocente.value
    );

    if (resultado) {
        horario.value = resultado.dia;
        horas.value = resultado.hora;
    } else {
        alert("Asignación no encontrada");
    }
}

///////////////////////////////
// Funciones generales
///////////////////////////////

// Limpia todos los formularios en pantalla
function nuevo() {
    document.querySelectorAll("form").forEach(f => f.reset());
}

// Lee datos de localStorage y los convierte a arreglo JS
function leerDataStore(nombre) {
    return JSON.parse(localStorage.getItem(nombre)) || [];
}

// Guarda un nuevo objeto dentro de un arreglo existente en localStorage
function escribirDataStore(nombre, objeto, arregloExistente) {
    arregloExistente.push(objeto);
    localStorage.setItem(nombre, JSON.stringify(arregloExistente));
}

/////////////////////////////
// Eliminar Curso - Materias
/////////////////////////////
function eliminarCursoMateria() {
    recuperarElementosFormulario();

    const indice = asociacionesCursoMateria.findIndex(r => r.idCurso === idCurso.value);

    if (indice >= 0) {
        asociacionesCursoMateria.splice(indice, 1); // elimina la relación

        escribirDataStoreConJSON(storeCursoMateria, asociacionesCursoMateria);
        alert("Relación Curso-Materias eliminada con éxito");
    } else {
        alert("No se encontró relación para ese curso");
    }

    nuevo();
}

/////////////////////////////////////////////////////
// Eliminar Curso - Materia - Docente - Día y Hora
/////////////////////////////////////////////////////
function eliminarCursoMateriaDocente() {
    recuperarElementosFormulario();

    const indice = asociacionesCursoMateriaDocente.findIndex(a =>
        a.idCurso === idCursoDocente.value &&
        a.materia === materiasDocente.value &&
        a.idDocente === idDocente.value
    );

    if (indice >= 0) {
        asociacionesCursoMateriaDocente.splice(indice, 1); // elimina la asignación

        escribirDataStoreConJSON(storeCursoMateriaDocente, asociacionesCursoMateriaDocente);
        alert("Asignación Curso-Materia-Docente eliminada con éxito");
    } else {
        alert("No se encontró la asignación");
    }

    nuevo();
}






window.onload = function () {
    poblarSelectsDesdeStorage();
};

function poblarSelectsDesdeStorage() {
    // Cursos
    const cursos = leerDataStore("cursos");
    llenarSelect("idCurso", cursos.map(c => ({ value: c.idCurso, label: c.nombreCurso })));
    llenarSelect("idCursoDocente", cursos.map(c => ({ value: c.idCurso, label: c.nombreCurso })));

    // Materias
    const materias = leerDataStore("materias");
    llenarSelect("materiasCurso", materias.map(m => ({ value: m.nombreMateria, label: m.nombreMateria })));
    llenarSelect("materiasDocente", materias.map(m => ({ value: m.nombreMateria, label: m.nombreMateria })));

    // Docentes (filtrar por rol)
    const personas = leerDataStore("personas");
    const docentes = personas.filter(p => p.rolPerfil === "docente");
    llenarSelect("idDocente", docentes.map(d => ({
        value: d.numeroIdentificacion,
        label: `${d.nombresCompletos} ${d.apellidosCompletos}`
    })));

    // Días (estáticos)
    llenarSelect("horario", [
        { value: "Lunes", label: "Lunes" },
        { value: "Martes", label: "Martes" },
        { value: "Miércoles", label: "Miércoles" },
        { value: "Jueves", label: "Jueves" },
        { value: "Viernes", label: "Viernes" }
    ]);

    // Horas (estáticas)
    llenarSelect("horas", [
        { value: "07:00 - 08:00", label: "07:00 - 08:00" },
        { value: "08:00 - 09:00", label: "08:00 - 09:00" },
        { value: "09:00 - 10:00", label: "09:00 - 10:00" },
        { value: "10:00 - 11:00", label: "10:00 - 11:00" },
        { value: "11:00 - 12:00", label: "11:00 - 12:00" }
    ]);
}

// Función utilitaria para llenar un <select> dado su ID y un array de opciones {value, label}
function llenarSelect(id, opciones) {
    const select = document.getElementById(id);
    select.innerHTML = '<option value="">Seleccione</option>';
    opciones.forEach(op => {
        const option = document.createElement("option");
        option.value = op.value;
        option.textContent = op.label;
        select.appendChild(option);
    });
}
