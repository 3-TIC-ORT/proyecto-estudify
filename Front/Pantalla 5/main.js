document.addEventListener('DOMContentLoaded', () => {
  const profesores = document.querySelectorAll('.profesor');

  profesores.forEach(profesor => {
    profesor.addEventListener('click', () => {
      window.location.href = '../Pantalla 6/index.html';
    });
  });
});

const iconoUsuario = document.querySelector(".usuario");

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
  const profesores = document.querySelectorAll(".profesor");

  profesores.forEach(profesor => {
    profesor.addEventListener("click", () => {
  
      window.location.href = "../Pantalla 8/index.html";
    });
  });
});

