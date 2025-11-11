// main.js — Profesores de Lengua

const baseDeDatosProfesores = [
    {
      "id": 1,
      "nombre": "Lucía Fernández",
      "materia": "Lengua",
      "imagen": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
      "info": "Lucía es especialista en gramática y literatura. Le apasiona fomentar la lectura y la escritura creativa en sus alumnos.",
      "reseñas": [
        { "usuario": "Emilia R.", "comentario": "Hace que todo sea fácil de entender." },
        { "usuario": "Juan P.", "comentario": "Excelente profe, muy clara." }
      ]
    },
    {
      "id": 2,
      "nombre": "Santiago Ruiz",
      "materia": "Lengua",
      "imagen": "https://images.unsplash.com/photo-1603415526960-f7e0328ad1c7?w=400",
      "info": "Santiago combina la teoría con análisis de textos actuales. Motiva a los estudiantes a expresarse con confianza.",
      "reseñas": [
        { "usuario": "Valeria T.", "comentario": "Aprendí mucho con sus clases." },
        { "usuario": "Diego F.", "comentario": "Muy dinámico y atento." }
      ]
    },
    {
      "id": 3,
      "nombre": "Valentina Morales",
      "materia": "Lengua",
      "imagen": "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400",
      "info": "Valentina enseña con entusiasmo y creatividad. Le encanta usar literatura clásica y moderna para enseñar comprensión lectora.",
      "reseñas": [
        { "usuario": "Carla G.", "comentario": "Hace las clases muy interesantes." },
        { "usuario": "Tomás E.", "comentario": "Explica con mucha paciencia." }
      ]
    },
    {
      "id": 4,
      "nombre": "Ignacio Cabrera",
      "materia": "Lengua",
      "imagen": "https://images.unsplash.com/photo-1590080875832-1c1a6c84a5c1?w=400",
      "info": "Ignacio tiene un enfoque práctico para enseñar redacción y ortografía. Promueve el pensamiento crítico y la claridad al escribir.",
      "reseñas": [
        { "usuario": "Lucía P.", "comentario": "Aprendí a redactar mucho mejor." },
        { "usuario": "Matías R.", "comentario": "Sus correcciones ayudan muchísimo." }
      ]
    },
    {
      "id": 5,
      "nombre": "Florencia Ríos",
      "materia": "Lengua",
      "imagen": "https://images.unsplash.com/photo-1614280730957-d09b2c67d2f2?w=400",
      "info": "Florencia transmite su amor por la lectura y la escritura. Sus clases son participativas y divertidas.",
      "reseñas": [
        { "usuario": "Sofi L.", "comentario": "Siempre te motiva a leer más." },
        { "usuario": "Pedro V.", "comentario": "Excelente energía y dedicación." }
      ]
    },
    {
      "id": 6,
      "nombre": "Tomás Herrera",
      "materia": "Lengua",
      "imagen": "https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=400",
      "info": "Tomás se especializa en análisis literario y comprensión textual. Le gusta conectar los textos con temas actuales.",
      "reseñas": [
        { "usuario": "Martina S.", "comentario": "Sus clases te hacen pensar." },
        { "usuario": "Lucas A.", "comentario": "Muy entretenido y profesional." }
      ]
    },
    {
      "id": 7,
      "nombre": "Camila Torres",
      "materia": "Lengua",
      "imagen": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
      "info": "Camila tiene una gran vocación docente. Le gusta enseñar ortografía, redacción y análisis de textos narrativos.",
      "reseñas": [
        { "usuario": "Mili C.", "comentario": "Sus explicaciones son muy claras." },
        { "usuario": "Juli G.", "comentario": "Aprendí un montón con ella." }
      ]
    },
    {
      "id": 8,
      "nombre": "Martín Díaz",
      "materia": "Lengua",
      "imagen": "https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9?w=400",
      "info": "Martín tiene una metodología práctica para mejorar la expresión escrita. Fomenta la lectura de autores latinoamericanos.",
      "reseñas": [
        { "usuario": "Clara J.", "comentario": "Muy claro y profesional." },
        { "usuario": "Nico Z.", "comentario": "Sus clases son un 10." }
      ]
    }
  ];
  
  const pantalla5 = document.getElementById('pantalla5');
  const pantalla6 = document.getElementById('pantalla6');
  const galeriaProfesores = document.querySelector('.galeria-profesores');
  const btnVolver = document.getElementById('btnVolver');
  const btnEnviarReseña = document.querySelector('.btn-enviar');
  const USUARIO_ACTUAL = "Tú (Alumno)";
  

  function cargarGaleria() {
    galeriaProfesores.innerHTML = ""; 

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
    if (!profesor) return console.error("Profesor no encontrado:", id);
  
    document.getElementById('detalle-img').src = profesor.imagen;
    document.getElementById('detalle-nombre').textContent = profesor.nombre;
    document.getElementById('detalle-info').textContent = profesor.info;
  
    const listaReseñasHTML = document.getElementById('detalle-reseñas');
    listaReseñasHTML.innerHTML = '';
  
    if (profesor.reseñas && profesor.reseñas.length > 0) {
      profesor.reseñas.forEach(r => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${r.usuario}:</strong> "${r.comentario}"`;
        listaReseñasHTML.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent = "Este profesor aún no tiene reseñas.";
      listaReseñasHTML.appendChild(li);
    }
  
    const btnContactar = document.querySelector('.btn-contactar');
    if (btnContactar) {
      btnContactar.onclick = () => {
        const nombreCodificado = encodeURIComponent(profesor.nombre);
        window.location.href = `../Pantalla 8/index.html?profesor=${nombreCodificado}`;
      };
    }
  
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
      const nuevaReseña = { usuario: USUARIO_ACTUAL, comentario: textoReseña };
      profesorActual.reseñas.push(nuevaReseña);
      document.querySelector('#textoReseña').value = '';
      mostrarDetalleProfesor(profesorActual.id);
      alert("¡Reseña enviada con éxito!");
    } else {
      console.error("No se encontró el profesor para agregar la reseña.");
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
  

  btnVolver.addEventListener('click', mostrarListaProfesores);
  btnEnviarReseña.addEventListener('click', manejarEnvioReseña);
  cargarGaleria();
  
