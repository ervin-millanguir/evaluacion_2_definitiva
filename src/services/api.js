import axios from 'axios'
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' },
})
api.interceptors.request.use(config => {
  const token = localStorage.getItem('happyPawsToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
api.interceptors.response.use(r => r, error => {
  const ruta = error.config?.url || ''
  if (error.response?.status === 401 && !ruta.includes('/auth/login') && !ruta.includes('/auth/registro')) {
    localStorage.removeItem('happyPawsToken')
    localStorage.removeItem('sesionActual')
    window.dispatchEvent(new Event('happy-paws-sesion-vencida'))
  }
  return Promise.reject(error)
})
export default api
