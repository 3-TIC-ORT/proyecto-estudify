import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, startServer } from 'soquetic'
import { registrarUsuario } from './Usuarios/usuarios.js'

startServer(3000);

// sign up

subscribePOSTEvent('registrarUsuario', registrarUsuario);