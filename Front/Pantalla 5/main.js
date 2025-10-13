// Obtener la materia seleccionada desde la URL
const params = new URLSearchParams(window.location.search);
const materia = params.get("materia");

// Seleccionamos todos los profesores
const todosLosProfes = document.querySelectorAll(".profesor");

// Primero ocultamos todos
todosLosProfes.forEach(prof => prof.style.display = "none");

// Dependiendo de la materia, mostramos solo algunos
switch (materia) {
  case "matematica":
    mostrarProfes(["Juan Perez", "Alejandro Gomez", "Julian Gonzalez"]);
    break;
  case "lengua":
    mostrarProfes(["Martina Rodriguez", "Isabella Lopez", "Juana Sanchez"]);
    break;
  case "ingles":
    mostrarProfes(["Pedro Dominguez", "Julia Romero", "Roberto Diaz"]);
    break;
  case "historia":
    mostrarProfes(["Lucia Gonzales", "Miguel Gomez", "Martin Gimenez"]);
    break;
  case "ciencias":
    mostrarProfes(["Ambar Garcia", "Tomas Fernandez", "Melina Morales", "Mia Hernandez"]);
    break;
  default:
    document.body.insertAdjacentHTML("afterbegin", "<h2>No se seleccionó ninguna materia.</h2>");
}

// Función para mostrar profesores según nombre
function mostrarProfes(nombres) {
  todosLosProfes.forEach(prof => {
    const nombre = prof.querySelector(".nombre-profesor").textContent.trim();
    if (nombres.includes(nombre)) {
      prof.style.display = "block";
    }
  });
}
