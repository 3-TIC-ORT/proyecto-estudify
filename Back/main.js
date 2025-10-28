import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, startServer } from 'soquetic'

subscribeGETEvent("cors", () => {
  return { mensaje: "CORS activo" };
});

// Parchear todas las respuestas
subscribeGETEvent("cors", () => ({ mensaje: "CORS activo" }));


// sign up

subscribePOSTEvent('registrarUsuario', registrarUsuario);

function registrarUsuario(datos){
let data = fs.readFileSync("usuarios.json", "utf-8");

let usuarios = JSON.parse(data);

usuarios.push({"usuario": datos.usuario, "contraseña": datos.contraseña, "mail":datos.mail, "numeroDeTelefono":datos.teléfono, "nacimiento":datos.nacimiento, "Materias":datos.Materias,});

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
subscribeGETEvent("reseñas", () => {
  const data = fs.readFileSync("reseñas.json", "utf-8");
  return JSON.parse(data);
});

subscribePOSTEvent("agregarResena", (nueva) => {
  const data = fs.readFileSync("reseñas.json", "utf-8");
  const resenas = JSON.parse(data);
  nueva.id = resenas.length + 1;
  resenas.push(nueva);
  fs.writeFileSync("reseñas.json", JSON.stringify(resenas, null, 2));
  return { ok: true, reseña: nueva };
});

//reseñas , usuarios pueden agregar 

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { subscribePOSTEvent, subscribeGETEvent } from "soquetic";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resenasPath = path.resolve(__dirname, './resenas.json');

// Asegurarnos de que el archivo exista
if (!fs.existsSync(resenasPath)) {
    fs.writeFileSync(resenasPath, JSON.stringify([]));
}

// Endpoint para agregar reseña
subscribePOSTEvent("agregarResena", async (data) => {
    try {
        const { usuarioId, profesorId, puntuacion, comentario } = JSON.parse(data);

        if (!usuarioId || !profesorId || !puntuacion || !comentario) {
            return { success: false, message: "Faltan datos" };
        }

        const resenas = JSON.parse(fs.readFileSync(resenasPath, "utf-8"));

        const nuevaResena = {
            id: resenas.length + 1,
            usuarioId,
            profesorId,
            puntuacion,
            comentario
        };

        resenas.push(nuevaResena);
        fs.writeFileSync(resenasPath, JSON.stringify(resenas, null, 2));

        return { success: true, message: "Reseña agregada", resena: nuevaResena };
    } catch (err) {
        return { success: false, message: err.message };
    }
});

// Endpoint para obtener reseñas de un profesor
subscribeGETEvent("resenas/:profesorId", async (params) => {
    try {
        const profesorId = params.profesorId;
        const resenas = JSON.parse(fs.readFileSync(resenasPath, "utf-8"));
        const resenasProfesor = resenas.filter(r => r.profesorId == profesorId);
        return { success: true, resenas: resenasProfesor };
    } catch (err) {
        return { success: false, message: err.message };
    }
});

//perfil usuario
import path from 'path';
const filePath = path.resolve('./usuarios.json');

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
  const resultado = actualizarPerfil(id, datos);
  res.json(resultado);
});

startServer(3002);

