if (profesorData) {
  // Actualizar foto
  document.querySelector('.foto-profesor').src = profesorData.foto;
  
  // Actualizar nombre
  document.querySelector('.profesor-info h1').textContent = profesorData.nombre;
  
  // Actualizar estrellas
  document.querySelector('.estrellas').textContent = profesorData.estrellas;
  
  // Actualizar descripción
  document.querySelector('.descripcion').textContent = profesorData.descripcion;
  
  // Actualizar precio
  document.querySelector('.precio').textContent = profesorData.precio;
  
  // Cargar reseñas
  const contenedorReseñas = document.querySelector('.profesor-reseñas');
  const nuevaReseñaDiv = document.querySelector('.nueva-reseña');
  
  // Limpiar reseñas anteriores (mantener solo el título y la sección de nueva reseña)
  const reseñasAnteriores = contenedorReseñas.querySelectorAll('.reseña');
  reseñasAnteriores.forEach(reseña => reseña.remove());
  
  // Agregar las reseñas del profesor
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
  // Si no hay datos, mostrar mensaje o redirigir
  alert('No se encontró información del profesor');
  window.location.href = '../Pantalla 5/index.html';
}


// Funcionalidad del botón de mensaje
document.querySelector('.btn-mensaje').addEventListener('click', function() {
const nombreProfesor = document.querySelector('.profesor-info h1').textContent;
alert(`Abriendo chat con ${nombreProfesor}...`);
// Aquí puedes redirigir a tu pantalla de mensajes
// window.location.href = '../Mensajes/index.html';
});

// Funcionalidad para enviar nueva reseña
document.querySelector('.nueva-reseña button').addEventListener('click', function() {
const textarea = document.querySelector('.nueva-reseña textarea');
const textoReseña = textarea.value.trim();

if (textoReseña) {
  // Crear nueva reseña con 5 estrellas por defecto
  const nuevaReseñaDiv = document.createElement('div');
  nuevaReseñaDiv.className = 'reseña';
  nuevaReseñaDiv.innerHTML = `
      ⭐⭐⭐⭐⭐
      <p>"${textoReseña}"</p>
  `;
  
  // Insertar antes de la sección de nueva reseña
  const nuevaReseñaSeccion = document.querySelector('.nueva-reseña');
  nuevaReseñaSeccion.parentNode.insertBefore(nuevaReseñaDiv, nuevaReseñaSeccion);
  
  // Limpiar textarea
  textarea.value = '';
  
  // Mensaje de confirmación
  alert('¡Reseña enviada con éxito!');
  
  // Hacer scroll a la nueva reseña
  nuevaReseñaDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
} else {
  alert('Por favor escribe una reseña antes de enviar.');
}
});