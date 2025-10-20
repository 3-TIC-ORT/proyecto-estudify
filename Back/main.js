import fs from "fs";

// sign up
let data = fs.readFileSync("usuarios.json", "utf-8");

let usuarios = JSON.parse(data);

usuarios.push({"usuario": "Luu", "contra": "1234"});
usuarios.push({"usuario": "Estudiante", "contra": "5678"})

let nuevoJson = JSON.stringify(usuarios, null, 2);

fs.writeFileSync("usuarios.json", nuevoJson);

//log in

let login = fs.readFileSync ("usuarios.json", "utf-8")

let persona = { nombre: "Luu", contra: "1234" };
persona = {nombre: "Estudiante", contra: "5678"}

let jsonPersona = JSON.stringify(persona);

console.log(jsonPersona); 

let legible = JSON.stringify(persona, null, 2);

console.log(legible);