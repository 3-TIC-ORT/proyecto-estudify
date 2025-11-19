const tituloMensaje = document.querySelector('.titulo');
const textareaMensaje = document.getElementById('textoMensaje');
const formulario = document.querySelector('.formulario');
const historialMensajes = document.getElementById('historialMensajes');

let nombreProfesor = null;

function setProfesorDesdeURL() {
    const params = new URLSearchParams(window.location.search);
    nombreProfesor = params.get("profesor");

    if (!nombreProfesor) return;

    tituloMensaje.textContent = `Chat con ${decodeURIComponent(nombreProfesor)}`;
    obtenerMensajes();
}

function enviarMensaje(event) {
    event.preventDefault();

    const mensaje = textareaMensaje.value.trim();
    if (mensaje === "") return;

    agregarMensaje(mensaje, "alumno");
    textareaMensaje.value = "";

    postEvent(
        "enviarMensaje",
        {
            profesor: nombreProfesor,
            usuario: localStorage["nombreUsuario"],
            texto: mensaje,
            perfil: "alumno"
        },
        (res) => {
            if (!res.success) console.error("Error guardando mensaje:", res);
        }
    );
}

function agregarMensaje(texto, perfil) {
    const div = document.createElement("div");
    div.classList.add(perfil === "profesor" ? "mensaje-profesor" : "mensaje-usuario");
    div.textContent = texto;
    historialMensajes.appendChild(div);
    historialMensajes.scrollTop = historialMensajes.scrollHeight;
}

function obtenerMensajes() {
    getEvent(
        "mensajesPorProfesor",
        {
            profesor: nombreProfesor,
            usuario: localStorage["nombreUsuario"]
        },
        (res) => {
            if (!res.success) return;

            historialMensajes.innerHTML = "";

            res.mensajes.forEach(m => {
                agregarMensaje(m.texto, m.perfil);
            });
        }
    );
}

formulario.addEventListener("submit", enviarMensaje);
setProfesorDesdeURL();

