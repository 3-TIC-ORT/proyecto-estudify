document.addEventListener('DOMContentLoaded', () => {
    
    const btnMensaje = document.querySelector('.btn-mensaje');
  
    btnMensaje.addEventListener('click', () => {
    
      window.location.href = '../Pantalla 8/index.html';
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