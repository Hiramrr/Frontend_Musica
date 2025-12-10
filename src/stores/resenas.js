import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/axios'
import { useAuthStore } from './authStore'

export const useResenasStore = defineStore('resenas', () => {
  const listaResenas = ref([])
  const cargando = ref(false)
  const resenasUsuario = ref([])

  const authStore = useAuthStore() //preguntamos si esta logado

  const obtenerResenasAlbum = async (albumId) => {
    cargando.value = true
    try {
      const params = {}
      // Si hay usuario logueado, enviamos su ID
      if (authStore.usuario?.id) {
        params.usuarioId = authStore.usuario.id
      }

      const response = await apiClient.get(`/resenas/album/${albumId}`, { params })
      listaResenas.value = response.data
    } catch (error) {
      console.error('Error al obtener reseñas:', error)
      listaResenas.value = []
    } finally {
      cargando.value = false
    }
  }

  // Crear reseña real
  const crearResenaAlbum = async (albumId, { texto, puntos }) => {
    if (!authStore.usuario?.id) {
      alert('Debes iniciar sesión')
      return false
    }

    try {
      const payload = {
        contenido: texto,
        calificacion: puntos,
        album: { id: albumId },
        usuario: { id: authStore.usuario.id },
      }

      const response = await apiClient.post('/resenas', payload)

      // El back no manda los datos del autor, solo su id por eso "inyectamos" los datos del usuario actual
      // para asegurar que se vean nombre y foto sin recargar.
      const nuevaResena = {
        ...response.data,
        esMia: true,
        autor: {
          id: authStore.usuario.id,
          nombre: authStore.usuario.nombre,
          fotoUrl: authStore.usuario.fotoUrl || 'https://placehold.co/40',
        },
      }

      listaResenas.value.unshift(nuevaResena)
      return true
    } catch (error) {
      console.error('Error al publicar reseña:', error)
      return false
    }
  }

  const eliminarResena = async (id) => {
    try {
      await apiClient.delete(`/resenas/${id}`)
      listaResenas.value = listaResenas.value.filter((r) => r.id !== id)
    } catch (error) {
      console.error('Error al eliminar:', error)
    }
  }

  const editarResena = async (idResena, { texto, puntos }) => {
    const authStore = useAuthStore()

    if (!authStore.usuario?.id) return false

    try {
      //Cuerpo del request
      const payload = {
        contenido: texto,
        calificacion: puntos,
      }

      const response = await apiClient.put(`/resenas/${idResena}`, payload, {
        params: { usuarioId: authStore.usuario.id },
      })

      // Actualizamos la lista local para que se vea el cambio sin recargar
      const index = listaResenas.value.findIndex((r) => r.id === idResena)
      if (index !== -1) {
        // Mantenemos la info del autor y 'esMia', solo actualizamos contenido
        listaResenas.value[index] = {
          ...listaResenas.value[index],
          contenido: response.data.contenido,
          calificacion: response.data.calificacion,
        }
      }
      return true
    } catch (error) {
      console.error('Error al editar reseña:', error)
      alert('No se pudo editar la reseña.')
      return false
    }
  }

  const obtenerResenasCancion = async (cancionId) => {
    cargando.value = true
    try {
      const params = {}
      if (authStore.usuario?.id) {
        params.usuarioId = authStore.usuario.id
      }
      const response = await apiClient.get(`/resenas/cancion/${cancionId}`, { params })
      listaResenas.value = response.data
    } catch (error) {
      console.error('Error al obtener reseñas de la canción:', error)
      listaResenas.value = []
    } finally {
      cargando.value = false
    }
  }

  const crearResenaCancion = async (cancionId, { texto, puntos }) => {
    if (!authStore.usuario?.id) {
      alert('Debes iniciar sesión')
      return false
    }

    try {
      const payload = {
        contenido: texto,
        calificacion: puntos,
        cancion: { id: cancionId },
        usuario: { id: authStore.usuario.id },
      }

      const response = await apiClient.post('/resenas', payload)

      const nuevaResena = {
        ...response.data,
        esMia: true,
        autor: {
          id: authStore.usuario.id,
          nombre: authStore.usuario.nombre,
          fotoUrl: authStore.usuario.fotoUrl || 'https://placehold.co/40',
        },
      }

      listaResenas.value.unshift(nuevaResena)
      return true
    } catch (error) {
      console.error('Error al publicar reseña:', error)
      return false
    }
  }

  //llama al endpoint de reseñas para obtener todas las reseñas de un usuario en especifico
  const obtenerResenasPorUsuario = async (usuarioId) => {
    cargando.value = true
    try {
      const response = await apiClient.get(`/resenas/usuario/${usuarioId}`)
      resenasUsuario.value = response.data
    } catch (error) {
      console.error('Error al obtener reseñas del usuario:', error)
      resenasUsuario.value = []
    } finally {
      cargando.value = false
    }
  }

  return {
    listaResenas,
    cargando,
    obtenerResenasAlbum,
    crearResenaAlbum,
    eliminarResena,
    editarResena,
    obtenerResenasCancion,
    crearResenaCancion,
    resenasUsuario,
    obtenerResenasPorUsuario,
  }
})
