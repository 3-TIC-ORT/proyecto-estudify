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

usuarios.push({"nombreYapellido": datos.nombre, "contraseña": datos.contraseña, "mail":datos.mail, "numeroDeTelefono":datos.teléfono, "nacimiento":datos.nacimiento, "Materias":datos.Materias,});

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

// PROFESORES POR MATERIA
subscribeGETEvent("profesoresPorMateria", obtenerProfesoresPorMateria);

function obtenerProfesoresPorMateria(datos) {
  const {materia} = datos; // el front manda algo como { materia: "Matemática" }
  let data = fs.readFileSync("profesores.json", "utf-8");
  let profesores = JSON.parse(data);

  if (!materia) {
    return { error: "Debe indicar una materia" };
  }

  const filtrados = profesores.filter(p => p.materia === materia);
  return filtrados.length > 0 ? filtrados : { mensaje: "No hay profesores para esa materia" };
}

// MATERIAS DISPONIBLES
subscribeGETEvent("materias", obtenerMaterias);

function obtenerMaterias() {
  let data = fs.readFileSync("profesores.json", "utf-8");
  let profesores = JSON.parse(data);
  // Saco todas las materias sin repetir
  let materias = [...new Set(profesores.map(p => p.materia))];
  return materias;
}

//reseñas
subscribeGETEvent("resenas", () => {
  const data = fs.readFileSync("./Back/Resenas/resenas.json", "utf-8");
  return JSON.parse(data);
});

subscribePOSTEvent("agregarResena", (nueva) => {
  const data = fs.readFileSync("./Back/Resenas/resenas.json", "utf-8");
  const resenas = JSON.parse(data);
  nueva.id = resenas.length + 1;
  resenas.push(nueva);
  fs.writeFileSync("./Back/Resenas/resenas.json", JSON.stringify(resenas, null, 2));
  return { ok: true, resena: nueva };
});

//perfil usuario
import path from 'path';
const filePath = path.resolve('./Back/Usuarios/usuarios.json');

// actualizar perfil (versión Soquetic)
subscribePOSTEvent("actualizarPerfil", (data) => {
  const { id, ...nuevaData } = data;

  let usuarios = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) return { error: "Usuario no encontrado" };

  // Actualizar campos
  usuario.nombre = nuevaData.nombre || usuario.nombre;
  usuario.telefono = nuevaData.telefono || usuario.telefono;
  usuario.foto = nuevaData.foto || usuario.foto;
  if (nuevaData.password) usuario.password = nuevaData.password;

  // guardar cambios
  fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2), 'utf-8');
  return { ok: true, usuario };
});

// Endpoint ejemplo (usando Express)
import express from 'express';
const app = express();
app.use(express.json());

app.put('/perfil/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const datos = req.body;
  const resultado = actualizarUsuario(id, datos);
  res.json(resultado);
});

startServer(3002);

