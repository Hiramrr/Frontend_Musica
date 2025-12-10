import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/axios'

// Store centralizado para gestionar todos los datos relacionados con álbumes
// Maneja tanto la lista de álbumes como los detalles individuales
export const useAlbumesStore = defineStore('albumes', () => {
  // Estados reactivos para la lista general de álbumes
  const listaAlbumes = ref([])
  const albumsDelArtista = ref([])
  const cargando = ref(false)
  
  // Estados para el detalle específico de un álbum
  const albumSeleccionado = ref(null)
  const cancionesAlbum = ref([])
  const reseñasAlbum = ref([])

  // Obtiene la lista completa de álbumes desde el backend
  const obtenerAlbumes = async () => {
    cargando.value = true
    try {
      const response = await apiClient.get('/albums') 
      listaAlbumes.value = response.data
    } catch (error) {
      console.error('Error al cargar álbumes:', error)
    } finally {
      cargando.value = false
    }
  }

  // Obtiene solo los álbumes asociados a un artista específico
  const obtenerAlbumsPorArtista = async (artistaId) => {
    cargando.value = true
    albumsDelArtista.value = [] 
    try {
      const response = await apiClient.get(`/albums/artista/${artistaId}`)
      if (response.data) {
        albumsDelArtista.value = response.data
      }
    } catch (error) {
      console.error('Error al cargar álbumes del artista:', error)
    } finally {
      cargando.value = false
    }
  }

  // Obtiene los detalles completos de un álbum por su ID, incluyendo sus canciones
  const obtenerDetalleAlbum = async (id) => {
    cargando.value = true
    albumSeleccionado.value = null
    cancionesAlbum.value = []
    
    try {
      const response = await apiClient.get(`/albums/${id}`)
      albumSeleccionado.value = response.data

      // Extrae las canciones del objeto del álbum si existen
      if (response.data.canciones) {
        cancionesAlbum.value = response.data.canciones
      } else {
        cancionesAlbum.value = []
      }

      // Inicializa con una reseña simulada (el backend aún no las proporciona)
      reseñasAlbum.value = [
        { texto: '¡Un clásico instantáneo!', puntos: 5, fecha: new Date().toLocaleDateString() }
      ]

    } catch (error) {
      console.error('Error al cargar el detalle del álbum:', error)
    } finally {
      cargando.value = false
    }
  }

  // Crea un nuevo álbum en el backend y lo agrega a la lista local
  const guardarAlbum = async (album) => {
    cargando.value = true
    try {
      const response = await apiClient.post('/albums', album)
      listaAlbumes.value.push(response.data)
      return response.data
    } catch (error) {
      console.error('Error al guardar el álbum:', error)
      throw error
    } finally {
      cargando.value = false
    }
  }

  // Elimina un álbum del backend y actualiza la lista local
  // Si el álbum no existe en el servidor, lo elimina de la UI de todas formas
  const eliminarAlbum = async (id) => {
    try {
      await apiClient.delete(`/albums/${id}`)
      listaAlbumes.value = listaAlbumes.value.filter((album) => album.id !== id)
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn(`Intento de eliminar álbum (ID: ${id}) no encontrado en el servidor. Actualizando UI.`)
        listaAlbumes.value = listaAlbumes.value.filter((album) => album.id !== id)
      } else {
        console.error('Error al eliminar el álbum:', error)
        throw error
      }
    }
  }

  // Obtiene un álbum específico por su ID sin marcar todo el detalle
  const obtenerAlbumPorId = async (id) => {
    cargando.value = true
    try {
      const response = await apiClient.get(`/albums/${id}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener el álbum:', error)
      throw error
    } finally {
      cargando.value = false
    }
  }

  // Actualiza un álbum existente en el backend
  // Soporta dos formas de llamada: (id, data) o (data con id incluido)
  const actualizarAlbum = async (arg1, arg2) => {
    cargando.value = true
    try {
      let id, data;

      // Detecta el formato de los argumentos
      if (typeof arg1 === 'string' || typeof arg1 === 'number') {
        id = arg1
        data = arg2
      } else {
        id = arg1.id
        data = arg1
      }

      // Valida que se haya proporcionado un ID
      if (!id) throw new Error("ID de álbum no definido para actualizar")

      // Envía la actualización al backend
      const response = await apiClient.put(`/albums/${id}`, data)
      
      // Actualiza la lista local con los datos nuevos
      const index = listaAlbumes.value.findIndex(a => a.id === id)
      if (index !== -1) {
        listaAlbumes.value[index] = response.data
      }
      return response.data

    } catch (error) {
      console.error('Error al actualizar el álbum:', error)
      throw error
    } finally {
      cargando.value = false
    }
  }

  return { 
    // Estados reactivos
    listaAlbumes, 
    cargando, 
    albumSeleccionado,
    cancionesAlbum,
    reseñasAlbum,
    albumsDelArtista,      
    
    // Métodos de acceso a datos
    obtenerAlbumes,
    guardarAlbum,
    obtenerDetalleAlbum,
    eliminarAlbum,
    obtenerAlbumPorId,
    actualizarAlbum,
    obtenerAlbumsPorArtista,
  }
})
