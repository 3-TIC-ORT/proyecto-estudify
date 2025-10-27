const profe = JSON.parse(localStorage.getItem('profeSeleccionado'));

const imgElemento = document.querySelector('.card-profesor img');
const nombreElemento = document.querySelector('.card-profesor h2');

if (profe) {
  imgElemento.src = profe.img;
  imgElemento.alt = profe.nombre;
  nombreElemento.textContent = profe.nombre;

}
