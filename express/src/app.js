// Se importa el módulo de express
const express = require('express')

// Se crea una aplicación de EXPRESS
const app = express()

// Puerto por el que va a escuchar el servidor
const PORT = 3000

// RUTA RAIZ /
app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
