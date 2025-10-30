const baseDeDatosProfesores = [
   {
      id: 1,
      nombre: "Juan Perez",
      imagen: "https://media.istockphoto.com/id/1153206644/es/foto/hombre-ejecutivo-en-traje-de-moda-mirando-a-la-c%C3%A1mara.jpg?s=612x612&w=0&k=20&c=eNttZIZF3qjdZvjqeLqorvUyeT-wYyw_rt5BMrj06VM=",
      info: "Juan es un experto en Cálculo Diferencial e Integral. Tiene más de 15 años de experiencia y una paciencia infinita para explicar los conceptos más difíciles.",
      reseñas: [
          { usuario: "Micaela R.", comentario: "¡Un genio! Aprobé gracias a él." },
          { usuario: "Lucas G.", comentario: "Explica 10/10." }
      ]
  },
   {
      id: 2,
      nombre: "Alejandro Gomez",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIavu-4J8Vb3fTVkPhAxFwqu8VdX4QvgOseQ&s",
      info: "Alejandro se especializa en Álgebra Lineal y vectores. Hace que temas muy abstractos parezcan sencillos con ejemplos de la vida real.",
      reseñas: [
          { usuario: "Sofía P.", comentario: "El mejor profe de álgebra que tuve." }
      ]
  },
{
      id: 3,
      nombre: "Julian Gonzalez",
      imagen: "https://img.freepik.com/foto-grafico-gratis/retrato-hombre-gafas_329181-12127.jpg?semt=ais_hybrid&w=740&q=80",
      info: "Profesor de Estadística y Probabilidad. Sus clases son muy prácticas y enfocadas en análisis de datos. Siempre trae ejercicios interesantes.",
      reseñas: [
          { usuario: "Tomás F.", comentario: "Me ayudó a entender estadística para mi tesis." },
          { usuario: "Valen L.", comentario: "Muy claro y siempre dispuesto a ayudar." }
      ]
 },
{
    id: 4,
     nombre: "Martina Rodriguez",
     imagen: "https://media.istockphoto.com/id/956564854/es/foto/cerca-de-retrato-de-mujer-bonita-encantadora-alegre-en-camisa-gafas-encontrar-una-idea.jpg?s=612x612&w=0&k=20&c=xiXIkiGtmcKW51u3qXuiaBP0SCOwCUl0qge0rFsE0JI=",
     info: "Martina es experta en Geometría y Trigonometría. Tiene una habilidad especial para hacer visuales los problemas y que puedas entenderlos.",
      reseñas: [
          { usuario: "Agustina B.", comentario: "¡La mejor! Súper didáctica." }
      ]
  },
  {
      id: 5,
      nombre: "Isabella Lopez",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD5CmHG3iBzib-L_id28mQouqDljrF69c0qA&s",
      info: "Especialista en Física Matemática. Si tienes problemas con los temas que combinan física y matemática avanzada, Isabella es la indicada.",
      reseñas: [
          { usuario: "Javier M.", comentario: "Una genia total, sabe muchísimo." }
      ]
  },
{
    id: 6,
    nombre: "Juana Sanchez",
      imagen: "https://www.clarin.com/2023/05/04/xICdTNtB__720x0__1.jpg",
      info: "Juana se dedica a la Didáctica de las Matemáticas, ideal para quienes cursan profesorados o necesitan un enfoque más pedagógico.",
      reseñas: [
          { usuario: "EstudianteProf.", comentario: "Aprendí mucho sobre cómo enseñar." }
      ]
},
 {
      id: 7,
     nombre: "Pedro Dominguez",
     imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPVk6k5xuCFxJE5MRDlmfrdeHCuGH1qYSMBp8_PwkvfwK1KWcQrg4z9WAIDNWM84Ox-a0&usqp=CAU",
     info: "Experto en Matemática Financiera. Perfecto para estudiantes de Economía, Administración o Contabilidad. Explica interés simple y compuesto como nadie.",
      reseñas: [
          { usuario: "Ramiro C.", comentario: "Aprobé finanzas gracias a Pedro." },
          { usuario: "Camila Z.", comentario: "Muy paciente." }
      ]
   },
{
     id: 8,
   nombre: "Julia Romero",
   imagen: "https://media.vogue.mx/photos/5c0702997ce4111b8fae953f/2:3/w_2560%2Cc_limit/amal_clooney_1346.jpg",
   info: "Julia es profesora de Lógica y Teoría de Conjuntos. Sus clases son desafiantes y te ayudan a estructurar tu pensamiento como un verdadero matemático.",
   reseñas: [
          { usuario: "Federico A.", comentario: "Clases de altísimo nivel." }
      ]
  }
  ];
  
  const pantalla5 = document.getElementById('pantalla5');
  const pantalla6 = document.getElementById('pantalla6');
  const galeriaProfesores = document.querySelector('.galeria-profesores');
  const btnVolver = document.getElementById('btnVolver');
  
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
  
  cargarGaleria();