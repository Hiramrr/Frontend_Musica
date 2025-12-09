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
    async login(credenciales) {
      try {
        const respuesta = await apiClient.post('usuarios/login', credenciales)
        this.usuario = respuesta.data
        localStorage.setItem('usuario', JSON.stringify(respuesta.data))
        return true
      } catch (err) {
        console.error(err)
        this.error = err.response?.data?.message || 'Correo o contraseñas incorrectos'
        return false
      }
    },

    async actualizarPerfil(datosActualizados) {
      this.error = null

      if (!this.usuario?.id) {
        this.error = 'No hay sesión activa'
        return false
      }

      try {
        const respuesta = await apiClient.put(
          `/usuarios/actualizar/${this.usuario.id}`,
          datosActualizados,
        )

        this.usuario = respuesta.data

        localStorage.setItem('usuario', JSON.stringify(respuesta.data))

        return true
      } catch (err) {
        console.error(err)
        this.error = err.response?.data?.message || 'Error al actualizar perfil'
        return false
      }
    },

    logout() {
      this.usuario = null
      localStorage.removeItem('usuario')
    },
  },

  getters: {
    estaLogeado: (state) => state.usuario !== null,
    nombreUsuario: (state) => state.usuario?.nombre || 'Invitado',
  },
})
