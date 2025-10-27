const profesores = document.querySelectorAll('.profesor');

profesores.forEach(profesor => {
  profesor.addEventListener('click', () => {
 
    const nombre = profesor.querySelector('.nombre-profesor').textContent;
    const img = profesor.querySelector('.foto-profesor').src;
    const materia = profesor.dataset.materia;

  
    localStorage.setItem('profeSeleccionado', JSON.stringify({ nombre, img, materia }));
    window.location.href = '../Pantalla 6/index.html'; 
  });
});
