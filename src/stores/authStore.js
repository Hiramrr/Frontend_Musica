import { defineStore } from 'pinia'
import apiClient from '@/api/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: JSON.parse(localStorage.getItem('usuario')) || null,
    error: null,
  }),

  actions: {
    async registrarUsuario(datosUsuario) {
      this.error = null
      try {
        const respuesta = await apiClient.post('/usuarios/registro', datosUsuario)
        this.usuario = respuesta.data
        localStorage.setItem('usuario', JSON.stringify(respuesta.data))
        return true
      } catch (err) {
        console.error(err)
        this.error =
          err.response?.data?.message ||
          'No encontro al servidor, o algo fallo internamente del servidor, ojala no pase esto'
        return false
      }
    },

    logout() {
      this.usuario = null
      localStorage.removeItem('usuario')
      window.location.reload()
    },
  },

  getters: {
    estaLogueado: (state) => !!state.usuario, // Retorna true si usuario no es null
    nombreUsuario: (state) => state.usuario?.nombre || 'Invitado',
  },
})
