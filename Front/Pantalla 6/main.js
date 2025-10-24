if (profesorData) {
  document.querySelector('.foto-profesor').src = profesorData.foto;
  document.querySelector('.profesor-info h1').textContent = profesorData.nombre;
  document.querySelector('.estrellas').textContent = profesorData.estrellas;
  document.querySelector('.descripcion').textContent = profesorData.descripcion;
  document.querySelector('.precio').textContent = profesorData.precio;
  
  const contenedorReseñas = document.querySelector('.profesor-reseñas');
  const nuevaReseñaDiv = document.querySelector('.nueva-reseña');
  const reseñasAnteriores = contenedorReseñas.querySelectorAll('.reseña');
  reseñasAnteriores.forEach(reseña => reseña.remove());
  
  profesorData.reseñas.forEach(reseña => {
      const reseñaDiv = document.createElement('div');
      reseñaDiv.className = 'reseña';
      reseñaDiv.innerHTML = `
          ${reseña.estrellas}
          <p>"${reseña.texto}"</p>
      `;
      contenedorReseñas.insertBefore(reseñaDiv, nuevaReseñaDiv);
  });
} else {

  alert('No se encontró información del profesor');
  window.location.href = '../Pantalla 5/index.html';
}

document.querySelector('.btn-mensaje').addEventListener('click', function() {
const nombreProfesor = document.querySelector('.profesor-info h1').textContent;
alert(`Abriendo chat con ${nombreProfesor}...`);
});

connect2Server();

document.querySelector('.nueva-reseña button').addEventListener('click', function() {
const textarea = document.querySelector('.nueva-reseña textarea');
const textoReseña = textarea.value.trim();

if (textoReseña) {
  const nuevaReseñaDiv = document.createElement('div');
  nuevaReseñaDiv.className = 'reseña';
  nuevaReseñaDiv.innerHTML = `
      ⭐⭐⭐⭐⭐
      <p>"${textoReseña}"</p>
  `;
  
  const nuevaReseñaSeccion = document.querySelector('.nueva-reseña');
  nuevaReseñaSeccion.parentNode.insertBefore(nuevaReseñaDiv, nuevaReseñaSeccion);
  
  textarea.value = '';
  
  alert('¡Reseña enviada con éxito!');
  
  // Hacer scroll a la nueva reseña
  nuevaReseñaDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
} else {
  alert('Por favor escribe una reseña antes de enviar.');
}
});