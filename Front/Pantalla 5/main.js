document.addEventListener("DOMContentLoaded", async () => {
    const galeria = document.querySelector(".galeria-profesores");
  
connect2Server();

    try {
      const respuesta = await fetch("http://localhost:3002/profesores");
      const profesores = await respuesta.json();
  
      galeria.innerHTML = profesores
        .map(
          (p) => `
          <div class="profesor" data-nombre="${p.nombre}">
            <img src="${p.foto}" alt="${p.nombre}" class="foto-profesor" />
            <div class="nombre-profesor">${p.nombre}</div>
          </div>
        `
        )
        .join("");
  
      document.querySelectorAll(".profesor").forEach((prof) => {
        prof.addEventListener("click", () => {
          const nombre = prof.getAttribute("data-nombre");
          localStorage.setItem("profesorSeleccionado", nombre);
          window.location.href = "pantalla6.html";
        });
      });
    } catch (error) {
      galeria.innerHTML = "<p>Error al cargar profesores</p>";
    }
  });
  