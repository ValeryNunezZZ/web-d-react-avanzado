/* IMPORTAR EXPRESS COMMONJS */

/* const express = require('express')
require('dotenv').config() */

// IMPORTAR EXPRESS Y DOTEENV COS ESMODULES

import express from 'express'
import dotenv from 'dotenv'
// nativo de node que nos permite manipular archivos
import fs from 'fs'

dotenv.config()

// 2. CREAR LA APLICACION DE EXPRESS

const app = express()
const PORT = process.env.PORT

// funcion que lee el archivo con fs
const readData = () => {
  try {
    // maneja la parte asincrona automaticamente
    const data = fs.readFileSync('./src/db.json')
    return JSON.parse(data)
  } catch (e) {
    console.error(e)
  }
}

// funcion que escribe dentro del .json

const writeData = (data) => {
  try {
    // maneja la parte asincrona automaticamente
    fs.writeFileSync('./src/db.json', JSON.stringify(data))
    return JSON.parse(data)
  } catch (e) {
    console.error(e)
  }
}

app.get('/', (req, res) => {
  res.send('hola mundo')
})

app.get('/peliculas', (req, res) => {
  const data = readData()
  // muestra la info en formatito json
  res.json(data)
})

app.get('/peliculas/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const resultado = readData().accion.find(pelicula => pelicula.id === id)
  // muestra la info en formatito json
  res.json(resultado)
})

// permite que se interprete correctamente nuestra informacion recibidad como JSON
app.use(express.json())

app.post('/peliculas', (req, res) => {
  const data = readData()
  const body = req.body

  const newMovie = {
    id: data.accion.length + 1,
    ...body
  }

  data.accion.push(newMovie)
  writeData(data)
  res.json(newMovie)
})

app.put('/peliculas/:id', (req, res) => {
  const data = readData()
  const id = parseInt(req.params.id)
  const body = req.body

  const peliculaIndex = data.accion.findIndex(movie => movie.id === id)

  data.accion[peliculaIndex] = {
    ...data.accion[peliculaIndex],
    ...body
  }

  writeData(data)
  res.json({ message: 'Pelicula actualizada correctamente' })
})

app.delete('/peliculas/:id', (req, res) => {
  const data = readData()
  const id = parseInt(req.params.id)

  const peliculaIndex = data.accion.findIndex(movie => movie.id === id)

  data.accion.splice(peliculaIndex, 1)

  writeData(data)
  res.json({ message: 'Pelicula eliminada correctamente' })
})

app.listen(PORT, () => {
  console.log('SERVIDOR ESCUCHANDO EN EL PUERTO ', PORT)
})
