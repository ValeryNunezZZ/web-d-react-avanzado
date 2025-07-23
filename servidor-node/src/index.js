/* TRES PASOS:
    1. llamar al módulo
    2. crear el servidor
    3. escuchar lo que nos responde el servidor
 */

// LLAMAR AL MÓDULO NATIVO DE NODE JS
const http = require('http')

// CREACIÓN DEL SERVER
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hola mundo desde Node.js')
})

const PORT = 3000

// CORRER EL SERVER POR EL PUERTO QUE NOSOTROS QUERRAMOS
server.listen(PORT, () => {
  console.log('Servidor ejecutandose en el port http://localhost:3000')
})
