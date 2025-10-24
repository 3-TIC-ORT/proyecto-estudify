import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, startServer } from 'soquetic'

subscribeGETEvent("cors", () => {
  return { mensaje: "CORS activo" };
});

// Parchear todas las respuestas
process.on("request", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
});


// sign up

subscribePOSTEvent('registrarUsuario', registrarUsuario);

function registrarUsuario(datos){
let data = fs.readFileSync("usuarios.json", "utf-8");

let usuarios = JSON.parse(data);

usuarios.push({"usuario": datos.nombre, "contra": datos.contraseña, "reseñas":datos.reseñas, "rol":datos.rol,"teléfono":datos.teléfono, "grado":datos.grado, "Materias":datos.Materias,});

let nuevoJson = JSON.stringify(usuarios, null, 2);

fs.writeFileSync("usuarios.json", nuevoJson);

return {"success": true}
}

// log in

subscribePOSTEvent('iniciarUsuario', iniciarUsuario);

function iniciarUsuario (data){

    let contenido = fs.readFileSync("usuarios.json", "utf-8");
    let usuarios = JSON.parse(contenido);
  
    let usuarioEncontrado = usuarios.find(u => u.usuario === data.usuario);
  
    if (!usuarioEncontrado) {
      return { exito: false, mensaje: "Usuario no encontrado" };
    }
  
    if (usuarioEncontrado.contra !== data.contra) {
      return { exito: false, mensaje: "Contraseña incorrecta" };
    }
  
    return { exito: true, mensaje: "Inicio de sesión exitoso" };
  
}

// profesores

subscribeGETEvent("profesores", obtenerProfesores);

function obtenerProfesores() {
  let data = fs.readFileSync("profesores.json", "utf-8");
  let profesores = JSON.parse(data);
  return profesores;
}


startServer(3002);



