import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, startServer } from 'soquetic'

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
  
    if (usuarioEncontrado) {
      return { exito: false, mensaje: "Usuario no encontrado" };
    }
  
    if (usuarioEncontrado.contra !== data.contra) {
      return { exito: false, mensaje: "Contraseña incorrecta" };
    }
  
    return { exito: true, mensaje: "Inicio de sesión exitoso" };
}
startServer(3000);
