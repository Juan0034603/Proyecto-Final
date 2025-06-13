nombreLocalStore = "personas"

function recuperarElementosFormulario() {

    personas = leerDataStore(nombreLocalStore)

    tipoIdentificacion = document.getElementById("tipoIdentificacion")
    numeroIdentificacion = document.getElementById("numeroIdentificacion")
    nombresCompletos = document.getElementById("nombresCompletos")
    apellidosCompletos = document.getElementById("apellidosCompletos")
    fechaNacimiento = document.getElementById("fechaNacimiento")
    telefonoContacto = document.getElementById("telefonoContacto")
    telefonoSecundario = document.getElementById("telefonoSecundario")
    curso = document.getElementById("curso")
    correoPersonal = document.getElementById("correoPersonal")
    correoEmpresarial = document.getElementById("correoEmpresarial")
    contrasena = document.getElementById("contrasena")
    usuario = document.getElementById("usuario")
    estadoPerfil = document.getElementById("estadoPerfil")
    rolPerfil = document.getElementById("rolPerfil")
}

function verificarInsercionOActualizacion() {

    recuperarElementosFormulario()

    var indicePersonas = personas.findIndex(persona => persona.numeroIdentificacion == numeroIdentificacion.value)

    if (indicePersonas < 0) {

        guardar()

    } else

        actualizar(indicePersonas)

}

function guardar() {

    persona = new Docente(tipoIdentificacion.value, numeroIdentificacion.value,
        nombresCompletos.value, apellidosCompletos.value, fechaNacimiento.value,
        telefonoContacto.value, telefonoSecundario.value, " ", correoPersonal.value,
        correoEmpresarial.value, contrasena.value, usuario.value, "activo", "docente")

    escribirDataStore(nombreLocalStore, persona, personas)

    alert("El docente ha sido insertado con exito")

    console.table(personas)

    nuevo()

}

function actualizar(indiceElementoActualizar) {


    if (indiceElementoActualizar >= 0) {

        personas[indiceElementoActualizar].tipoIdentificacion = tipoIdentificacion.value
        personas[indiceElementoActualizar].numeroIdentificacion = numeroIdentificacion.value
        personas[indiceElementoActualizar].nombresCompletos = nombresCompletos.value
        personas[indiceElementoActualizar].apellidosCompletos = apellidosCompletos.value
        personas[indiceElementoActualizar].fechaNacimiento = fechaNacimiento.value
        personas[indiceElementoActualizar].telefonoContacto = telefonoContacto.value
        personas[indiceElementoActualizar].telefonoSecundario = telefonoSecundario.value
        personas[indiceElementoActualizar].correoPersonal = correoPersonal.value
        personas[indiceElementoActualizar].correoEmpresarial = correoEmpresarial.value
        personas[indiceElementoActualizar].contrasena = contrasena.value
        personas[indiceElementoActualizar].usuario = usuario.value


        escribirDataStoreConJSON(nombreLocalStore, personas)

        alert("Empleado ha sido actualizado con exito")


    } else {

        alert('Empleado no se encuentra registrado')

    }

    nuevo()
}



function consultar() {

    recuperarElementosFormulario()

    var personaEncontrada = personas.find(persona => persona.numeroIdentificacion == numeroIdentificacion.value)

    if (personaEncontrada !== undefined) {

        tipoIdentificacion.value = personaEncontrada.tipoIdentificacion
        numeroIdentificacion.value = personaEncontrada.numeroIdentificacion
        nombresCompletos.value = personaEncontrada.nombresCompletos
        apellidosCompletos.value = personaEncontrada.apellidosCompletos
        fechaNacimiento.value = personaEncontrada.fechaNacimiento
        telefonoContacto.value = personaEncontrada.telefonoContacto
        telefonoSecundario.value = personaEncontrada.telefonoSecundario
        correoPersonal.value = personaEncontrada.correoPersonal
        correoEmpresarial.value = personaEncontrada.correoEmpresarial
        contrasena.value = personaEncontrada.contrasena
        usuario.value = personaEncontrada.usuario
    } else {

        alert('Empleado no se encuentra registrado')
        nuevo()
    }



}

function nuevo() {

    document.getElementById("docentes").reset();

}

