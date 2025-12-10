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
      // Si tiene éxito, se filtra el álbum de la lista local
      listaAlbumes.value = listaAlbumes.value.filter((album) => album.id !== id)
    } catch (error) {
      // Si el error es 404, significa que ya fue borrado. Lo quitamos de la lista.
      if (error.response && error.response.status === 404) {
        console.warn(`Intento de eliminar álbum (ID: ${id}) no encontrado en el servidor. Actualizando UI.`)
        listaAlbumes.value = listaAlbumes.value.filter((album) => album.id !== id)
        // No se relanza el error, se considera una eliminación "exitosa" para el frontend
      } else {
        // Para cualquier otro error (500, etc.), se loguea y relanza para que el componente lo maneje
        console.error('Error al eliminar el álbum:', error)
        throw error
      }
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

const actualizarAlbum = async (arg1, arg2) => {
    cargando.value = true
    try {
      let id, data;

      // Lógica para detectar si mandaste (id, data) o solo (data)
      if (typeof arg1 === 'string' || typeof arg1 === 'number') {
        // Caso: actualizarAlbum('123', { nombre: ... })
        id = arg1
        data = arg2
      } else {
        // Caso: actualizarAlbum({ id: '123', nombre: ... })
        id = arg1.id
        data = arg1
      }

      // Validación de seguridad
      if (!id) throw new Error("ID de álbum no definido para actualizar")

      // Llamada al endpoint correcto: PUT /albums/{id}
      const response = await apiClient.put(`/albums/${id}`, data)
      
      // Actualizamos la lista localmente para reflejar cambios
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
