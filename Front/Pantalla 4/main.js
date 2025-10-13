document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("confirmarBtn");
    const select = document.getElementById("materia");
  
    boton.addEventListener("click", () => {
      const materia = select.value;
  
      if (!materia) {
        alert("Por favor, seleccioná una materia");
        return;
      }
  
      switch (materia) {
        case "matematica":
          window.location.href = "pantalla5-matematica/index.html";
          break;
        case "lengua":
          window.location.href = "pantalla5-lengua/index.html";
          break;
        case "ingles":
          window.location.href = "pantalla5-ingles/index.html";
          break;
        case "historia":
          window.location.href = "pantalla5-historia/index.html";
          break;
        case "ciencias":
          window.location.href = "pantalla5-ciencias/index.html";
          break;
      }
    });
  });
  
  
  
