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


// Nombre del localStorage que comparten docentes y estudiantes
nombreLocalStore = "personas"

// Variables globales
let personas = []
let usuario, contrasenaActual, nuevaContrasena, confirmarContrasena

function recuperarElementosFormulario() {
    // Leer datos del localStorage
    personas = leerDataStore(nombreLocalStore)
    
    // Obtener elementos del formulario
    usuario = document.getElementById("usuario")
    contrasenaActual = document.getElementById("contrasena_actual")
    nuevaContrasena = document.getElementById("nueva_contrasena")
    confirmarContrasena = document.getElementById("confirmar_contrasena")
}

function cambiarContrasena() {
    // Recuperar elementos del formulario
    recuperarElementosFormulario()
    
    // Validar que todos los campos estén llenos
    if (!validarCamposVacios()) {
        return false
    }
    
    // Validar que las contraseñas coincidan
    if (!validarCoincidenciaContrasenas()) {
        return false
    }
    
    // Buscar el usuario en el localStorage
    var usuarioEncontrado = personas.find(persona => 
        persona.usuario === usuario.value.trim()
    )
    
    if (usuarioEncontrado !== undefined) {
        // Verificar contraseña actual
        if (usuarioEncontrado.contrasena === contrasenaActual.value) {
            // Cambiar la contraseña
            usuarioEncontrado.contrasena = nuevaContrasena.value
            
            // Guardar en localStorage
            escribirDataStoreConJSON(nombreLocalStore, personas)
            
            alert("Contraseña cambiada exitosamente")
            limpiarFormulario()
            
            return true
        } else {
            alert("La contraseña actual es incorrecta")
            contrasenaActual.focus()
            return false
        }
    } else {
        alert("Usuario no encontrado")
        usuario.focus()
        return false
    }
}

function validarCamposVacios() {
    if (usuario.value.trim() === "") {
        alert("Por favor ingrese su usuario")
        usuario.focus()
        return false
    }
    
    if (contrasenaActual.value === "") {
        alert("Por favor ingrese su contraseña actual")
        contrasenaActual.focus()
        return false
    }
    
    if (nuevaContrasena.value === "") {
        alert("Por favor ingrese la nueva contraseña")
        nuevaContrasena.focus()
        return false
    }
    
    if (confirmarContrasena.value === "") {
        alert("Por favor confirme la nueva contraseña")
        confirmarContrasena.focus()
        return false
    }
    
    return true
}

function validarCoincidenciaContrasenas() {
    if (nuevaContrasena.value !== confirmarContrasena.value) {
        alert("Las contraseñas no coinciden")
        confirmarContrasena.focus()
        return false
    }
    return true
}

function validarFortalezaContrasena() {
    const patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
    
    if (!patron.test(nuevaContrasena.value)) {
        alert("La nueva contraseña debe tener mínimo 6 caracteres, incluir mayúsculas, minúsculas y números")
        nuevaContrasena.focus()
        return false
    }
    return true
}

function limpiarFormulario() {
    usuario.value = ""
    contrasenaActual.value = ""
    nuevaContrasena.value = ""
    confirmarContrasena.value = ""
}

// Función para manejar el evento del botón
function manejarCambioContrasena(event) {
    event.preventDefault() // Prevenir envío del formulario
    
    // Validar fortaleza de contraseña
    if (!validarFortalezaContrasena()) {
        return
    }
    
    // Ejecutar cambio de contraseña
    cambiarContrasena()
}

// Funciones auxiliares para localStorage (deben estar en tu archivo principal)
function leerDataStore(nombreStore) {
    let datos = localStorage.getItem(nombreStore)
    if (datos === null || datos === undefined) {
        return []
    } else {
        return JSON.parse(datos)
    }
}

function escribirDataStoreConJSON(nombreStore, arrayObjetos) {
    localStorage.setItem(nombreStore, JSON.stringify(arrayObjetos))
}

// Event listener para cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Buscar el botón de login y agregar el event listener
    const botonLogin = document.querySelector('.botonInicio')
    if (botonLogin) {
        botonLogin.addEventListener('click', manejarCambioContrasena)
    }
    
    // Validación en tiempo real para confirmar contraseña
    document.getElementById('confirmar_contrasena')?.addEventListener('input', function() {
        const nueva = document.getElementById('nueva_contrasena').value
        const confirmar = this.value
        
        if (nueva !== '' && confirmar !== '') {
            if (nueva === confirmar) {
                this.style.borderColor = 'green'
            } else {
                this.style.borderColor = 'red'
            }
        }
    })
    
    // Validación en tiempo real para nueva contraseña
    document.getElementById('nueva_contrasena')?.addEventListener('input', function() {
        const patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
        
        if (this.value !== '') {
            if (patron.test(this.value)) {
                this.style.borderColor = 'green'
            } else {
                this.style.borderColor = 'red'
            }
        }
    })
})