document.addEventListener('DOMContentLoaded', () => {
  const profesores = document.querySelectorAll('.profesor');

  profesores.forEach(profesor => {
    profesor.addEventListener('click', () => {
  
      window.location.href = '../Pantalla 6/index.html';
    });
  });
});
