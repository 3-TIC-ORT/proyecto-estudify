// POPUP
function mostrarPopup(mensaje, callback = null) {
  const popup = document.getElementById('popup');
  const texto = document.getElementById('popupMensaje');
  const btn = document.getElementById('popupBtn');

  texto.textContent = mensaje;
  popup.classList.remove('hidden');

  btn.onclick = () => {
    popup.classList.add('hidden');
    if (callback) callback();
  };
}

// FORMULARIO
const formRegistro = document.getElementById('formRegistro');

const inputNyA = document.getElementById('nombreApellido');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const inputDate = document.getElementById('fechaNacimiento');
const inputTel = document.getElementById('numeroTelefono');
const inputRol = document.getElementById('rol');

connect2Server();

formRegistro.addEventListener('submit', (e) => {
  e.preventDefault();

  const usuarioGuardar = {
    usuario: inputNyA.value,
    contraseña: inputPassword.value,
    nacimiento: inputDate.value,
    telefono: inputTel.value,
    mail: inputEmail.value,
    rol: inputRol.value
  };

  console.log('Enviando usuario al servidor:', usuarioGuardar);

  postEvent('registrarUsuario', usuarioGuardar, (res) => {
    console.log('Respuesta del servidor (registro):', res);

    if (res.success === true) {
      mostrarPopup('Registro exitoso', () => {
        localStorage.setItem('usuarioActual', JSON.stringify(res.usuario || usuarioGuardar));

        if (usuarioGuardar.rol === 'profesor') {
          window.location.href = '../Pantalla 7/index.html';
        } else {
          window.location.href = '../Pantalla 4/index.html';
        }
      });

    } else {
      mostrarPopup('Error al registrar usuario: ' + (res.mensaje || 'ver consola'));
    }
  });
});
