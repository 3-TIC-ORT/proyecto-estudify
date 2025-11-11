
const baseDeDatosProfesores = [
    {
      "id": 1,
      "nombre": "Emily Brown",
      "materia": "Inglés",
      "imagen": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
      "info": "Emily es una profesora apasionada por la enseñanza del inglés. Combina métodos modernos con actividades interactivas para mejorar la pronunciación y comprensión.",
      "reseñas": [
        { "usuario": "Carla P.", "comentario": "Me encantaron sus clases, súper dinámicas." },
        { "usuario": "Tomás L.", "comentario": "Aprendí muchísimo en poco tiempo." }
      ]
    },
    {
      "id": 2,
      "nombre": "James Smith",
      "materia": "Inglés",
      "imagen": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
      "info": "James tiene amplia experiencia enseñando inglés a estudiantes internacionales. Sus clases se centran en conversación y fluidez.",
      "reseñas": [
        { "usuario": "Valentina C.", "comentario": "Muy paciente y explica excelente." },
        { "usuario": "Martín D.", "comentario": "Ideal para practicar conversación." }
      ]
    },
    {
      "id": 3,
      "nombre": "Olivia Johnson",
      "materia": "Inglés",
      "imagen": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
      "info": "Olivia enseña con pasión y energía. Le encanta usar música y películas para reforzar el vocabulario y la comprensión auditiva.",
      "reseñas": [
        { "usuario": "Sofía R.", "comentario": "Sus clases son muy entretenidas." },
        { "usuario": "Nico G.", "comentario": "Aprendí más con ella que en años de curso." }
      ]
    },
    {
      "id": 4,
      "nombre": "Michael Williams",
      "materia": "Inglés",
      "imagen": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      "info": "Michael tiene una forma clara y divertida de enseñar. Sus clases se enfocan en gramática aplicada y conversación real.",
      "reseñas": [
        { "usuario": "Lucía T.", "comentario": "Explica súper claro." },
        { "usuario": "Emanuel P.", "comentario": "Sus clases son un placer." }
      ]
    },
    {
      "id": 5,
      "nombre": "Sophia Davis",
      "materia": "Inglés",
      "imagen": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
      "info": "Sophia es especialista en inglés británico. Le encanta enseñar expresiones idiomáticas y acentos.",
      "reseñas": [
        { "usuario": "Lautaro M.", "comentario": "Aprendí muchísimo con sus tips de pronunciación." },
        { "usuario": "María B.", "comentario": "Tiene un enfoque muy profesional." }
      ]
    },
    {
      "id": 6,
      "nombre": "William Martinez",
      "materia": "Inglés",
      "imagen": "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400",
      "info": "William motiva a sus alumnos con ejemplos prácticos y actividades grupales. Especialista en inglés para viajes y negocios.",
      "reseñas": [
        { "usuario": "Cami F.", "comentario": "Excelente profe, muy claro." },
        { "usuario": "Diego S.", "comentario": "Lo recomiendo 100%." }
      ]
    },
    {
      "id": 7,
      "nombre": "Ava Taylor",
      "materia": "Inglés",
      "imagen": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
      "info": "Ava combina paciencia con creatividad. Usa materiales auténticos para enseñar de forma práctica.",
      "reseñas": [
        { "usuario": "Ana L.", "comentario": "Sus clases son muy divertidas." },
        { "usuario": "Bruno A.", "comentario": "Muy buena energía y claridad." }
      ]
    },
    {
      "id": 8,
      "nombre": "Daniel Anderson",
      "materia": "Inglés",
      "imagen": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      "info": "Daniel tiene una gran experiencia preparando alumnos para exámenes internacionales. Enfoca sus clases en speaking y listening.",
      "reseñas": [
        { "usuario": "Julieta C.", "comentario": "Gracias a él aprobé el First!" },
        { "usuario": "Pablo M.", "comentario": "Excelente método de enseñanza." }
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
  