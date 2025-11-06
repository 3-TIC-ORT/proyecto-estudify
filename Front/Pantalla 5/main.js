 
 const pantalla5 = document.getElementById('pantalla5');
 const pantalla6 = document.getElementById('pantalla6');
 const galeriaProfesores = document.querySelector('.galeria-profesores');
 const btnVolver = document.getElementById('btnVolver');
    
    
    const btnEnviarReseña = document.querySelector('.btn-enviar');
    const USUARIO_ACTUAL = "Tú (Alumno)"; 
    
    
 function cargarGaleria() {
 baseDeDatosProfesores.forEach(profesor => {
 const divProfesor = document.createElement('div');
     divProfesor.classList.add('profesor');
 divProfesor.dataset.idProfesor = profesor.id;
 
 divProfesor.innerHTML = `
 <img src="${profesor.imagen}" class="foto-profesor" alt="Profesor ${profesor.nombre}">
 <div class="nombre-profesor">${profesor.nombre}</div>
 `;
 
 galeriaProfesores.appendChild(divProfesor);
 });
 añadirListenersACards();
 }
 
 function mostrarDetalleProfesor(id) {
 const profesor = baseDeDatosProfesores.find(p => p.id == id);
 
 if (!profesor) {
 console.error("No se encontró al profesor con ID:", id);
 return;
 }
 
 document.getElementById('detalle-img').src = profesor.imagen;
 document.getElementById('detalle-nombre').textContent = profesor.nombre;
 document.getElementById('detalle-info').textContent = profesor.info;
 
 const listaReseñasHTML = document.getElementById('detalle-reseñas');
 listaReseñasHTML.innerHTML = ''; 
 
 if (profesor.reseñas && profesor.reseñas.length > 0) {
 profesor.reseñas.forEach(reseña => {
 const nuevoLi = document.createElement('li');
 nuevoLi.innerHTML = `<strong>${reseña.usuario}:</strong> "${reseña.comentario}"`;
 listaReseñasHTML.appendChild(nuevoLi);
 });
 } else {
 const nuevoLi = document.createElement('li');
 nuevoLi.textContent = "Este profesor aún no tiene reseñas.";
 listaReseñasHTML.appendChild(nuevoLi);
 }
              
              const btnContactar = document.querySelector('.btn-contactar'); 
              
              if (btnContactar) {
                  btnContactar.onclick = () => {
                      const nombreCodificado = encodeURIComponent(profesor.nombre);
                     
window.location.href = `../Pantalla 8/index.html?profesor=${nombreCodificado}`; 
                  };
              }
              // ----------------------------------------------------
 
 pantalla5.classList.remove('pantalla-visible');
 pantalla5.classList.add('pantalla-oculta');
 
 pantalla6.classList.remove('pantalla-oculta');
 pantalla6.classList.add('pantalla-visible');
 
 window.scrollTo(0, 0);
 }
 
 function mostrarListaProfesores() {
 pantalla6.classList.remove('pantalla-visible');
 pantalla6.classList.add('pantalla-oculta');
 
 pantalla5.classList.remove('pantalla-oculta');
 pantalla5.classList.add('pantalla-visible');
 
 window.scrollTo(0, 0);
 }
    

    function manejarEnvioReseña() {

    const textoReseña = document.querySelector('#textoReseña').value.trim();
    const nombreProfesor = document.getElementById('detalle-nombre').textContent;
    
    
    const profesorActual = baseDeDatosProfesores.find(p => p.nombre === nombreProfesor);
    
    if (textoReseña === "") {
    alert("Por favor, escribe un comentario antes de enviar la reseña.");
    return;
    }
    
    if (profesorActual) {
    const nuevaReseña = {
    usuario: USUARIO_ACTUAL,
    comentario: textoReseña
    };
    
    
    profesorActual.reseñas.push(nuevaReseña);
    
    
    document.querySelector('#textoReseña').value = '';
    
    mostrarDetalleProfesor(profesorActual.id);
    
    alert("¡Reseña enviada con éxito!");
    } else {
    console.error("No se pudo identificar al profesor para guardar la reseña.");
    }
    }
 
 function añadirListenersACards() {
 const todosLosProfesoresCards = document.querySelectorAll('.profesor');
 
 todosLosProfesoresCards.forEach(card => {
 card.addEventListener('click', () => {
 const idProfesorClickeado = card.dataset.idProfesor;
 mostrarDetalleProfesor(idProfesorClickeado);
 });
 });
 }
 
 btnVolver.addEventListener('click', () => {
 mostrarListaProfesores();
 });
    
    
    btnEnviarReseña.addEventListener('click', manejarEnvioReseña); 
    
    cargarGaleria();