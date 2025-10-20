
document.querySelectorAll('.mensaje').forEach(mensaje => {
    mensaje.addEventListener('click', () => {
      const profesor = mensaje.dataset.profesor;
      window.location.href = "../Pantalla 8/index.html?profesor=" + profesor;
    });
  });
  