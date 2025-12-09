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

  //Obtener detalle de una canción individual para mostrar DetalleCancionView
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

  return { 
    listaCanciones, 
    cancionSeleccionada, 
    cargando, 
    obtenerCanciones,
    obtenerDetalleCancion 
  }
})