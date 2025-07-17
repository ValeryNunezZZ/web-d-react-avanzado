import { ChatBot } from './components/ChatBot.jsx'
import { ChatProvider } from './context/ChatContext.jsx'

export const App = () => {
  return (
    <>
      <ChatProvider>
        <ChatBot />
      </ChatProvider>
    </>
  )
}
