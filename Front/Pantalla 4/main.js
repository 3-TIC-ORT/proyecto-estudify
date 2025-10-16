document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("materia");

  select.addEventListener("change", () => {
    const materia = select.value;

    if (materia === "matematica") {
      window.location.href = "../Pantalla 5/index.html";
    } else if (materia === "lengua") {
      window.location.href = "../Pantalla 9/index.html";
    } else if (materia === "ingles") {
      window.location.href = "../Pantalla 10/index.html";
    }
  });
});

  
  
  
