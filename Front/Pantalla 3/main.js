const formRegistro = document.getElementById('formRegistro')

const inputNyA = document.getElementById('nombreApellido')
const inputEmail = document.getElementById('email')
const inputPassword = document.getElementById('password')
const inputDate = document.getElementById('fechaNacimiento')
const inputTel = document.getElementById('numeroTelefono')
const inputSubmit = document.getElementById('comenzar')

connect2Server();

formRegistro.addEventListener('submit', (e) => {
  e.preventDefault();
  alert(inputPassword.value)
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
      window.location.href = "../Pantalla 4/index.html"
    }
    else {
      alert('Error al registrar usuario');
    }
  })
})

