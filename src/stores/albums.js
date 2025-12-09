import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/axios'

export const useAlbumesStore = defineStore('albumes', () => {
  const listaAlbumes = ref([])
  const cargando = ref(false)

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

  // --- NUEVA FUNCIÓN ---
  const guardarAlbum = async (album) => {
    cargando.value = true
    try {
      // Enviamos el objeto al backend
      const response = await apiClient.post('/albums', album)
      // Agregamos el nuevo álbum a la lista local para no recargar
      listaAlbumes.value.push(response.data)
      return response.data
    } catch (error) {
      console.error('Error al guardar el álbum:', error)
      throw error
    } finally {
      cargando.value = false
    }
  }

  return { 
    listaAlbumes, 
    cargando, 
    obtenerAlbumes,
    guardarAlbum // Exportamos la función
  }
})