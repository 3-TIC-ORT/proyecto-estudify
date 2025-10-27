import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Configuración de rutas absolutas (necesario en módulos ES)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta hacia el archivo donde se guardan los usuarios
const relativePath = "./Back/Usuarios/usuarios.json";
const absolutePath = path.resolve(__dirname, relativePath);

// Función para registrar un usuario nuevo
export function registrarUsuario(data) {
    try {
        // Leer los usuarios existentes
        let usuarios = [];
        if (fs.existsSync(absolutePath)) {
            const contenido = fs.readFileSync(absolutePath, "utf-8");
            usuarios = contenido ? JSON.parse(contenido) : [];
        }

        // Verificar si el usuario ya existe
        const existe = usuarios.some(u => u.usuario === data.usuario);
        if (existe) {
            return { success: false, info: "El usuario ya existe" };
        }

        // Agregar el nuevo usuario
        usuarios.push({
            usuario: data.usuario,
            contra: data.contra,
            telefono: data.telefono || "",
            foto: data.foto || "",
        });

        // Guardar el archivo actualizado
        fs.writeFileSync(absolutePath, JSON.stringify(usuarios, null, 2));

        return { success: true, info: "Usuario registrado con éxito" };
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return { success: false, info: "Error al registrar usuario" };
    }
}

// función para iniciar sesión
export function iniciarSesion(data) {
    try {
        if (!fs.existsSync(absolutePath)) {
            return { success: false, info: "No hay usuarios registrados" };
        }

        const contenido = fs.readFileSync(absolutePath, "utf-8");
        const usuarios = contenido ? JSON.parse(contenido) : [];

        const usuarioEncontrado = usuarios.find(u => u.usuario === data.usuario);

        if (!usuarioEncontrado) {
            return { success: false, info: "Usuario no encontrado" };
        }

        if (usuarioEncontrado.contra !== data.contra) {
            return { success: false, info: "Contraseña incorrecta" };
        }

        return { success: true, info: "Inicio de sesión exitoso", usuario: usuarioEncontrado };
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return { success: false, info: "Error interno del servidor" };
    }
}
