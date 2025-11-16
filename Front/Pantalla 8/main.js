const tituloMensaje = document.querySelector('.titulo');
const textareaMensaje = document.getElementById('textoMensaje'); 
const formulario = document.querySelector('.formulario'); 
const historialMensajes = document.getElementById('historialMensajes'); 

let nombreProfesor = null;

function setProfesorDesdeURL() {
    const params = new URLSearchParams(window.location.search);
    nombreProfesor = params.get('profesor');

    if (!nombreProfesor) {
        tituloMensaje.textContent = "Enviar mensaje";
        return;
    }

    tituloMensaje.textContent = `Enviar mensaje a ${decodeURIComponent(nombreProfesor)}`;

    obtenerMensajes(nombreProfesor);
}

async function enviarMensaje(event) {
    event.preventDefault();

    const mensaje = textareaMensaje.value.trim();
    if (mensaje === "") return;

    const nuevoMensaje = document.createElement('div');
    nuevoMensaje.classList.add('mensaje-usuario');
    nuevoMensaje.textContent = mensaje;
    historialMensajes.appendChild(nuevoMensaje);

    textareaMensaje.value = "";
    historialMensajes.scrollTop = historialMensajes.scrollHeight;

    postEvent("enviarMensaje",
        {
            profesor: nombreProfesor,
            usuario: localStorage["nombreUsuario"],
            contenido: mensaje,
            perfil: "Alumno"
        },
        (data) => {
            if (!data.success) {
                console.error("Error guardando mensaje:", data);
            }
        }
    );
}

function obtenerMensajes(profesor) {

    getEvent(
        "mensajesPorProfesor",
        {
            profesor: profesor,
            usuario: localStorage["nombreUsuario"]
        },
        (data) => {

            if (!data.success) {
                console.error("Error obteniendo mensajes:", data);
                return;
            }

            historialMensajes.innerHTML = ""; 

            data.mensajes.forEach(m => {
                const div = document.createElement('div');
                div.classList.add('mensaje-usuario');
                div.textContent = m.contenido;
                historialMensajes.appendChild(div);
            });
        }
    );
}

if (formulario) {
    formulario.addEventListener('submit', enviarMensaje);
}

setProfesorDesdeURL();

