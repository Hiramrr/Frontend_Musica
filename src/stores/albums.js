import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/axios'

export const useAlbumesStore = defineStore('albumes', () => {
  //Estados globales
  const listaAlbumes = ref([])
  const albumsDelArtista = ref([])
  const cargando = ref(false)
  
  //Estados los detalles del album 
  const albumSeleccionado = ref(null)
  const cancionesAlbum = ref([])
  const reseñasAlbum = ref([])

  //Obtener todos los albums 
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


  //Obtener por id los detalle de un álbum y su lista de  canciones
  const obtenerDetalleAlbum = async (id) => {
    cargando.value = true
    albumSeleccionado.value = null
    cancionesAlbum.value = []
    
    try {
      const response = await apiClient.get(`/albums/${id}`)
      albumSeleccionado.value = response.data

      // Mapeamos las canciones que vienen DENTRO del JSON del backend
      if (response.data.canciones) {
        cancionesAlbum.value = response.data.canciones
      } else {
        cancionesAlbum.value = []
      }

      // Simulamos reseñas iniciales (Ya que el backend aun no las trae)
      reseñasAlbum.value = [
        { texto: '¡Un clásico instantáneo!', puntos: 5, fecha: new Date().toLocaleDateString() }
      ]

    } catch (error) {
      console.error('Error al cargar el detalle del álbum:', error)
      // Opcional: Podrías redirigir al usuario o mostrar una alerta
    } finally {
      cargando.value = false
    }
  }

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

  const eliminarAlbum = async (id) => {
    try {
      await apiClient.delete(`/albums/${id}`)
      listaAlbumes.value = listaAlbumes.value.filter(album => album.id !== id)
    } catch (error) {
      console.error('Error al eliminar el álbum:', error)
      throw error
    }
  }

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

  const actualizarAlbum = async (album) => {
    cargando.value = true
    try {
      await apiClient.put(`/albums/${album.id}`, album)
      await obtenerAlbumes() // Recargar la lista de álbumes
    } catch (error) {
      console.error('Error al actualizar el álbum:', error)
      throw error
    } finally {
      cargando.value = false
    }
  }

  return { 
    // Estados
    listaAlbumes, 
    cargando, 
    albumSeleccionado,
    cancionesAlbum,
    reseñasAlbum,
    albumsDelArtista,      
    
    
    // Acciones
    obtenerAlbumes,
    guardarAlbum,
    obtenerDetalleAlbum,
    eliminarAlbum,
    obtenerAlbumPorId,
    actualizarAlbum,
    obtenerAlbumsPorArtista,
  }
})
