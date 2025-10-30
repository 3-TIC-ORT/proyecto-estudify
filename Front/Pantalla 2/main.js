const formLogin = document.getElementById('formLogin');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');

connect2Server();

formLogin.addEventListener('submit', (e) => {
  e.preventDefault();


  const datosLogin = {
    email: inputEmail.value,
    password: inputPassword.value
  };

  console.log('Datos para login:', datosLogin);

  postEvent('loginUsuario', datosLogin, (res) => {
    console.log('Respuesta del servidor:', res);

    if (res.exito === true) {
      alert('Inicio de sesión exitoso');
      window.location.href = "../Pantalla 4/index.html";
    } else {
      alert('Correo o contraseña incorrectos');
    }
  });
});
