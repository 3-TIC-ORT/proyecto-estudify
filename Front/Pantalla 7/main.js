const contenedor = document.getElementById("contenedorMensajes");

function cargarMensajes() {
    const usuarioActual = localStorage.getItem("nombreUsuario");

    if (!usuarioActual) {
        contenedor.innerHTML = "<p>No hay usuario guardado.</p>";
        return;
    }

    contenedor.innerHTML = "<p>Cargando...</p>";

    getEvent(
        "listaConversaciones",
        { usuario: usuarioActual },
        (res) => {
            if (!res.success) {
                contenedor.innerHTML = "<p>Error cargando mensajes.</p>";
                return;
            }

            const lista = res.conversaciones;

            if (lista.length === 0) {
                contenedor.innerHTML = "<p>No tenés mensajes aún.</p>";
                return;
            }

            contenedor.innerHTML = "";

            lista.forEach(conv => {
                const div = document.createElement("div");
                div.classList.add("chat-item");

                div.innerHTML = `
                    <h3>${conv.profesor}</h3>
                    <p>${conv.ultimoMensaje}</p>
                `;

                div.addEventListener("click", () => {
                    window.location.href =
                        `../Pantalla8/index.html?profesor=${encodeURIComponent(conv.profesor)}`;
                });

                contenedor.appendChild(div);
            });
        }
    );
}

cargarMensajes();


