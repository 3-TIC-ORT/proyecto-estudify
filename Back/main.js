import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, startServer } from 'soquetic'


// parchear todas las respuestas
subscribeGETEvent("cors", () => ({ mensaje: "CORS activo" }));

//sign up

subscribePOSTEvent('registrarUsuario', registrarUsuario);

function registrarUsuario(datos) {
  let data = fs.readFileSync("usuarios.json", "utf-8");
  let usuarios = JSON.parse(data);

  if (!datos.rol || (datos.rol !== "alumno" && datos.rol !== "profesor")) {
    return { success: false, mensaje: "Rol inválido. Debe ser 'alumno' o 'profesor'." };
  }
  const nuevoUsuario = {
    usuario: datos.usuario, contraseña: datos.contraseña, mail: datos.mail, telefono: datos.telefono, nacimiento: datos.nacimiento, materias: datos.materias, rol: datos.rol, id: usuarios.length + 1, foto: datos.foto 
  };

  usuarios.push(nuevoUsuario);

  fs.writeFileSync("usuarios.json", JSON.stringify(usuarios, null, 2));

  return { success: true, usuario: nuevoUsuario };

}

// log in

subscribePOSTEvent('loginUsuario', iniciarUsuario);

function iniciarUsuario (data){

    let contenido = fs.readFileSync("usuarios.json", "utf-8");
    let usuarios = JSON.parse(contenido);
  
    let usuarioEncontrado = usuarios.find(u => u.usuario === data.usuario);
  
    if (!usuarioEncontrado) {
      return { exito: false, mensaje: "Usuario no encontrado" };
    }
  
    if (usuarioEncontrado.contraseña !== data.contraseña) {
      return { exito: false, mensaje: "Contraseña incorrecta" };
    }
  
    return { exito: true, mensaje: "Inicio de sesión exitoso" };
  
}

// profesores
subscribeGETEvent("profesores", obtenerProfesores);

function obtenerProfesores() {
  try {
    let data = fs.readFileSync("profesores.json", "utf-8");
    let profesores = JSON.parse(data);
    return { success: true, profesores }; 
  } catch (error) {
    console.error("Error al leer profesores.json:", error);
    return { success: false, error: "No se pudo leer el archivo de profesores." };
  }
}


// profe por materia
subscribeGETEvent("profesoresPorMateria", obtenerProfesoresPorMateria);

function obtenerProfesoresPorMateria(datos) {
  const {materia} = datos; // el front manda algo como ( materia: "Matemática" )
  let data = fs.readFileSync("profesores.json", "utf-8");
  let profesores = JSON.parse(data);

  if (!materia) {
    return { error: "Debe indicar una materia" };
  }

  const filtrados = profesores.filter(p => p.materia === materia);
  return filtrados.length > 0 ? filtrados : { mensaje: "No hay profesores para esa materia" };
}

// materias 
subscribeGETEvent("materias", obtenerMaterias);

function obtenerMaterias() {
  let data = fs.readFileSync("profesores.json", "utf-8");
  let profesores = JSON.parse(data);
  // saco todas las materias sin repetir
  let materias = [...new Set(profesores.map(p => p.materia))];
  return materias;
}

// reseñas
subscribeGETEvent("resenas", () => {
  const data = fs.readFileSync("resenas.json", "utf-8");
  return JSON.parse(data);
});

subscribePOSTEvent("agregarResena", (nueva) => {
  const data = fs.readFileSync("resenas.json", "utf-8");
  const resenas = JSON.parse(data);
  nueva.id = resenas.length + 1;
  resenas.push(nueva);
  fs.writeFileSync("resenas.json", JSON.stringify(resenas, null, 2));
  return { ok: true, resena: nueva };
});

//reseñas, usuarios pueden agregar 

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resenasPath = path.resolve(__dirname, './resenas.json');

// si el archivo existe
if (!fs.existsSync(resenasPath)) {
    fs.writeFileSync(resenasPath, JSON.stringify([]));
}

// endpoint para agregar reseña
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

        return { success: true, message: "Resena agregada", resena: nuevaResena };
    } catch (err) {
        return { success: false, message: err.message };
    }
});

// endpoint para obtener reseñas de un profesor

subscribeGETEvent("resenasProfesor", (params) => {
  const { profesorId } = params; // el front te envía el id del profesor
  const resenas = JSON.parse(fs.readFileSync(resenasPath, "utf-8"));
  const resenasProfesor = resenas.filter(r => r.profesorId == profesorId);
  return { success: true, resenas: resenasProfesor };
});

//perfil usuario
const filePath = path.resolve('./usuarios.json');

// actualizar perfil (versión soquetic)
subscribePOSTEvent("actualizarPerfil", (data) => {
  let usuarios = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const usuario = usuarios.find(u => u.id === data.id);

  if (!usuario) return { error: "Usuario no encontrado" };

  // actualizar perfil con todos los datos del registro
  usuario.usuario = data.usuario || usuario.usuario;
  usuario.mail = data.mail || usuario.mail;
  usuario.telefono = data.telefono || usuario.telefono;
  usuario.nacimiento = data.nacimiento || usuario.nacimiento;
  usuario.materias = data.materias || usuario.materias;
  usuario.rol = data.rol || usuario.rol;
  usuario.foto = data.foto || usuario.foto;
  if (data.contraseña) usuario.contraseña = data.contraseña;

  // guardar cambios
  fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2), 'utf-8');
  return { ok: true, usuario };
});
// ---------------------------------------------
// GET: Lista de conversaciones de un alumno
// ---------------------------------------------
subscribeGETEvent("listaConversaciones", (data) => {
  const { usuario } = data;

  const todas = JSON.parse(fs.readFileSync("./mensajes.json", "utf8"));

  // Filtrar conversaciones donde el alumno participa
  const convAlumno = todas.filter(
      c => c.identificadorAlumno === usuario
  );

  // Armar respuesta
  const resultado = convAlumno.map(c => {
      const ultimo = c.mensajes[c.mensajes.length - 1];

      return {
          profesor: c.identificadorProfesor,
          ultimoMensaje: ultimo.texto,
          fecha: Date.now()
      };
  });

  return { success: true, conversaciones: resultado };
});


// ---------------------------------------------
// GET: Obtener mensajes entre un alumno y un profesor
// ---------------------------------------------
subscribeGETEvent("mensajesConversacion", (data) => {
  const { profesor, alumno } = data;

  const todas = JSON.parse(fs.readFileSync("./mensajes.json", "utf8"));

  const conversacion = todas.find(
      c =>
          c.identificadorProfesor === profesor &&
          c.identificadorAlumno === alumno
  );

  if (!conversacion)
      return { success: true, mensajes: [] };

  return { success: true, mensajes: conversacion.mensajes };
});


// ---------------------------------------------
// POST: Guardar mensaje nuevo
// ---------------------------------------------
subscribePOSTEvent("guardarMensaje", (data) => {
  const mensajes = JSON.parse(fs.readFileSync("./mensajes.json", "utf8"));

  const { identificadorProfesor, identificadorAlumno, perfil, texto } = data;

  let conversacion = mensajes.find(
      c =>
          c.identificadorProfesor === identificadorProfesor &&
          c.identificadorAlumno === identificadorAlumno
  );

  if (!conversacion) {
      conversacion = {
          identificadorProfesor,
          identificadorAlumno,
          mensajes: []
      };
      mensajes.push(conversacion);
  }

  conversacion.mensajes.push({ perfil, texto });

  fs.writeFileSync("./mensajes.json", JSON.stringify(mensajes, null, 2));

  return { success: true };
});



startServer();


