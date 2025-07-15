import { useForm } from 'react-hook-form'
import { BasicForm } from './components/BasicForm.jsx'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useState } from 'react'

const schema = yup.object({
  userInput: yup.string().min(3, 'Write at least 3 characters').required('This field is required')
})

export const App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  // Guarda la respuesta de llama2

  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePregunta = async (data) => {
    setLoading(true)

    try {
      const res = await axios.post('http://localhost:11434/api/generate',
        {
          model: 'llama2',
          prompt: data.userInput,
          stream: false
        }
      )

      /* if (!res.ok) {
        throw new Error('Error with the request')
      } */

      setResponse(res.data.response)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(handlePregunta)}>
          <input
            type='text'
            {...register('userInput')}
          />
          {errors.userInput && <p>{errors.userInput.message}</p>}
          <button type='submit'>Pregunta</button>
        </form>
      </div>

      <div>
        <p>{loading ? 'Loading...' : response}</p>
      </div>
    </>
  )
}
