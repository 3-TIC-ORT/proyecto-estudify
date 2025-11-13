const formLogin = document.getElementById('formLogin');
const inputUsuario = document.getElementById('usuario');
const inputPassword = document.getElementById('password');

connect2Server();

formLogin.addEventListener('submit', (e) => {
  e.preventDefault();

  const datosLogin = {
    usuario: inputUsuario.value,
    contraseña: inputPassword.value
  };

  console.log('Enviando datos de login:', datosLogin);

  postEvent('loginUsuario', datosLogin, (res) => {
    console.log('Respuesta del servidor (login):', res);

    if (res.exito === true) {
      alert('Inicio de sesión exitoso');

      fetch('../Back/usuarios.json')
        .then(r => r.json())
        .then(usuarios => {
          const encontrado = usuarios.find(u => u.usuario === datosLogin.usuario);
          if (encontrado) {
            localStorage.setItem('usuario', JSON.stringify(encontrado));

            if (encontrado.rol === 'profesor') {
              window.location.href = '../Pantalla 7/index.html';
            } else {
              window.location.href = '../Pantalla 4/index.html';
            }
          } else {
            alert('No se pudo determinar el rol del usuario.');
          }
        })
        .catch(err => {
          console.error('Error leyendo usuarios.json:', err);
          alert('Error verificando rol del usuario');
        });
    } else {
      alert('Correo o contraseña incorrectos');
    }
  });
});

