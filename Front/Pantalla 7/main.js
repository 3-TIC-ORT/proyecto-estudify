const contenedor = document.getElementById("contenedorMensajes");

async function cargarMensajes() {
  try {
  
    const usuarioActual = localStorage.getItem("nombreUsuario") || "usuarioDemo";

  //  const res = await fetch(`http://localhost:3000/conversacionesUsuario?usuario=${usuarioActual}`);
  //  const data = await res.json();

    

    contenedor.innerHTML = ""; 

    if (!data.success || data.conversaciones.length === 0) {
      contenedor.innerHTML = `<p>No tenés mensajes aún.</p>`;
      return;
    }

  
    data.conversaciones.forEach(conv => {
      const fecha = new Date(conv.fecha);
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
        <img src="https://randomuser.me/api/portraits/${conv.profesor.includes('a') ? 'men' : 'women'}/${Math.floor(Math.random()*50)}.jpg" alt="foto">
        <div class="info">
          <h3 class="nombre">${conv.profesor}</h3>
          <p class="fecha">${fechaStr} a las ${horaStr}</p>
          <p class="texto">${conv.contenido}</p>
        </div>
      `;

     
      div.addEventListener("click", () => {
        window.location.href = `chat.html?profesor=${encodeURIComponent(conv.profesor)}`;
      });

      contenedor.appendChild(div);
    });

  } catch (error) {
    console.error("Error cargando mensajes:", error);
    contenedor.innerHTML = `<p>Error al conectar con el servidor.</p>`;
  }
}

cargarMensajes();
