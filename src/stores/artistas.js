import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/axios'

export const useArtistasStore = defineStore('artistas', () => {
  // Estados globales 
  const listaArtistas = ref([])
  const cargando = ref(false)

  // Obtenemos todos los artistas desde la api
  const obtenerArtistas = async () => {
    cargando.value = true
    try {
      const response = await apiClient.get('/artistas')
      listaArtistas.value = response.data
    } catch (error) {
      console.error('No se pudieron cargar los artistas:( :', error)
    } finally {
      cargando.value = false
    }
  }

  return { 
    listaArtistas, 
    cargando, 
    obtenerArtistas 
  }
})