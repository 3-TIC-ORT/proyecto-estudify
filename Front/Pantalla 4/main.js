document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("materia");

  select.addEventListener("change", () => {
    const materia = select.value;

    if (materia === "matematica") {
      window.location.href = "../Pantalla 5/index.html";
    } else if (materia === "lengua") {
      window.location.href = "../Pantalla 9/index.html";
    } else if (materia === "ingles") {
      window.location.href = "../Pantalla 10/index.html";
    }
  });
});

if (iconoUsuario) {
  iconoUsuario.addEventListener("click", () => {
    window.location.href = "../Pantalla 11/index.html"; 
  });
}

const iconoMensajes = document.querySelector(".mensajes");
if (iconoMensajes) {
  iconoMensajes.addEventListener("click", () => {
    window.location.href = "../Pantalla 7/index.html"; 
  });
}
  
document.addEventListener("DOMContentLoaded", () => {
  const iconoMensajes = document.querySelector(".icono.mensajes");
  const iconoUsuario = document.querySelector(".icono.usuario");

  if (iconoMensajes) {
      iconoMensajes.addEventListener("click", () => {
          window.location.href = "../pantalla 7/index.html";
      });
  }

  if (iconoUsuario) {
      iconoUsuario.addEventListener("click", () => {
          window.location.href = "../pantalla 11/index.html";
      });
  }
});

  
