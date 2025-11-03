const tituloMensaje = document.querySelector('.titulo');
const textareaMensaje = document.querySelector('textarea');
const btnEnviarMensaje = document.querySelector('button[type="submit"]');

function enviarMensaje(event) {

    event.preventDefault(); 
    
    const mensaje = textareaMensaje.value.trim();
    const nombreProfesor = tituloMensaje.textContent.replace('Enviar mensaje a ', '').trim();
    
    if (mensaje === "") {
        alert("El mensaje no puede estar vacío. Por favor, escribe algo.");
        return;
    }
    

    alert(`¡Mensaje enviado con éxito a ${nombreProfesor}!\n\nMensaje: "${mensaje}"`);
    
    textareaMensaje.value = '';
    
}

btnEnviarMensaje.addEventListener('click', enviarMensaje); 


function setProfesorDesdeURL() {
    const params = new URLSearchParams(window.location.search);
    const nombreProfesor = params.get('profesor');

    if (nombreProfesor) {

        tituloMensaje.textContent = `Enviar mensaje a ${decodeURIComponent(nombreProfesor)}`;
    } else {

        tituloMensaje.textContent = 'Enviar mensaje';
    }
}


setProfesorDesdeURL();