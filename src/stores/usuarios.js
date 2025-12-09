import { defineStore } from 'pinia'
import apiClient from '@/api/axios'

export const useUsuariosStore = defineStore('usuarios', {
  state: () => ({
    listaUsuarios: [],
    usuarioSeleccionado: null,
    cargando: false,
    error: null,
  }),

  actions: {
    async obtenerTodos() {
      this.cargando = true
      this.error = null
      try {
        const respuesta = await apiClient.get('/usuarios')
        this.listaUsuarios = respuesta.data
      } catch (err) {
        console.error(err)
        this.error = 'Error al cargar la comunidad'
      } finally {
        this.cargando = false
      }
    },

    async obtenerUsuarioPorId(id) {
      this.cargando = true
      this.usuarioSeleccionado = null
      try {
        const respuesta = await apiClient.get(`/usuarios/${id}`)
        this.usuarioSeleccionado = respuesta.data
      } catch (err) {
        console.error(err)
        this.error = 'No se pudo cargar el perfil del usuario'
      } finally {
        this.cargando = false
      }
    },
  },
})
