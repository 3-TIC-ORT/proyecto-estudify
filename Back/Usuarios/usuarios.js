//registrarse 

import fs, { writeFileSync } from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const relativePath = './Back/Usuarios/usuarios.json';
const absolutePath = path.resolve(__dirname, relativePath);

export function registrarUsuario(data) {
    let usuarios = []
    try {
        if (fs.existsSync(absolutePath)) {
            usuarios = JSON.parse(fs.readFileSync(absolutePath, 'utf-8'))
        }
        else {
            writeFileSync(absolutePath, "")
        }

        fs.writeFileSync(absolutePath, JSON.stringify(usuarios, null, 2))
        return { success: true, info: "Usuario registrado con exitro" }
    }
    catch {
        return { success: false, info: "Error al registrar usuario" }
    }

}

fs.writeFileSync('./Usuarios/usuarios.json')
fs.readFileSync(absolutePath, 'utf-8');
fs.existsSync

//log in
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const relativePath = './Back/Usuarios/usuarios.json';
const absolutePath = path.resolve(__dirname, relativePath);

export function iniciarUsuario(data){

    export function iniciarSesion(data) {
        try {
            if (!fs.existsSync(absolutePath)) {
                return { success: false, info: "No hay usuarios registrados" };
            }
    
            const contenido = fs.readFileSync(absolutePath, 'utf-8');
            const usuarios = JSON.parse(contenido || "[]");
    
            const usuarioEncontrado = usuarios.find(u => u.usuario === data.usuario);
    
            if (!usuarioEncontrado) {
                return { success: false, info: "Usuario no encontrado" };
            }
    
            if (usuarioEncontrado.contra !== data.contra) {
                return { success: false, info: "Contraseña incorrecta" };
            }
    
            return { success: true, info: "Inicio de sesión exitoso" };
        
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            return { success: false, info: "Error interno del servidor" };
        } 
    }