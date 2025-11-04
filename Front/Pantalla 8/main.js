// --- VARIABLES GLOBALES DE LA PANTALLA 8 ---
// NOTA: Asegúrate de que tu HTML tenga id="textoMensaje", id="historialMensajes" y class="formulario".

const tituloMensaje = document.querySelector('.titulo');
const textareaMensaje = document.getElementById('textoMensaje'); 
const formulario = document.querySelector('.formulario'); 
const historialMensajes = document.getElementById('historialMensajes'); 


// --- FUNCIONES ---

/**
 * 1. Lee el parámetro 'profesor' de la URL y actualiza el título.
 */
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

/**
 * 2. Maneja el envío del mensaje y lo añade al historial de chat.
 */
function enviarMensaje(event) {
    // Evita la recarga de la página (comportamiento por defecto del botón submit)
    event.preventDefault(); 
    
    if (!textareaMensaje || !historialMensajes) {
        console.error("Error: Elementos del chat (textarea o historial) no encontrados.");
        return; 
    }
    
    const mensaje = textareaMensaje.value.trim();
    
    if (mensaje === "") {
        return; // No hace nada si está vacío
    }
    
    // Lógica para crear y mostrar la burbuja de mensaje del usuario
    
    // Eliminar mensaje de bienvenida si existe
    const bienvenida = historialMensajes.querySelector('.mensaje-bienvenida');
    if (bienvenida) {
        bienvenida.remove();
    }
    
    // Crear la burbuja
    const nuevoMensaje = document.createElement('div');
    nuevoMensaje.classList.add('mensaje-usuario'); 
    nuevoMensaje.textContent = mensaje;
    
    historialMensajes.appendChild(nuevoMensaje);
    
    textareaMensaje.value = ''; // Limpiar el campo de texto
    
    // Desplazar el scroll hacia el final
    historialMensajes.scrollTop = historialMensajes.scrollHeight;
    
    // LA RESPUESTA AUTOMÁTICA DEL PROFESOR HA SIDO ELIMINADA AQUÍ.
}


// --- EVENT LISTENERS Y EJECUCIÓN INICIAL ---

console.log("Iniciando script de chat..."); 

// 1. Asigna el listener al FORMULARIO
if (formulario) {
    formulario.addEventListener('submit', enviarMensaje); 
    console.log("EXITO: Evento 'submit' asignado al formulario.");
} else {
    // Método de respaldo
    const btnEnviarMensaje = document.querySelector('button[type="submit"]');
    if(btnEnviarMensaje) {
        btnEnviarMensaje.addEventListener('click', enviarMensaje);
        console.warn("ADVERTENCIA: Formulario no encontrado. Usando evento 'click' en el botón.");
    } else {
        console.error("CRÍTICO: El botón/formulario de envío no fue encontrado.");
    }
}

// 2. Ejecuta la función para cargar el nombre del profesor
setProfesorDesdeURL();