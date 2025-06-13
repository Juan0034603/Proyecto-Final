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