import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, startServer } from 'soquetic'
import { registrarUsuario } from './Usuarios/usuarios.js'

startServer(3000);

// sign up

subscribePOSTEvent('registrarUsuario', registrarUsuario);

// lo que estaba antes
let data = fs.readFileSync("usuarios.json", "utf-8");

let usuarios = JSON.parse(data);

usuarios.push({"usuario": "Luu", "contra": "1234"});

let nuevoJson = JSON.stringify(usuarios, null, 2);

fs.writeFileSync("usuarios.json", nuevoJson);
