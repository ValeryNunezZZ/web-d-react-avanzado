import axios from 'axios'

const useOllama = () => {
  const sendMessage = async (userPrompt) => {
    try {
      const res = await axios.post('http://localhost:11434/api/generate',
        {
          model: 'llama2',
          prompt: userPrompt,
          stream: false
        }

      )
      return res
    } catch (e) {
      console.error(e)
    }
  }

  return {
    sendMessage
  }
}

export default useOllama
