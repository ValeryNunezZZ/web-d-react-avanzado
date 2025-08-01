import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import useOllama from '../hooks/useOllama'
import '../ChatBot.css'

const schema = yup.object({
  userInput: yup.string().min(3, 'Write at least 3 characters').required('This field is required')
})

export const ChatBot = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const { state, dispatch } = useContext(ChatContext)
  const { sendMessage } = useOllama()

  const handlePregunta = async (data) => {
    dispatch({ type: 'ADD-MESSAGE', payload: { from: 'user', text: data.userInput } })
    dispatch({ type: 'SET-LOADING', payload: true })

    try {
      const res = await sendMessage(data.userInput)

      dispatch({ type: 'ADD-MESSAGE', payload: { from: 'bot', text: res.data.response } })
    } catch (error) {
      console.error(error)
    } finally {
      dispatch({ type: 'SET-LOADING', payload: false })
    }
  }

  /*   return (
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
        {state.messages.map((msg, index) => (
          <p key={index}>{`${msg.from}: ${msg.text}`}</p>
        ))}
      </div>

      <div>
        {state.loading && 'Loading...'}
      </div>
    </>
  ) */

  return (
    <div className='chat-container'>

      <div className='chat-messages'>
        {state.messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.from === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
          </div>
        ))}
        {state.loading && <p className='loading'>Generando respuesta 🚀</p>}
      </div>
      <form onSubmit={handleSubmit(handlePregunta)}>
        <input
          type='text'
          {...register('userInput')}
          placeholder='Escribe tu mensaje...'
        />
        <button type='submit'>Preguntar</button>
      </form>
      {errors.userInput && <p>{errors.userInput.message}</p>}
    </div>
  )
}
