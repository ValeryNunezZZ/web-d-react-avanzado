import { createContext, useReducer } from 'react'
// 1. create the global context
// le da un contexto global a ChatContext
export const ChatContext = createContext()
// 2. Provider

const initialState = {
  messages: []
}

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD-MESSAGE':
      console.log('agregando mensaje...')
      console.log(state)

      return { ...state, messages: [...state.messages, action.payload] }

    case 'SET-LOADING':
      return { ...state, loading: action.payload }

    default:
      return state
  }
}

// el provider encierra

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  return (

    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>

  )
}
