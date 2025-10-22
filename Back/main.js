import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, startServer } from 'soquetic'
import { registrarUsuario } from './Usuarios/usuarios.js'
import { iniciarSesion } from './Usuarios/iniciarSesion.js';

startServer(3000);

// sign up

subscribePOSTEvent('registrarUsuario', registrarUsuario);

function registrarUsuario(){
let data = fs.readFileSync("usuarios.json", "utf-8");

let usuarios = JSON.parse(data);

usuarios.push({"usuario": "Luu", "contra": "1234"});

let nuevoJson = JSON.stringify(usuarios, null, 2);

fs.writeFileSync("usuarios.json", nuevoJson);
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
