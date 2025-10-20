const formRegistro = document.getElementById('formRegistro')

const inputNyA = document.getElementById('Nombre y Apellido')
const inputEmail = document.getElementById('email')
const inputPassword = document.getElementById('password')
const inputDate = document.getElementById('Fecha de nacimiento')
const inputTel = document.getElementById('Número de telefono')
const inputSubmit = document.getElementById('comenzar')

formRegistro.addEventListener('submit', (e) => {
  e.preventDefault();
  const usuarioGuardar = {
    nombre: inputNyA.value,
    contraseña: inputPassword.value,
    nacimiento: inputDate.value,
    telefono: inputTel.value,
    mail: inputEmail.value,
  }
  console.log(usuarioGuardar);
  postEvent('registrarUsuario', usuarioGuardar, (res) => {
    if (res.success == true) {
      window.location.href = "/Front/Pantalla 4/index.html"
    }
    else {
      alert('Error al registrar usuario');
    }
  })
})

