const contenedor = document.getElementById("contenedorMensajes");

function cargarMensajes() {
  const usuarioActual = localStorage.getItem("nombreUsuario") || "usuarioDemo";

  contenedor.innerHTML = "";

  getEvent("mensajesPorProfesor", { usuario: usuarioActual }, (data) => {
      
      if (!data.success) {
          contenedor.innerHTML = `<p>No se pudieron cargar los mensajes.</p>`;
          console.error(data);
          return;
      }

      // ⚠️ tu backend NO devuelve "conversaciones", devuelve "mensajes"
      if (data.mensajes.length === 0) {
          contenedor.innerHTML = `<p>No tenés mensajes aún.</p>`;
          return;
      }

      data.mensajes.forEach(msg => {

          const fecha = new Date(msg.fecha);
          const fechaStr = fecha.toLocaleDateString("es-AR", {
              weekday: "long",
              day: "numeric",
              month: "long",
          });
          const horaStr = fecha.toLocaleTimeString("es-AR", {
              hour: "2-digit",
              minute: "2-digit",
          });

          const div = document.createElement("div");
          div.classList.add("mensaje");
          div.innerHTML = `
              <img src="https://randomuser.me/api/portraits/${msg.profesor.endsWith('a') ? 'women' : 'men'}/${Math.floor(Math.random() * 50)}.jpg" alt="foto">
              <div class="info">
                  <h3 class="nombre">${msg.profesor}</h3>
                  <p class="fecha">${fechaStr} a las ${horaStr}</p>
                  <p class="texto">${msg.texto}</p>
              </div>
          `;

          div.addEventListener("click", () => {
              window.location.href = `chat.html?profesor=${encodeURIComponent(msg.profesor)}`;
          });

          contenedor.appendChild(div);
      });
  });
}

cargarMensajes();
