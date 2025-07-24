const { infoPeliculas } = require('./peliculas')
/* import { config } from 'dotenv' */
require('dotenv').config()
console.log(process.env.PORT)
console.log(process.env.NOMBRE)

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

app.get('/api/peliculas', (req, res) => {
  // res => Nos permite enviar info

  res.send(infoPeliculas)
})

app.get('/api/peliculas/accion', (req, res) => {
  // res => Nos permite enviar info

  res.send(infoPeliculas.accion)
})

/* // El :/titulo se pone, porqeu se espera que el usuario escriba algo
app.get('/api/peliculas/accion/:titulo', (req, res) => {
  // Significa que de la url vamos a requerir o necesitar la variable titulo que se va a guardar en t
  const t = req.params.titulo

  const resultados = infoPeliculas.accion.filter(pelicula => {
    return pelicula.titulo === t
  })

  if (resultados.length === 0) {
    return res.status(400).send('No se encontraron coincidencias')
  }

  res.send(resultados)
}) */

// VAMO A HACER AHORA UNA RUTA PERO CON DOS PARÁMETROS
app.get('/api/peliculas/accion/titulo/:titulo/:year', (req, res) => {
  // Como son ahora dos parámetros vamos a desustructurar
  const { t, y } = req.params

  const resultados = infoPeliculas.accion.filter(pelicula => {
    return pelicula.titulo === t && pelicula.year === Number(y)
  })

  if (resultados.length === 0) {
    return res.status(400).send(`No se encontraron coincidencias para la película ${t} del año ${y}`)
  }

  res.send(resultados)
})

// PARÁMETRO QUERY (sintaxis ejemplo): http://localhost:3000/api/?cualquierNombreQueLeDemos=cualquierValorQueIngreseElUuario

app.get('/api/peliculas/comedia/:titulo', (req, res) => {
  const t = req.params.titulo

  const resultados = infoPeliculas.filter(pelicula => {
    return pelicula.comedia.titulo === t
  })

  if (req.query.ordenar === 'year') {
    return infoPeliculas.comedia.sort((a, b) => {
      return a.year - b.year
    })
  }

  res.send(resultados)
})

/* app.get('/api/peliculas/comedia', (req, res) => {
  // res => Nos permite enviar info

  res.send(infoPeliculas.comedia)
}) */

// ESTO ES UN MIDDLEWARE
/* 	Middleware that parses JSON request bodies to an object => express.json() */
/* Adds the JSON parser middleware to your Express app => app.use(express.json()) */
app.use(express.json())
app.post('/api/peliculas', (req, res) => {
  const nuevaPelicula = req.body

  // Lo que nos llega del body
  console.log(nuevaPelicula)
  // Mensaje que se envía luego de recibir la info
  res.status(201).send({
    mensaje: 'La pelicula se recibió con exito',
    datos: nuevaPelicula
  })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
