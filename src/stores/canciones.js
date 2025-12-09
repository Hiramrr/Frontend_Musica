import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/axios'

export const useCancionesStore = defineStore('canciones', () => {
  const listaCanciones = ref([])
  const cancionSeleccionada = ref(null) 
  const cargando = ref(false)

  // Obtener todas las canciones de la db 
  const obtenerCanciones = async () => {
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

  // Obtener detalle de una canción individual
  const obtenerDetalleCancion = async (id) => {
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

  // Eliminar canción
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

  // Obtener una por ID para editar
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

  // Guardar 
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

  // Actualizar
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