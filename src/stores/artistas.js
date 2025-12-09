import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/axios'

export const useArtistasStore = defineStore('artistas', () => {
   
  const listaArtistas = ref([])
  const cargando = ref(false)

    
    const guardarArtista = async (artista) => {
      cargando.value = true
      try {
        const response = await apiClient.post('/artistas', artista)
        
        listaArtistas.value.push(response.data)
        return response.data
      } catch (error) {
        console.error('Error al guardar el artista:', error)
        throw error
      } finally {
        cargando.value = false
      }
    }

  
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

  
  const eliminarArtista = async (id) => {
    cargando.value = true
    try {
      await apiClient.delete(`/artistas/${id}`)
      
      listaArtistas.value = listaArtistas.value.filter(a => a.id !== id)
    } catch (error) {
      console.error('Error al eliminar el artista:', error)
      throw error
    } finally {
      cargando.value = false
    }
  }

  
  const actualizarArtista = async (id, artista) => {
    cargando.value = true
    try {
      const response = await apiClient.put(`/artistas/${id}`, artista)
      
      listaArtistas.value = listaArtistas.value.map(a => a.id === id ? response.data : a)
      return response.data
    } catch (error) {
      console.error('Error al actualizar el artista:', error)
      throw error
    } finally {
      cargando.value = false
    }
  }

  return { 
    listaArtistas, 
    cargando, 
    obtenerArtistas,
    guardarArtista,
    eliminarArtista,
    actualizarArtista
  }
})