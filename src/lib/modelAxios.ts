import axios from 'axios'

const modelClient = axios.create({
  baseURL: import.meta.env.VITE_MODEL_API_URL ?? 'https://moi-doctar-model.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default modelClient
