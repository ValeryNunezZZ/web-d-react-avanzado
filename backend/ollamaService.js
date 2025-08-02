/* // quien se comunica con el front

// OLLAMASERVICE ES QUIEN CONSUME A OLLAMA DESDE EL BACK

import axios from 'axios'

export const generateFromOllama = async (prompt) => {
  const res = await axios.post('http://localhost:11434/api/generate',
    {
      model: 'llama2',
      prompt,
      stream: false
    })

  return res.data.reponse
}
 */

import axios from 'axios'

export const generateFromOllama = async (prompt) => {
  const res = await axios.post('http://localhost:11434/api/generate', {
    model: 'llama2',
    prompt,
    stream: false
  })
  return res.data.response
}
