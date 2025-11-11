const tituloMensaje = document.querySelector('.titulo');
const textareaMensaje = document.getElementById('textoMensaje'); 
const formulario = document.querySelector('.formulario'); 
const historialMensajes = document.getElementById('historialMensajes'); 



function setProfesorDesdeURL() {
    if (!tituloMensaje) return; 
    const params = new URLSearchParams(window.location.search);
    const nombreProfesor = params.get('profesor');

    if (nombreProfesor) {
        tituloMensaje.textContent = `Enviar mensaje a ${decodeURIComponent(nombreProfesor)}`;
    } else {
        tituloMensaje.textContent = 'Enviar mensaje';
    }
}


function enviarMensaje(event) {
   
    event.preventDefault(); 
    
    if (!textareaMensaje || !historialMensajes) {
        console.error("Error: Elementos del chat (textarea o historial) no encontrados.");
        return; 
    }
    
    const mensaje = textareaMensaje.value.trim();
    
    if (mensaje === "") {
        return;
    }
    
    const bienvenida = historialMensajes.querySelector('.mensaje-bienvenida');
    if (bienvenida) {
        bienvenida.remove();
    }
    
   
    const nuevoMensaje = document.createElement('div');
    nuevoMensaje.classList.add('mensaje-usuario'); 
    nuevoMensaje.textContent = mensaje;
    
    historialMensajes.appendChild(nuevoMensaje);
    
    textareaMensaje.value = ''; 
    
   
    historialMensajes.scrollTop = historialMensajes.scrollHeight;
    
}



console.log("Iniciando script de chat..."); 

if (formulario) {
    formulario.addEventListener('submit', enviarMensaje); 
    console.log("EXITO: Evento 'submit' asignado al formulario.");
} else {
    
    const btnEnviarMensaje = document.querySelector('button[type="submit"]');
    if(btnEnviarMensaje) {
        btnEnviarMensaje.addEventListener('click', enviarMensaje);
        console.warn("ADVERTENCIA: Formulario no encontrado. Usando evento 'click' en el botón.");
    } else {
        console.error("CRÍTICO: El botón/formulario de envío no fue encontrado.");
    }
}

setProfesorDesdeURL();