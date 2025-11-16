window.addEventListener("DOMContentLoaded", () => {
  const inputFecha = document.getElementById("fecha");
  const inputMail = document.getElementById("mail");
  const nombreUsuario = document.querySelector(".nombre");
  const btnEditar = document.querySelector(".btn-editar");
  const btnConfirmar = document.querySelector(".btn-confirmar");
  const fotoUsuario = document.querySelector(".foto img");

 
  const usuarioData = JSON.parse(localStorage.getItem("usuarioActual"));

  if (!usuarioData) {
    alert("No se encontró información del usuario. Iniciá sesión nuevamente.");
    window.location.href = "../Pantalla 11/index.html";
    return;
  }


  nombreUsuario.textContent = usuarioData.usuario || "Usuario";
  inputFecha.value = usuarioData.nacimiento || "";
  inputMail.value = usuarioData.mail || "";
  fotoUsuario.src = usuarioData.foto || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  
  btnEditar.addEventListener("click", () => {
    inputFecha.removeAttribute("readonly");
    inputMail.removeAttribute("readonly");
    btnConfirmar.style.display = "block";
    btnEditar.style.display = "none";
  });

  btnConfirmar.addEventListener("click", async () => {
    const nuevosDatos = {
      ...usuarioData,
      mail: inputMail.value,
      nacimiento: inputFecha.value,
      foto: usuarioData.foto
    };

    try {
      const respuesta = await fetch("http://localhost:3003/actualizarPerfil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevosDatos),
      });

      const data = await respuesta.json();

      if (data.ok) {
        alert("Perfil actualizado correctamente");

        localStorage.setItem("usuarioActual", JSON.stringify(data.usuario));

        inputFecha.setAttribute("readonly", true);
        inputMail.setAttribute("readonly", true);
        btnConfirmar.style.display = "none";
        btnEditar.style.display = "block";

      } else {
        alert("Error al actualizar perfil");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("No se pudo conectar con el servidor.");
    }
  });
});
