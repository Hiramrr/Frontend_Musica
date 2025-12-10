import { defineStore } from 'pinia'
import apiClient from '@/api/axios'

export const useUsuariosStore = defineStore('usuarios', {
  state: () => ({
    listaUsuarios: [], //lista que contendra todos los usuarios
    usuarioSeleccionado: null, //para ver el usuario que se selecciono
    cargando: false, //control de la ui de carga, como unos circulos de carga jaja
    error: null, //fallosss
  }),

  actions: {
    //Primero pone cargando true para que por si tarda el usuario tenga una retroalimentacion en la gui
    // despues hace una peticion get a /usuarios para que le regrese la lista de todos los usuarios
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

    // pone el usuario seleccionado en null para que no haya mas de uno,
    // despues hace una peticion get a /usuarios/${id} que le regresa los datos de ese usuario en especifico
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
