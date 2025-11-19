// main.js (versión robusta - compatible con localStorage.usuarioActual y con idUsuario separado)

// elementos DOM
const nombreUsuario = document.querySelector(".nombre");
const inputMail = document.getElementById("mail");
const inputFecha = document.getElementById("fecha");
const inputRol = document.getElementById("rol");
const fotoPerfil = document.getElementById("fotoPerfil");
const inputFoto = document.getElementById("inputFoto");
const btnCambiarFoto = document.getElementById("btnCambiarFoto");
const btnEditar = document.querySelector(".btn-editar");
const btnConfirmar = document.querySelector(".btn-confirmar");

let nuevaFotoBase64 = null;
let usuario = null; // objeto usuario en uso

// Helper: cargar datos en pantalla
function cargarDatosEnPantalla(u) {
  usuario = u;
  nombreUsuario.textContent = u.usuario || "Usuario";
  inputMail.value = u.mail || "";
  inputFecha.value = u.nacimiento || "";
  if (inputRol) inputRol.value = u.rol || "";
  fotoPerfil.src = u.foto || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
}

// 1) Intentar obtener usuario desde localStorage.usuarioActual
const almacenado = localStorage.getItem("usuarioActual");

if (almacenado) {
  try {
    const parsed = JSON.parse(almacenado);
    if (parsed && (parsed.id || parsed.usuario)) {
      // usamos directamente el objeto que ya teníamos guardado
      cargarDatosEnPantalla(parsed);
    } else {
      // si no tiene id, intentar obtener por idUsuario si existe
      buscarUsuarioPorIdFallback();
    }
  } catch (e) {
    console.error("Error parseando usuarioActual:", e);
    buscarUsuarioPorIdFallback();
  }
} else {
  // no existe usuarioActual, intentar por idUsuario separado
  buscarUsuarioPorIdFallback();
}

// fallback: si guardaste solo id en localStorage bajo "idUsuario"
function buscarUsuarioPorIdFallback() {
  const idGuardado = localStorage.getItem("idUsuario");
  if (!idGuardado) {
    alert("No se encontró un usuario activo. Iniciá sesión.");
    window.location.href = "../Pantalla 11/index.html";
    return;
  }

  // pedir al backend los datos del usuario por id (si tenés ese endpoint)
  postEvent("buscarUsuarioPorID", { id: Number(idGuardado) }, (res) => {
    if (!res || res.error) {
      console.error("Error al buscar usuario por ID:", res);
      alert("No se pudo cargar el perfil. Iniciá sesión de nuevo.");
      window.location.href = "../Pantalla 11/index.html";
      return;
    }

    // res.usuario o res (dependiendo de cómo lo devuelvas en backend)
    const u = res.usuario || res;
    cargarDatosEnPantalla(u);

    // guardar copia local para futuras cargas
    localStorage.setItem("usuarioActual", JSON.stringify(u));
  });
}

// ============ BOTÓN EDITAR ============
btnEditar.addEventListener("click", () => {
  inputMail.removeAttribute("readonly");
  inputFecha.removeAttribute("readonly");
  // el rol queda readonly según pediste
  btnConfirmar.style.display = "block";
  btnEditar.style.display = "none";
  btnCambiarFoto.style.display = "block";
});

// ============ CAMBIAR FOTO ============
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

// ============ GUARDAR CAMBIOS ============
btnConfirmar.addEventListener("click", () => {
  if (!usuario || !usuario.id) {
    // intentar recuperar id desde localStorage por seguridad
    const idAlt = (usuario && usuario.id) || Number(localStorage.getItem("idUsuario"));
    if (!idAlt) {
      alert("No se encontró el id del usuario. Iniciá sesión de nuevo.");
      return;
    }
    usuario = { ...(usuario || {}), id: idAlt };
  }

  const datosActualizados = {
    id: usuario.id, // 🔥 obligatorio para que el backend actualice
    usuario: usuario.usuario, // mantenemos el nombre tal cual (no estás pidiendo editar nombre)
    mail: inputMail.value,
    nacimiento: inputFecha.value,
    rol: usuario.rol, // no editable en UI, lo preservamos
    foto: nuevaFotoBase64 ?? usuario.foto
  };

  // enviar al backend usando postEvent (Soquetic)
  postEvent("actualizarPerfil", datosActualizados, (res) => {
    // esperar respuesta con formato { ok: true, usuario: {...} } según tu backend
    if (!res) {
      alert("No se recibió respuesta del servidor");
      return;
    }

    if (res.ok || res.exito) {
      // si el backend devuelve el usuario actualizado, lo usamos; si no, usamos datosActualizados
      const usuarioGuardado = res.usuario || res.usuarioActual || datosActualizados;

      // guardar en localStorage el usuario actualizado
      localStorage.setItem("usuarioActual", JSON.stringify(usuarioGuardado));

      // actualizar variable en memoria y UI
      cargarDatosEnPantalla(usuarioGuardado);

      // volver a estado readonly
      inputMail.setAttribute("readonly", true);
      inputFecha.setAttribute("readonly", true);
      btnConfirmar.style.display = "none";
      btnEditar.style.display = "block";
      btnCambiarFoto.style.display = "none";

      alert("Perfil actualizado correctamente");
    } else {
      console.error("Error al actualizar perfil:", res);
      const mensaje = res.mensaje || res.error || "Error al actualizar perfil";
      alert(mensaje);
    }
  });
});
