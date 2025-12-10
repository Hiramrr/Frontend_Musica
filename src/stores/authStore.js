import { defineStore } from 'pinia'
import apiClient from '@/api/axios'

export const useAuthStore = defineStore('auth', {
  //define el estado inicial de este modulo, obtiene el usuario guardado en localStorage en forma de JSON
  state: () => ({
    usuario: JSON.parse(localStorage.getItem('usuario')) || null,
    error: null,
  }),

  actions: {
    //envia los datos del usuario al endpoint de /usuarios/registro de forma post, osea lo da de alta en el sistema
    // guarda la el usuario en localstorage
    // si falla da false
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

    //envia el correo y contraseña al endpoint de /usuarios/login de forma post,
    // si el servidor responde bien guarda al usuario y tambien en el localStorage
    // si algo sale mal le dice al usuario que tal vez su correo o contraseña son incorrectos
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

    //primero checa si esta logeado el usuario, si no entonces regresa false
    // despues hace una peticion put sobre /usuarios/actualizar/id_usuario activo
    // si la peticion sale bien actualiza el localStorage
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

    // cierra sesion en el sistema,
    // pone como al usuario en null y limpia localStorage
    logout() {
      this.usuario = null
      localStorage.removeItem('usuario')
    },

    //elimina al usuario con una peticion delete y la id que se le pase
    // si es exitoso cierra la sesion del usuario
    async eliminarUsuario(id) {
      try {
        await apiClient.delete(`/usuarios/eliminar/${id}`)

        this.logout()

        return true
      } catch (error) {
        console.error('Error eliminando usuario, ojala no pase esto')
        throw error
      }
    },
  },

  //get para saber si esta logeado el usuario
  // get del nombre del usuario, si es null regresa invitado
  getters: {
    estaLogeado: (state) => state.usuario !== null,
    nombreUsuario: (state) => state.usuario?.nombre || 'Invitado',
  },
})
