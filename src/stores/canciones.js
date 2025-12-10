import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/axios'

/**
 * Store de Pinia para la gestión de Canciones.
 * Maneja el estado global de las canciones, permitiendo realizar operaciones CRUD
 * (Create, Read, Update, Delete) comunicándose con el Backend.
 */
export const useCancionesStore = defineStore('canciones', () => {
  // Lista completa de canciones obtenidas del servidor.
  const listaCanciones = ref([])
  // Objeto con el detalle de una canción específica (usado en la vista de detalle).
  const cancionSeleccionada = ref(null) 
  const cargando = ref(false)

    /**
   * Obtiene el listado completo de canciones desde el backend.
   * Método: GET /api/canciones
   */  const obtenerCanciones = async () => {
    cargando.value = true
    try {
      const response = await apiClient.get('/canciones')
      listaCanciones.value = response.data
    } catch (error) {
      console.error('Error al cargar las canciones:', error)
    } finally {
      cargando.value = false
    }
  }

  /**
   * Obtiene los detalles de una canción específica para visualizarla.
   * Guarda el resultado en el estado 'cancionSeleccionada'.
   * @param {string} id - UUID de la canción.
   */  const obtenerDetalleCancion = async (id) => {
    cargando.value = true
    cancionSeleccionada.value = null
    try {
      const response = await apiClient.get(`/canciones/${id}`)
      cancionSeleccionada.value = response.data
    } catch (error) {
      console.error('Error al cargar el detalle de la canción:', error)
    } finally {
      cargando.value = false
    }
  }

  /**
   * Elimina una canción del sistema.
   * Método: DELETE /api/canciones/{id}
   * También actualiza la lista localmente para reflejar el cambio sin recargar.
   * @param {string} id - UUID de la canción a eliminar.
   * @returns {boolean} true si se eliminó con éxito, false si hubo error.
   */
  const eliminarCancion = async (id) => {
    try {
      // Petición al backend
      await apiClient.delete(`/canciones/${id}`)
      
      //Actualizar la lista local
      listaCanciones.value = listaCanciones.value.filter(c => c.id !== id)
      
      return true
    } catch (error) {
      console.error('Error al eliminar la canción:', error)
      alert("No se pudo eliminar la canción.")
      return false
    }
  }

  /**
   * Obtiene una canción por su ID específicamente para formularios de edición.
   * A diferencia de 'obtenerDetalleCancion', esta retorna los datos directamente
   * en lugar de guardarlos en el estado, facilitando llenar el formulario.
   * @param {string} id - UUID de la canción.
   * @returns {Object|null} Los datos de la canción o null si falla.
   */
  const obtenerCancionPorId = async (id) => {
    cargando.value = true
    try {
      const response = await apiClient.get(`/canciones/${id}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener la canción:', error)
      return null
    } finally {
      cargando.value = false
    }
  }

  /**
   * Crea y guarda una nueva canción en la base de datos.
   * Método: POST /api/canciones
   * @param {Object} cancion - Objeto con los datos de la nueva canción.
   * @returns {Object} La canción creada retornada por el backend.
   */
  const guardarCancion = async (cancion) => {
    cargando.value = true
    try {
      const response = await apiClient.post('/canciones', cancion)
      listaCanciones.value.push(response.data)
      return response.data
    } catch (error) {
      console.error('Error al guardar la canción:', error)
      throw error
    } finally {
      cargando.value = false
    }
  }

  /**
   * Actualiza los datos de una canción existente.
   * Método: PUT /api/canciones/{id}
   * @param {string} id - UUID de la canción a editar.
   * @param {Object} cancion - Objeto con los datos modificados.
   * @returns {Object} La canción actualizada.
   */
  const actualizarCancion = async (id, cancion) => {
    cargando.value = true
    try {
      const response = await apiClient.put(`/canciones/${id}`, cancion)
      // Actualizamos la lista localmente
      const index = listaCanciones.value.findIndex(c => c.id === id)
      if (index !== -1) {
        listaCanciones.value[index] = response.data
      }
      return response.data
    } catch (error) {
      console.error('Error al actualizar la canción:', error)
      throw error
    } finally {
      cargando.value = false
    }
  }

  return { 
    listaCanciones, 
    cancionSeleccionada, 
    cargando, 
    obtenerCanciones,
    obtenerDetalleCancion,
    obtenerCancionPorId, 
    guardarCancion,      
    actualizarCancion,   
    eliminarCancion      
  }
})