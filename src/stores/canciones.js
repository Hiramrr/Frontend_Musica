import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/axios'

export const useCancionesStore = defineStore('canciones', () => {
  const listaCanciones = ref([])
  const cargando = ref(false)

  // Obtener todas (Read)
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

  const eliminarCancion = async (id) => {
    try {
      // 1. Petición al backend
      await apiClient.delete(`/canciones/${id}`)
      
      // 2. Actualizar la lista local (filtro para quitar la que borramos)
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
      // El backend no tiene un endpoint específico que devuelva DTO detallado como en album,
      // pero usaremos el endpoint genérico si existe o filtraremos de la lista si es necesario.
      // NOTA: Tu backend TIENE un endpoint GET /api/canciones/{id} en CancionControlador.
      // Sin embargo, devuelve la entidad 'Cancion' pura, lo cual está bien para editar.
      const response = await apiClient.get(`/canciones/${id}`) //
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
    cargando, 
    obtenerCanciones,
    obtenerCancionPorId, 
    guardarCancion,      
    actualizarCancion,   
    eliminarCancion      
  }
})