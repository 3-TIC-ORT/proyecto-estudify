const MAIL_DEL_USUARIO_LOGUEADO = sessionStorage.getItem('usuarioLogueadoMail');

if (!MAIL_DEL_USUARIO_LOGUEADO) {
    console.error("Usuario no logueado. Redirigiendo a login.");
    return;
}
function solicitarYMostrarPerfil() {
    // ...
    // enviarEventoPOST('obtenerUsuario', { mail: MAIL_DEL_USUARIO_LOGUEADO }, (resultado) => {
    // ...
}

function cargarDatosDePerfil(datosUsuario) {
    
    const nombreElemento = document.getElementById('nombreUsuario');
    const fechaInput = document.getElementById('inputFechaNacimiento');
    const mailInput = document.getElementById('inputMail');

    if (nombreElemento) {
        
        nombreElemento.textContent = datosUsuario.usuario || 'Usuario Desconocido'; 
    }
    
    if (fechaInput) {
        
        fechaInput.value = datosUsuario.nacimiento || 'N/A';
    }
    
    if (mailInput) {
       
        mailInput.value = datosUsuario.mail || 'N/A';
    }
    
    console.log("Datos de perfil cargados correctamente.");
}

function solicitarYMostrarPerfil() {
    console.log("Solicitando datos del perfil...");
    

}

document.addEventListener('DOMContentLoaded', solicitarYMostrarPerfil);