/* // SERVER.JS SE ENCARGA DE CREAR LOS ENDPOINTS PARA ENVIAR LAS SOLICITUDES DESDE EL BACK Y RESPONDER A DICHAS SOLICITUDES HACIA EL FRONT
import express from 'express'
// para que sirve cors
// permite el consumo de los endpoint aún y cuando no estamos en entorno local (en cualquier punto)
import cors from 'cors'
import { generateFromOllama } from './ollamaService.js'

// nos permite hacer uso de todos los métodos de express
const app = express()
const PORT = 3001

// para que son los middlenware para cors y json
// (gestiona los datos que hay dentro del server)
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hola mundoo')
})

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body

  try {
    const response = await generateFromOllama(prompt)
    // lo vamos a enviar como objeto para que lo podamos desestructurar despues cuando lo necesitemos
    res.json({ response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error procesando la solicitud' })
  }
})

// necesitamos un LISTEN para que  nuestro servidor pueda estar escuchando

app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto ', PORT)
})
 */

import express from 'express'
import cors from 'cors'
import { generateFromOllama } from './ollamaService.js'
import db from './db.js'

const app = express()
const PORT = 3001

// Middleware para CORS y JSON
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body

  try {
    const response = await generateFromOllama(prompt)
    res.json({ response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error procesando la solicitud' })
  }
})

// GET: obtener mensajes
app.get('/api/messages', async (req, res) => {
  await db.read()
  res.json(db.data.message)
})

// POST: Ruta para agregar nuevo mensaje
app.post('/api/messages', async (req, res) => {
  // text, sender: mensaje y quien envia el mensaje
  const { text, sender } = req.body
  if (!text || !sender) {
    return res.status(400).json({ error: 'Faltan campos en el objeto' })
  }

  const newMessage = {
    id: Date.now(),
    text,
    sender,
    timestamp: new Date().toISOString()
  }

  await db.read()
  db.data.messages.push(newMessage)
  await db.write()

  res.status(201).json(newMessage)
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`)
})
