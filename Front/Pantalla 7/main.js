
document.addEventListener('DOMContentLoaded', () => {
  const mensajes = document.querySelectorAll('.mensaje');

  mensajes.forEach(mensaje => {

    mensaje.style.cursor = 'pointer';

    mensaje.addEventListener('click', () => {
      const profesor = mensaje.dataset.profesor || 'desconocido';
      console.log('Clic en mensaje:', profesor); 

  
      window.location.href = "../Pantalla 8/index.html?profesor=" + encodeURIComponent(profesor);

    
    });
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