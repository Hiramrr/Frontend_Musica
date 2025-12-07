import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/axios'

export const useCancionesStore = defineStore('canciones', () => {
  //estado global
  const listaCanciones = ref([])
  const cargando = ref(false)

  //Obtenemos las caciones del back, ya vienen filtrados los datos
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

  return { 
    listaCanciones, 
    cargando, 
    obtenerCanciones 
  }
})