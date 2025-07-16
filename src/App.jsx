import { useForm } from 'react-hook-form'
import { BasicForm } from './components/BasicForm.jsx'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useReducer, useState } from 'react'

const schema = yup.object({
  userInput: yup.string().min(3, 'Write at least 3 characters').required('This field is required')
})

const initialState = {
  messages: []
}

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD-MESSAGE':
      console.log('agregando mensaje...')
      console.log(state)

      return { ...state, messages: [...state.messages, action.payload] }

    default:
      return state
  }
}

export const App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  // Guarda la respuesta de llama2

  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const [state, dispatch] = useReducer(chatReducer, initialState)

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
      // dispatch para guardar el mensaje del usuario
      dispatch({
        type: 'ADD-MESSAGE',
        payload: {
          from: 'user',
          text: data.userInput
        }
      })

      dispatch({
        type: 'ADD-MESSAGE',
        payload: {
          from: 'bot',
          text: res.data.response
        }
      })
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

      <div>
        {state.messages.map((msg, index) => (
          <p key={index}>{`${msg.from}: ${msg.text}`}</p>
        ))}
      </div>
    </>
  )
}
