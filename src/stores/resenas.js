import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/axios'

// ID temporal para pruebas (simulando un usuario logueado)
// En un futuro, esto vendría de tu authStore
const USUARIO_ID = 'e16bf04a-0ade-41d1-ba40-f5ae4f43f60b'

export const useResenasStore = defineStore('resenas', () => {
  const listaResenas = ref([])
  const cargando = ref(false)

  // Obtener reseñas de un álbum 
  const obtenerResenasAlbum = async (albumId) => {
    cargando.value = true
    try {
      const response = await apiClient.get(`/resenas/album/${albumId}`, {
        params: { usuarioId: USUARIO_ID }
      })
      listaResenas.value = response.data
    } catch (error) {
      console.error('Error al obtener reseñas:', error)
      listaResenas.value = []
    } finally {
      cargando.value = false
    }
  }

  const crearResenaAlbum = async (albumId, { texto, puntos }) => {
    try {
      // Estructura que espera Spring Boot (JPA)
      const payload = {
        contenido: texto,
        calificacion: puntos,
        album: { id: albumId }, // Relación con el álbum
        usuario: { id: USUARIO_ID } // Relación con el usuario
      }

      const response = await apiClient.post('/resenas', payload)
      
      // Agregamos la respuesta real del servidor a la lista (al inicio)
      listaResenas.value.unshift(response.data)
      return true
    } catch (error) {
      console.error('Error al publicar reseña:', error)
      alert('No se pudo publicar la reseña.')
      return false
    }
  }

  // Eliminar reseña
  const eliminarResena = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta reseña?')) return

    try {
      await apiClient.delete(`/resenas/${id}`)
      // Filtramos la lista local para quitar la eliminada
      listaResenas.value = listaResenas.value.filter(r => r.id !== id)
    } catch (error) {
      console.error('Error al eliminar:', error)
    }
  }

  return {
    listaResenas,
    cargando,
    obtenerResenasAlbum,
    crearResenaAlbum,
    eliminarResena
  }
})