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


function iniciarSesion() {

    recuperarElementosFormulario()

    personaencontrada = personas.find(persona =>
        persona.usuario == usuario.value &&
        persona.contrasena == contrasena.value)

    if (personaencontrada) {

        if (personaencontrada.rolPerfil == 'docente') {

            window.location.href = '../html/docente.html'

        } else if (personaencontrada.rolPerfil == 'administrador') {

            window.location.href = '../html/administrador.html'

        } else if (personaencontrada.rolPerfil == 'estudiante') {

            window.location.href = '../html/estudiante.html'

        }

    } else {

        alert('El Usuario/password errado')


    }


}





function crearUsuarioAdministrador() {

    personas = leerDataStore(nombreLocalStore)

    personaencontrada = personas.find(persona =>
        persona.usuario == 'admin')

    if (!personaencontrada) {

        persona = new Administrador("", "",
            "", "", "",
            "", "", "", "",
            "", "123", "admin", "activo", "administrador")

        escribirDataStore(nombreLocalStore, persona, personas)

    }



}


