import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/axios'

export const useAlbumesStore = defineStore('albumes', () => {
  const listaAlbumes = ref([])
  const cargando = ref(false)

  const obtenerAlbumes = async () => {
    cargando.value = true
    try {
      const response = await apiClient.get('albums')
      listaAlbumes.value = response.data
    } catch (error) {
      console.error('No se pudieron cargar los álbumes:( :', error)
    } finally {
      cargando.value = false
    }
  }

  return { 
    listaAlbumes, 
    cargando, 
    obtenerAlbumes 
  }
})