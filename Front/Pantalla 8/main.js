const tituloMensaje = document.querySelector('.titulo');
const textareaMensaje = document.getElementById('textoMensaje'); 
const formulario = document.querySelector('.formulario'); 
const historialMensajes = document.getElementById('historialMensajes'); 

let nombreProfesor = null;

function setProfesorDesdeURL() {
    if (!tituloMensaje) return; 
    const params = new URLSearchParams(window.location.search);
    nombreProfesor = params.get('profesor');

    if (nombreProfesor) {
        tituloMensaje.textContent = `Enviar mensaje a ${decodeURIComponent(nombreProfesor)}`;
        obtenerMensajes(nombreProfesor);
    } else {
        tituloMensaje.textContent = 'Enviar mensaje';
    }
}

async function enviarMensaje(event) {
    event.preventDefault(); 
    
    if (!textareaMensaje || !historialMensajes) {
        console.error("Error: Elementos del chat (textarea o historial) no encontrados.");
        return; 
    }
    
    const mensaje = textareaMensaje.value.trim();
    if (mensaje === "") return;

    const nuevoMensaje = document.createElement('div');
    nuevoMensaje.classList.add('mensaje-usuario'); 
    nuevoMensaje.textContent = mensaje;
    historialMensajes.appendChild(nuevoMensaje);
    textareaMensaje.value = ''; 
    historialMensajes.scrollTop = historialMensajes.scrollHeight;

    try {
        const res = await fetch("http://localhost:3002/enviarMensaje", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                profesor: nombreProfesor,
                usuario: "usuarioDemo", 
                contenido: mensaje
            })
        });
        const data = await res.json();
        if (!data.success) {
            console.error("Error al guardar mensaje:", data);
        }
    } catch (err) {
        console.error("Error de conexión con el servidor:", err);
    }
}

async function obtenerMensajes(profesor) {
    try {
        const res = await fetch(`http://localhost:3002/mensajesPorProfesor?profesor=${encodeURIComponent(profesor)}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.mensajes)) {
            data.mensajes.forEach(m => {
                const div = document.createElement('div');
                div.classList.add('mensaje-usuario');
                div.textContent = m.contenido;
                historialMensajes.appendChild(div);
            });
        }
    } catch (err) {
        console.error("Error al obtener mensajes:", err);
    }
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
