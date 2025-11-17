const nombreUsuario = document.querySelector(".nombre");
const inputMail = document.getElementById("mail");
const inputFecha = document.getElementById("fecha");
const fotoPerfil = document.getElementById("fotoPerfil");
const inputFoto = document.getElementById("inputFoto");
const btnCambiarFoto = document.getElementById("btnCambiarFoto");
const btnEditar = document.querySelector(".btn-editar");
const btnConfirmar = document.querySelector(".btn-confirmar");

let nuevaFotoBase64 = null;

let usuario = JSON.parse(localStorage.getItem("usuarioActual"));

if (!usuario) {
  alert("No se encontró un usuario activo. Iniciá sesión.");
  window.location.href = "../Pantalla 11/index.html";
}

nombreUsuario.textContent = usuario.usuario;
inputMail.value = usuario.mail;
inputFecha.value = usuario.nacimiento;
fotoPerfil.src = usuario.foto ?? "https://cdn-icons-png.flaticon.com/512/149/149071.png";


btnEditar.addEventListener("click", () => {
  inputMail.removeAttribute("readonly");
  inputFecha.removeAttribute("readonly");
  btnConfirmar.style.display = "block";
  btnEditar.style.display = "none";
  btnCambiarFoto.style.display = "block";
});

btnCambiarFoto.addEventListener("click", () => {
  inputFoto.click();
});

inputFoto.addEventListener("change", () => {
  const archivo = inputFoto.files[0];
  if (!archivo) return;

  const lector = new FileReader();
  lector.onload = () => {
    nuevaFotoBase64 = lector.result;
    fotoPerfil.src = nuevaFotoBase64;
  };
  lector.readAsDataURL(archivo);
});

btnConfirmar.addEventListener("click", () => {
  const datosActualizados = {
    usuario: usuario.usuario,
    mail: inputMail.value,
    nacimiento: inputFecha.value,
    foto: nuevaFotoBase64 ?? usuario.foto
  };

  triggerPOSTEvent("actualizarPerfil", datosActualizados, (res) => {
    if (res.exito) {
      alert("Perfil actualizado correctamente");
      localStorage.setItem("usuarioActual", JSON.stringify(datosActualizados));
      btnConfirmar.style.display = "none";
      btnEditar.style.display = "block";
      btnCambiarFoto.style.display = "none";
      inputMail.setAttribute("readonly", true);
      inputFecha.setAttribute("readonly", true);
    } else {
      alert("Error al actualizar: " + res.mensaje);
    }
  });
});